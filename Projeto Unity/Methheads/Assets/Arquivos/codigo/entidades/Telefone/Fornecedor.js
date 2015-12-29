#pragma strict

var entidade : entidadeLocal;
var ingredientes : Fornecer[];
var precoFinal : float;
var quantidadeComprada : float;

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
			break;
		case 4:
			balaoFala.text = "You don't have enough money.";
			break;
		case 5:
			balaoFala.text = "Nothing? All right then.";
			break;
	}
}

function setPrecoFinal(	)
{
	precoFinal = 0;
	for(var i = 0; i < ingredientes.length; i++)
		precoFinal += ingredientes[i].getPreco();
	falar(3);
}

function comprar(tipo : String)
{	
	var dinheiroFinal = entidade.getValor(tipo) - precoFinal;
	entidade.atualizarValor(tipo, dinheiroFinal);
	
	for(ingrediente in ingredientes) {
		var nomeIngrediente = ingrediente.ingrediente;
		var quantidadeIngrediente = entidade.getValor(nomeIngrediente) + ingrediente.getQuantidade();
		entidade.atualizarValor(nomeIngrediente, quantidadeIngrediente);
		ingrediente.resetarSlider();
	}

	falar(2);
	Invoke("Desligar", 2);
	GameObject.Find("botaoComprar").GetComponent(Button).enabled = false;
}

function botaoComprar()
{
	var dinheiroSujo = entidade.getValor("sujo");
	var dinheiroLimpo = entidade.getValor("limpo");

	checarQuantidade();
	
	if (quantidadeComprada > 0) {
		if (dinheiroSujo > precoFinal)
			comprar("sujo");
		else if (dinheiroLimpo > precoFinal)
			comprar("limpo");
		else if ((dinheiroLimpo + dinheiroSujo) > precoFinal){
			entidade.atualizarValor("limpo",dinheiroLimpo+dinheiroSujo);
			entidade.atualizarValor("sujo", 0);
			comprar("limpo");
			} 
		else{
			falar(4);
		}
	}
	else{
		falar(5);
		Invoke("Desligar",2);
	}
}

function checarQuantidade()
{
	for (ingrediente in ingredientes){
		quantidadeComprada += ingrediente.getQuantidade(); 
	}
}

function Desligar()
{
	falar(0);
	for (var i = 0; i < this.gameObject.transform.childCount; ++i)
		this.gameObject.transform.GetChild(i).gameObject.SetActive(false);
}
