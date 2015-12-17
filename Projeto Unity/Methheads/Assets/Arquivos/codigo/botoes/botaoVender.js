#pragma strict

class botaoVender extends MonoBehaviour {

	var entidade : entidadeLocal;
	var frames : Sprite[];
	
	var contador : contadorInstantaneo;

	function Start() 
	{ 
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		contador = GameObject.Find("contadorInstantaneoSell").GetComponent(contadorInstantaneo);
	
		GetComponent(Animator).enabled = false; 
	}

	function vender()
	{
		var valor : float;
		valor = entidade.getValor("meth") * entidade.getPrecoUnidade();
	
		entidade.atualizarDinheiro("sujo", valor);
		entidade.atualizarMeth(entidade.getValor("meth") * -1);
		
		contador.contar(valor);
	}
	
	function OnMouseDown() 
	{
		if (entidade.getValor("meth") > 0) 
		{
			vender();
			GetComponent(Image).sprite = frames[1];
			GetComponent(Animator).enabled = false;
		}
	}
	
	function OnMouseEnter() 
	{
		if (entidade.getValor("meth") == 0)
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