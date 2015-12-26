    #pragma strict

class objetoCrime extends Objeto {

    var objetoTransacao : GameObject;

	function Start()
	{
		super();

		tipoDinheiro = "sujo";
		componentesValores = [nome, entidade.getFuncTamanho(tipo).ToString(), "$ " + getValor(), getAtributoTexto(), getSecTexto()];

	}

	function alternarInfo(condicao : boolean)
	{
	    this.transform.GetChild(1).gameObject.SetActive(condicao);
	}

	function OnMouseEnter()
	{
		alternarInfo(true);
	}

	function OnMouseDown()
	{
	    transacao(comprar());
	}

	function OnMouseExit(){
	    alternarInfo(false);
	}

	function transacao(tem : boolean){
	    var contador = GameObject.Find("Transacao").GetComponent(contadorInstantaneo);
	    if (tem)
	        contador.contarTransacao("complete");
	    else
	        contador.contarTransacao("failed");
	}

}