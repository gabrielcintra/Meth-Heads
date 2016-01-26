#pragma strict

class objetoPureza extends Objeto {

	function Start()
	{
		super();
		tipo = "pureza";
		tipoDinheiro = "limpo";
		
		atualizarComponentes();
	}

	function atualizarComponentes()
	{
		componentesValores = [nome, entidade.getFuncTamanho(this).ToString(), "$" + entidade.organizarValor(getValor()), getAtributo()+"%"];
	}

	function getFilho()
	{
		return this;
	}

}