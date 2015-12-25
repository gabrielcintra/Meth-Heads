#pragma strict

class objetoProvider extends objetoCrime {

	var taxa : float;

	function Start()
	{
		super();
	}

	function getFilho()
	{
		return this;
	}

	function getAtributoTexto()
	{
		return "Give " + atributo + "% ingredients per second";
	}

	function getSecTexto() {
		return "Tax: " + taxa; 
	}

}