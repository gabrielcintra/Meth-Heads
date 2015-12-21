#pragma strict

class Objeto extends MonoBehaviour {

	var entidade : entidadeLocal;

	private var nome : String;
	var tipo : String;
	var descricao : String;
	var valor : float;
	var valorTexto : String;
	
	var atributo : float;
	var atributoTexto : String; // improve by, transport in...
	
	// textos que sao exibidos na loja
	var atributos : String[];
	
	function Start() 
	{ 
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
	
	    nome = gameObject.name;       
		atualizarValores();
	}
	
	function atualizarValores()
	{
	    var objetoPai = gameObject;

	    if (tipo == "transporte") 
	        atributos = [nome, getValorText(), descricao, getAtributoTexto(), getCapTexto()];
	    else 
	        atributos = [nome, getValorText(), descricao, getAtributoTexto()];

        for(var i = 3; i < atributos.length; i++)
            objetoPai.transform.GetChild(i).GetComponent(Text).text = atributos[i-3];
    }
	
	function comprar()
	{
		if (entidade.temValor("limpo", valor)) {
			entidade.atualizarValor("limpo", valor*-1);
			entidade.adicionar(getFilho());
		}
		
		atualizarValores();
	}
	
	function vender()
	{
		if (entidade.remover(getFilho()))
			entidade.atualizarValor("limpo", valor);
			
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