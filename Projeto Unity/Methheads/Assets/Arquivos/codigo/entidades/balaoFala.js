#pragma strict

import UnityEngine.UI;
 
class balaoFala extends MonoBehaviour{
 
 	var estaFalando : boolean;
 	var temMosca : boolean;
 	
	var balaoFala : GameObject;
	var balaoTexto : Text;
	
	var falasNormal = ["Say my name.", 
					   "I'm the one who \n knocks.",
					   "Your meth is disgraceful!", 
					   "Lets cook!", 
					   "Don't you know how to cook?",
					   "CLICK! CLICK EVERYWHERE!", "Watch out for DEA."];			   
	var falasMosca = ["A FLY! KILL IT!", 
	                  "We can't cook correctly with \n a fly in the lab.",
		              "A fucking fly. Kill it please.", 
		              "Thats the sound of... OMG! A FLY!"];	              
	var falasDEA = ["You're taking too much risk.", "DEA is on us."];
	var falasDEApego = ["DEA has seized some of our labs and \n arrested some of our dealers."]; 
	var falasIRS = ["DEA and IRS are on us."];
	var falasIRS2 = ["IRS is watching us.", "Be careful with IRS."];
	var falasDEAIRS = ["Shit...IRS took our money"];
	
	// FALAS INDEXADAS
	var falasIngredientes = ["You don't have ingredients!", "How can you cook without ingredients?", "Look your material to cook first."];
	var falasDinheiro = ["Go get some money!", "No money for it.", "You can't buy without money.", "Look your money."];
	//--------------------------
	
	function Start() 
	{
		balaoFala = GameObject.Find("balaoFala");
		balaoTexto = GameObject.Find("FalaWW").GetComponent(Text);
		
		balaoFala.SetActive(false);
		Invoke("falar", Random.Range(4, 15));
	}

	function falar() 
	{
		var falas : String[];
		var texto: String;
		var temMosca = GameObject.Find("Mosca");
		
		if (temMosca != null)
			falas = falasMosca;
		else
			falas = falasNormal;
			
		texto = falas[Random.Range(0, falas.length-1)];
		
		falar(texto);
	}
	
	// Utiliza as falas indexadas la de cima
	function falar(tipo : int)
	{
		// 0 - falas de ingrediente faltando
		// 1 - falas de falta de dinheiro
		
		var texto : String;
		var falas : String[];
		
		switch(tipo) {
			case 0:
				falas = falasIngredientes;
				break;
			case 1:
				falas = falasDinheiro;
				break;
		}
		
		texto = falas[Random.Range(0, falas.length-1)];
		
		falar(texto);
	}
	
	function falar(texto : String)
	{
		if (!estaFalando) {
			CancelInvoke("falar");
			estaFalando = true;
			
			balaoTexto.text = texto;
			balaoFala.SetActive(true);
			
			var tempo = texto.length;
			if (tempo > 5)
				tempo = 5;
			
			Invoke("calar", tempo);
		}
	}
	
	function calar(falar : boolean) 
	{	
		balaoFala.SetActive(false);
		estaFalando = false;
		
		if (falar)
			Invoke("falar", Random.Range(4, 10));
	}

	function calar() 
	{ 
		calar(true);
	}
}