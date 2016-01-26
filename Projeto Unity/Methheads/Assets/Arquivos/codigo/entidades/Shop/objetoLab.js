#pragma strict

class objetoLab extends Objeto {

	private var Locais : String[];
	var Local : String;
	var Tamanho : String;
	var imovel : boolean;

	function Start()
	{
		super();
		Locais = ["Trenton, NJ","New York, NY","Los Angeles, CA","Chicago, IL","Houston, TX","Phoenix, AZ",
		"Philadelphia, PA","Dallas, TX","Detroit, MI","Austin,TX","Washington, DC","Boston, MA","Seattle, WA",
		"Denver, CO","Portland, OR","Memphis, TN","Jacksonville, FL","San Francisco, CA","Recife, Brazil","Acre, Brazil"];
		
		tipo = "laboratorio";
		tipoDinheiro = "limpo";
		atualizarComponentes();
	}

	function getFilho()
	{
		return this;
	}

	function botaoComprar() /// compra com OnClick em botões UI.
	{
		if (entidade.temValor(tipoDinheiro, valor)) {
			entidade.atualizarValor(tipoDinheiro, valor*-1);
			entidade.adicionar(getFilho());
			valor = valor * 1.10;
		}

		if (imovel)
			Local = Locais[Random.Range(0,Locais.length)];
		
		atualizarValores();
	}

	function atualizarComponentes()
	{
		componentesValores = [nome, entidade.getFuncTamanho(this).ToString(), "$" + entidade.organizarValor(getValor()), Local, Tamanho + "m²"];
	}

}