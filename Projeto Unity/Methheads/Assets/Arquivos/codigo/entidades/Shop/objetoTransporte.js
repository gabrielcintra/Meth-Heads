#pragma strict

class objetoTransporte extends Objeto {

    var capacidade : float;

	function Start()
	{
		super();
		tipo = "transporte";
		tipoDinheiro = "limpo";
		atualizarComponentes();
	}

	function getFilho()
	{
		return this;
	}

	function getSecundario() {
	    return capacidade;
	}

	function atualizarComponentes()
	{
		componentesValores = [nome, "OWNED: "+ entidade.organizarValor(entidade.getFuncTamanho(this)), "$" + entidade.organizarValor(getValor()), "SPEED: "+entidade.organizarValor(getAtributo())+"m/s","CAPACITY: "+entidade.organizarValor(getSecundario())+"lb"];
	}
	
}