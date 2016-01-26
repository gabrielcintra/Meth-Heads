#pragma strict

class objetoEmpresa extends Objeto {

	function Start()
	{
		super();
		tipo = "empresa";
		tipoDinheiro = "sujo";
		
		atualizarComponentes();
	}

	function getFilho()
	{
		return this;
	}

	function atualizarComponentes()
	{
		componentesValores = [nome, entidade.getFuncTamanho(this).ToString(), "$" + entidade.organizarValor(getValor()), getDescricao()];
	}

}