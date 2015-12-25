#pragma strict

class objetoCooker extends objetoCrime {

	var taxa : float;

	function Start()
	{
		super();
		tipo = "cooker";
	}

	function getFilho()
	{
		return this;
	}

	function getAtributoTexto()
	{
		return "Cooks " + atributo + " meth per second";
	}

	function getSecTexto() {
		return "Tax: " + taxa; 
	}

}