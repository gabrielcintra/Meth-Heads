#pragma strict

class botaoProduzir extends MonoBehaviour {

	var frames : Sprite[]; // 0 - normal / 1 - destacado
	var ingredientes : GameObject[];
	
	var textoMeth : textoMain;
	var balaoFalas : balaoFala;

	function OnMouseEnter()
	{
		GetComponent(Image).sprite = frames[1];
	}
	
	function OnMouseExit()
	{
		GetComponent(Image).sprite = frames[0];
	}
	
	function OnMouseDown()
	{
		produzir();
	}	

	function produzir()
	{
	    textoMeth = GameObject.Find("contadorMeth").GetComponent(textoMain);
		
		for each (ingrediente in ingredientes) {
			if (ingrediente.GetComponent(Ingrediente).getQuantidade() <= 0) {
				balaoFalas.falar(0);
				return;
			}
		}
				
		for each (ingrediente in ingredientes)
			ingrediente.GetComponent(Ingrediente).remover();
			
		textoMeth.addValor(1.0, "contadorInstantaneoMeth");
	}

}

