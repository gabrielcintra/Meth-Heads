#pragma strict

class objetoTransporte extends Objeto {

    var atributoCapacidade : float;
    var atributoCapTexto : String;

	function Start()
	{
		super();
	}

	function getFilho()
	{
		return this;
	}

	function getCapacidade(){
	    return atributoCapacidade;
	}

	function getCapTexto()
	{
	    return atributoCapTexto + " " + atributoCapacidade + "lb";
	}
	
}