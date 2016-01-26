#pragma strict

class Objeto extends MonoBehaviour {

	var entidade : entidadeLocal;

	var componentes : GameObject[];    // gameObjects que o objeto possui na interface ***
	var componentesValores : String[]; // Valores que os gameObjects devem guardar

	var nome : String;                 // nome do objeto (carro de compras, fulano, etc)
	var tipo : String;                 // cooker, dealer, empresa, pureza, lab, etc
	var tipoDinheiro : String;         // sujo ou limpo

	var descricao : String;            // descricao do objeto (ex: a good place to...) ***
	var valor : long;                  // preco de compra ***      
	var atributo : long;               // quanto incrementa/diminui por segundo ***
	
	function Start() 
	{ 
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
	    nome = gameObject.name;       
	}

	function Update()
	{
		atualizarValores();
	}
	
	function atualizarValores()
	{
		if (tipo != "cooker" && tipo != "dealer")
			if (GameObject.Find("pagSeguro").GetComponent(Toggle).isOn)
				tipoDinheiro = "limpo";
			else
				tipoDinheiro = "sujo";

		atualizarComponentes();

	    for (var i=0; i < componentesValores.length; i++)
	    	componentes[i].GetComponent(Text).text = componentesValores[i];
    }
	
	function comprar() //// compra com on mouse down e retorna se a transação foi feita
	{	
		var retorno = false;

		if (tipo != "cooker" && tipo != "dealer")
			if(GameObject.Find("pagSeguro").GetComponent(Toggle).isOn)
				tipoDinheiro = "limpo";
			else
				tipoDinheiro = "sujo";

		if (entidade.temValor(tipoDinheiro, valor)) {
			entidade.atualizarValor(tipoDinheiro, valor*-1);
			entidade.adicionar(getFilho());
			valor = valor * 1.10;
			retorno = true;
		}
		
		atualizarValores();
		return retorno;
	}

	function botaoComprar() /// compra com OnClick em botões UI.
	{
		if (entidade.temValor(tipoDinheiro, valor)) {
			entidade.atualizarValor(tipoDinheiro, valor*-1);
			entidade.adicionar(getFilho());
			valor = valor * 1.10;
		}
		
		atualizarValores();
	}
	
	function vender()
	{
		if (entidade.remover(getFilho()))
			entidade.atualizarValor(tipoDinheiro, valor);
			
		atualizarValores();
	}

	function getNome()
	{
		return nome;
	}
	
	function getValor()
	{
		return valor;
	}

	function getAtributo()
	{
		return atributo;
	}

	function getTipo()
	{
		return tipo;
	}

	function getDescricao(){
		return descricao;
	}
	
	// --- Metodos que serao reescritos pelos filhos
	function getFilho() {return this;}
	function getSecTexto(){return "";}
	function getAtributoTexto(){return "";}
	function atualizarComponentes(){return null;}
	// -----------------------------------------------

}