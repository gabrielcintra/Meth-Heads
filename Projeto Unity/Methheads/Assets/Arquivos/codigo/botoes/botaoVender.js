#pragma strict

class botaoVender extends MonoBehaviour {

	var frames : Sprite[];

	var textoMeth : textoMain;
	var valorMeth : long;
	
	var textoDinSujo : textoMain;
	var valorSujo : long;
	
	var temMeth : boolean;

	function Start() 
	{ 
		temMeth = false;
		GetComponent(Animator).enabled = false; 
	}

	function vender()
	{
		textoMeth = GameObject.Find("contadorMeth").GetComponent(textoMain);
		textoDinSujo = GameObject.Find("contadorDinheiroSujo").GetComponent(textoMain);
		
		valorMeth = textoMeth.getValor();
		valorSujo = textoDinSujo.getValor();
		
		textoDinSujo.addValor(valorMeth);
		textoMeth.setValor(0.0);
	}
	
	function OnMouseDown() 
	{
		if (temMeth) 
		{
			vender();
			GetComponent(Image).sprite = frames[1];
			GetComponent(Animator).enabled = false;
		}
	}
	
	function OnMouseEnter() 
	{
		var valorMeth = GameObject.Find("contadorMeth").GetComponent(textoMain).getValor();
		
		if (valorMeth > 0)
			temMeth = true;
		else
			temMeth = false;
		
		if (!temMeth)
			GetComponent(Image).sprite = frames[1];
		else 
			GetComponent(Animator).enabled = true;
	}
	
	function OnMouseExit() 
	{
		GetComponent(Image).sprite = frames[0];
		GetComponent(Animator).enabled = false;
	}

}