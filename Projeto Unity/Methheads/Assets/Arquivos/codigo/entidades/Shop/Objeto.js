#pragma strict

class Objeto extends MonoBehaviour {

	var entidade : entidadeLocal;

	private var nome : String; // private para nao aparecer no inspector
	var tipo : String;
	var descricao : String;
	var valor : float;
	var valorTexto : String;
	
	var atributo : float; // em que o objeto afeta o que faz (produz mais, transporta mais, etc)
	var atributoTexto : String; // improve by, transport in...
	
	var atributos : String[]; // textos que sao exibidos na loja
	
	function Start() 
	{ 
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
	
	    nome = gameObject.name;       
		atualizarValores();
	}
	
	// atualiza o nome, valor, descricao, atributo e capacidade* apos comprar ou vender
	function atualizarValores()
	{
	    if (tipo == "transporte")
	        atributos = [nome, getValorText(), descricao, getAtributoTexto(), getCapTexto()];
	    else
	        atributos = [nome, getValorText(), descricao, getAtributoTexto()];

        for(var i = 3; i < atributos.length+3; i++) // +3 porque na ordem do inspector tem coisas antes
            gameObject.transform.GetChild(i).GetComponent(Text).text = atributos[i-3];
    }
	
	function comprar()
	{
		if (entidade.temDinheiro("limpo", valor)) { // checa se vai ter o dinheiro pra comprar
			entidade.atualizarDinheiro("limpo", valor*-1); // -1 porque eh uma remocao
			entidade.adicionar(getFilho());
		}
		
		atualizarValores();
	}
	
	function vender()
	{
		if (entidade.remover(getFilho()))
			entidade.atualizarDinheiro("limpo", valor);
			
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
	
	function getValorText()
	{
		return "$ " + entidade.organizarValor(valor);
	}
	
	function getTipo()
	{
		return tipo;
	}
	
	function getAtributo()
	{
		return atributo;
	}
	
	// "dealer", "cooker", "pureza", "transporte", "laboratorio", "empresa"
	function getAtributoTexto()
	{
		var finalFrase = atributo.ToString();
		
		if (tipo == "pureza" || tipo == "transporte")
			finalFrase = atributo*100 + "%";
			
		return atributoTexto + " " + finalFrase;
	}
	
	// metodo morto, sera reescrito pelo filho
	function getFilho() { return this; }
	function getCapTexto(){return ""; }

}