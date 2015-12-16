#pragma strict

class objetoPureza extends Objeto {

	function Start()
	{
		super();
	}

	function getFilho()
	{
		return this;
	}

}