#pragma strict
 
class BalaoFala extends MonoBehaviour{
 
	var balaoFala : GameObject;
	var balaoTexto : Text;
	
	var FalasWWmain = ["Say my name.", 
					   "I'm the one who \n knocks.",
					   "Your meth is disgraceful!", 
					   "Lets cook!", 
					   "Don't you know how to cook?",
					   "CLICK! CLICK EVERYWHERE!", "Watch out for DEA."];
					   
	var FalasWWFly = ["A FLY! KILL IT!", 
	                  "We can't cook correctly with \n a fly in the lab.",
		              "A fucking fly. Kill it please.", 
		              "Thats the sound of... OMG! A FLY!"];
		              
	var FalasWWDEA = ["You're taking too much risk.", "DEA is on us."];
	
	var FalasWWDEA_gotcha = ["DEA has seized some of our labs and \n arrested some of our dealers."];
		 
	var FalasWWIRS = ["DEA and IRS are on us."];
	
	var FalasWWIRS2 = ["IRS is watching us.", "Be careful with IRS."];
	
	var FalasWWDeaIRS = ["Shit...IRS took our money"];
	
	var falaAtual : String;
	 
	function Start () 
	{
		balaoFala = GameObject.Find("balaoFala");
		balaoTexto = GameObject.Find("FalaWW").GetComponent(Text);
		
		balaoFala.SetActive(false);
		Invoke("falar", Random.Range(4, 10));
	}
	
	
	function Update () {
	 /**
		if (Fly.flyON){
		    falaAtual = FalasWWFly[Random.Range(0,3)];
		}
		else if (OJogo.dea > 40 && OJogo.irs > 40){
		    falaAtual = FalasWWDeaIRS[0];
		}
		else if(OJogo.dea > 40){
		    falaAtual = FalasWWDEA[Random.Range(0,1)];
		}
		else if (OJogo.irs > 40){
		    falaAtual = FalasWWIRS[Random.Range(0,1)];
		}
		else{
		    falaAtual = FalasWWmain[Random.Range(0,6)];
		}
		 
		if (OJogo.inspecaoDEAok == false){
		    falaAtual = FalasWWDEA2[0];
		}
		if (OJogo.inspecaoIRSok == false){
		    falaAtual = FalasWWIRS[0];
		}
		**/
	}
	
	function falar() 
	{
		var texto = FalasWWmain[Random.Range(0, FalasWWmain.length-1)];
	
		balaoTexto.text = texto;
		balaoFala.SetActive(true);
		
		Invoke("calar", texto.length - (texto.length/2) - (texto.length/2)/2);
	}
	
	function calar() 
	{	
		balaoFala.SetActive(false);
		Invoke("falar", Random.Range(4, 10));
	}
}