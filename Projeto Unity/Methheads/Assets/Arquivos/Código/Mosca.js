﻿#pragma strict

import UnityEngine.Screen;
import UnityEngine.GameObject;

class Mosca extends MonoBehaviour {

	var moscaObjeto : GameObject;

	function Start () {
	
		moscaObjeto = GameObject.Find("Mosca");
		moscaObjeto.SetActive(false);
		
		Invoke("tentaAparecer", 0);
	}

	function Update () {
	}
	
	function tentaAparecer() {
	
		var chance = 5;// Random.Range(0, 10);
		
		if (chance == 5)
			aparecer();
		else
			Invoke("tentaAparecer", 20);
	}
	
	function aparecer() {
		moscaObjeto.SetActive(true);
		moverMosca();
	}
	
	function moverMosca() {
	
		// Screen.weight e Screen.height

		var newX = moscaObjeto.transform.position.x + Random.Range(-0.07,0.07);
		var newY = moscaObjeto.transform.position.y + Random.Range(-0.07,0.07);
		
		if (newX > -4 && newX < 4)
			moscaObjeto.transform.position.x = newX;
		
		if (newY > -4 && newY < 4)
			moscaObjeto.transform.position.y = newY;
			
		moscaObjeto.transform.Rotate(Vector3.forward * Random.Range(-0.8, 0.8));
		
		Invoke("moverMosca", 0);
	}
	
	function pararMosca() {
	
		moscaObjeto.SetActive(false);
		CancelInvoke("moverMosca");
		Invoke("tentaAparecer", 20);
	}

}
