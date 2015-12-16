#pragma strict

class Objeto extends MonoBehaviour {

	var entidade : entidadeLocal;

	var nome : String;
	var tipo : String;
	var descricao : String;
	var valor : float;
	
	var atributo : float;
	var atributoTexto : String;
	
	// textos que sao exibidos na loja
	var atributos : String[];
	
	function Start() 
	{ 
		atualizarValores();
	}
	
	function atualizarValores()
	{
		atributos = [nome, valor.ToString(), descricao, getAtributoTexto()];
		
		var objetoPai = gameObject;
		for(var i = 3; i < 7; i++)
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

}