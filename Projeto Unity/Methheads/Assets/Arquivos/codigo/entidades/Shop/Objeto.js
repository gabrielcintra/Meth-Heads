#pragma strict

class Objeto extends MonoBehaviour {

	var entidade : entidadeLocal;

	private var nome : String;
	var tipo : String;
	var descricao : String;
	var valor : float;
	
	var atributo : float;

	var atributoTexto : String;
	
	// textos que sao exibidos na loja
	var atributos : String[];
	
	function Start() 
	{ 
	    nome = gameObject.name;       
		atualizarValores();
	}
	
	function atualizarValores()
	{
	    var numeroCriancas = 7;

	    if (tipo == "transporte"){
	        atributos = [nome, valor.ToString(), descricao, getAtributoTexto(), getCapTexto()];
	        numeroCriancas = 8;
	    }
	    else{
	        atributos = [nome, valor.ToString(), descricao, getAtributoTexto()];
	    }
	        var objetoPai = gameObject;
	        for(var i = 3; i < numeroCriancas; i++)
	            objetoPai.transform.GetChild(i).GetComponent(Text).text = atributos[i-3];
    }
	
	function comprar()
	{
		if (entidade.temDinheiro("limpo", valor)) {
			entidade.diminuirDinheiro("limpo", valor);
			entidade.adicionar(getFilho());
			print ("tem dinheiro");
			print (entidade.getDinheiro("limpo"));
		} else print ("sem dinheiro");
		
		atualizarValores();
	}
	
	function vender()
	{
		if (entidade.remover(getFilho())) {
			entidade.aumentarDinheiro("limpo", valor);
			print ("removido com sucesso");
			print (entidade.getDinheiro("limpo"));
			return;
		}
		
		print ("nao tem");
	}
	
	function getNome()
	{
		return nome;
	}
	
	function getValor()
	{
		return valor;
	}
	
	function getTipo()
	{
		return tipo;
	}
	
	function getAtributo()
	{
		return atributo;
	}
	
	function getAtributoTexto()
	{
		return atributoTexto + " " + atributo;
	}
	
	// metodo morto, sera reescrito pelo filho
	function getFilho() { return this; }
	function getCapTexto(){return ""; }

}