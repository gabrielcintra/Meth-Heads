#pragma strict

class botaoProduzir extends MonoBehaviour {

	var textoMeth : textoMain;
	
	function OnMouseDown()
	{
		produzir();
	}	

	function produzir()
	{
		textoMeth = GameObject.Find("contadorMeth").GetComponent(textoMain);
		textoMeth.addValor(1.0);
	}

}

