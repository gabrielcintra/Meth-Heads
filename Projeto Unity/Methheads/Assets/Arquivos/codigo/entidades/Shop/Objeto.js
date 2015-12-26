#pragma strict

class Objeto extends MonoBehaviour {

	var entidade : entidadeLocal;

	var componentes : GameObject[];    // gameObjects que o objeto possui na interface ***
	var componentesValores : String[]; // Valores que os gameObjects devem guardar

	var nome : String;                 // nome do objeto (carro de compras, fulano, etc)
	var tipo : String;                 // cooker, dealer, empresa, pureza, lab, etc
	var tipoDinheiro : String;         // sujo ou limpo

	var descricao : String;            // descricao do objeto (ex: a good place to...) ***
	var valor : float;                 // preco de compra ***       
	
	var atributo : float;              // quanto incrementa/diminui por segundo ***
	
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
	    for (var i=0; i < componentesValores.length; i++)
	    	componentes[i].GetComponent(Text).text = componentesValores[i];
    }
	
	function comprar()
	{
		if (entidade.temValor(tipoDinheiro, valor)) {
			entidade.atualizarValor(tipoDinheiro, valor*-1);
			entidade.adicionar(getFilho());
			return true;
		} else return false;
		
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
	
	// --- Metodos que serao reescritos pelos filhos
	function getFilho() {return this;}
	function getSecTexto(){return "";}
	function getAtributoTexto(){return "";}
	// -----------------------------------------------

}