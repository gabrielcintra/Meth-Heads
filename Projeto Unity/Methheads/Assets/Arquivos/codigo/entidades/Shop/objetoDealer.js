#pragma strict

class objetoDealer extends Objeto {

	function Start()
	{
		super();
	}

	function getFilho()
	{
		return this;
	}

}