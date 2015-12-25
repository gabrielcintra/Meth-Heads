#pragma strict

class objetoCrime extends Objeto {

	function Start()
	{
		super();

		tipoDinheiro = "sujo";
		componentesValores = [nome, entidade.getFuncTamanho(tipo).ToString(), "$ " + getValor(), getAtributoTexto(), getSecTexto()];
	}

	function alternarInfo()
	{
		// TODO
		// Altera o estado de "infoMouse"
	}

	function OnMouseEnter()
	{
		alternarInfo();
	}

	function OnMouseDown()
	{
		comprar();
	}

}