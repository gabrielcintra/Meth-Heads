#pragma strict
private var entidade : entidadeLocal;
private var ingrediente : String;

var preco : float;
static var precoFinal : float;

var slider : GameObject;
var toggle : GameObject;

function Start () {

ingrediente = this.gameObject.name;

entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
slider = gameObject.transform.GetChild(0).gameObject;
toggle = gameObject.transform.GetChild(1).gameObject;


slider.SetActive(false);

falar(0);
}

function atualizarPreco(){ /// é atualizado quando o slider muda de valor
	falar(3);
	preco = entidade.getValor("preco"+ingrediente) * slider.GetComponent(Slider).value;
	atualizarPrecoFinal();
}
function atualizarPrecoFinal(){

}

function aparecerSlider(){ ///função setada em botão - ativa os sliders
	mudarInterface();
	atualizarSlider();
} 

function atualizarSlider(){  /// o máximo valor do slider é quanto ele falta pra ter o máximo de ingrediente
	slider.GetComponent(Slider).maxValue = entidade.getValor("cap"+ingrediente) - entidade.getValor(ingrediente);
}

function mudarInterface(){
	slider.SetActive(toggle.GetComponent(Toggle).isOn);
	toggle.SetActive(false);
	falar(1);
}

function desativar(){

	GameObject.Find("telefoneInterface").GetComponent(Telefone).tocarSom("desligar");
	var fornecedor = GameObject.Find("Fornecedor");
	for(var l = 0; l < fornecedor.transform.childCount; ++l)
        fornecedor.transform.GetChild(l).gameObject.SetActive(false);
}

function falar(fala : int){   /// 0 = qual ingrediente /// 1 = quanto de cada // 2 = após a compra // 3 = fala o preço
	
	var balaoFala = GameObject.Find("fala").GetComponent(Text);

	switch(fala){
		
		case 0:
			balaoFala.text = "Yo boss! Which ingredient do you want?";
			break;

		case 1:
			balaoFala.text = "Right. How much?";
			break;

		case 2:
			balaoFala.text = "I will work on it.";
			break;
		case 3:
			balaoFala.text = "This will be $ " + entidade.organizarValor(precoFinal);
		case 4:
			balaoFala.text = "You dont have enough money.";
	}
}

function reabastecer(){
	var quantidadeComprada = slider.GetComponent(Slider).value;
	var dinheiroLimpo = entidade.getValor("limpo");
	var dinheiroSujo = entidade.getValor("sujo");

	if (preco <= dinheiroSujo) { // checa se ele tem dinheiro sujo pra pagar
		entidade.atualizarValor("sujo", preco * -1);
		entidade.atualizarValor(ingrediente, quantidadeComprada);
		falar(2);
	} else if (preco <= dinheiroLimpo) { // checa se ele tem dinheiro limpo pra pagar
			entidade.atualizarValor("limpo", preco * -1);
			entidade.atualizarValor(ingrediente, quantidadeComprada);
 	} else if (preco <= dinheiroLimpo + dinheiroSujo) { // checa se somando os dois tipos de dinheiro ele pode pagar
		var diferenca = dinheiroLimpo - dinheiroSujo;
						
		entidade.atualizarValor("sujo", entidade.getValor("sujo") * -1);
		entidade.atualizarValor("limpo", entidade.getValor("limpo") - diferenca);
						
		entidade.atualizarValor(ingrediente, quantidadeComprada);
		}
		else{
			falar(4);
		}

	Invoke("desativar",2);
	}