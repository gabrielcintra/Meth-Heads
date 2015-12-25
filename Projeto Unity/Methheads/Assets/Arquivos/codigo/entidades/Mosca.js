#pragma strict

import UnityEngine.Screen;
import UnityEngine.GameObject;
import UnityEngine.Animator;

class Mosca extends MonoBehaviour {

	var moscaObjeto : GameObject;
	var moscaMorta : Sprite[]; //0 - Morta / 1 - Mancha

	function Start () 
	{
		moscaObjeto = GameObject.Find("Mosca");
		moscaObjeto.SetActive(false);
		
		Invoke("tentaAparecer", 0);
	}
	
	function OnMouseDown() 
	{
		mostrarMoscaMorta();
	}
	
	// tenta fazer a mosca surgir na tela (6% de chance)
	function tentaAparecer() 
	{
		var chance = Random.Range(0, 15);

		if (chance == 5) {
			aparecer();
		} else
			Invoke("tentaAparecer", 20);
	}
	
	function aparecer() 
	{ 
		moscaObjeto.SetActive(true);
		
		moscaObjeto.transform.position.x = 0.0;
		moscaObjeto.transform.position.y = 0.0;
		GetComponent(CanvasGroup).alpha = 1;
		
		moverMosca();
	}
	
	function moverMosca() 
	{
		// Screen.weight e Screen.height
		var newX = moscaObjeto.transform.position.x + Random.Range(-0.1,0.1);
		var newY = moscaObjeto.transform.position.y + Random.Range(-0.1,0.1);
		
		if (newX > -4 && newX < 4)
			moscaObjeto.transform.position.x = newX;
		
		if (newY > -4 && newY < 4)
			moscaObjeto.transform.position.y = newY;
			
		moscaObjeto.transform.Rotate(Vector3.forward * Random.Range(-0.8, 0.8));

		Invoke("moverMosca", 0);
	}

	function mostrarMoscaMorta()
	{
		CancelInvoke("moverMosca");	
		GetComponent(Animator).enabled = false;
		GetComponent(Image).sprite = moscaMorta[0];
		
		derrubarMoscaMorta();
	}
	
	function derrubarMoscaMorta()
	{
		if (moscaObjeto.transform.position.y <= -3) {
			GetComponent(Image).sprite = moscaMorta[1];
			Invoke("removerMoscaMorta", 5);
		} else {
			Invoke("derrubarMoscaMorta", 0.01);
			moscaObjeto.transform.position.y = moscaObjeto.transform.position.y - 0.1;
		}
	}
	
	function removerMoscaMorta() 
	{
		if (GetComponent(CanvasGroup).alpha <= 0) {
			GetComponent(Animator).enabled = true;
			moscaObjeto.SetActive(false);
		
			Invoke("tentaAparecer", 20);
		} else {
			GetComponent(CanvasGroup).alpha -= 0.1;
			Invoke("removerMoscaMorta", 0.1);
		}
	}
}