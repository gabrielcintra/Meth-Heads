#pragma strict

class objetoDealer extends objetoCrime {

	var taxa : float;

	function Start()
	{
		super();
		tipo = "dealer";
	}

	function getFilho()
	{
		return this;
	}

	function getAtributoTexto()
	{
	    return "Sells  " + entidade.organizarValor(atributo) + "   per second";
	}

	function getSecTexto() {
		return "" + taxa + "%"; 
	}

}