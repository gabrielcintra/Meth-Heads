#pragma strict

class objetoTransporte extends Objeto {

    var capacidade : float;

	function Start()
	{
		super();
	}

	function getFilho()
	{
		return this;
	}

	function getSecundario() {
	    return capacidade;
	}

	function getSecTexto()
	{
	    return "It can hold " + capacidade + "lb";
	}
	
}