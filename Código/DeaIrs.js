#pragma strict

function Start () {
Invoke("inspecaoIRS", 30);
Invoke("inspecaoDEA", 120);
DontDestroyOnLoad(this.gameObject);
}

function Update () {

}

function inspecaoDEA(){
	 var probabilidade = Random.Range(1,OJogo.DEAchance);
	 var taxaDEA = OJogo.labs * (OJogo.dea/100);
	 var taxaDEA2 = OJogo.dealers * (OJogo.dea/100);
	  
	 if (OJogo.dea < 100 && probabilidade <= OJogo.dea){
	      OJogo.inspecaoDEAok = false;
	      if (OJogo.labs > 0){
	      OJogo.labs -= taxaDEA;
	      }
	      if (OJogo.dealers > 0){
	      OJogo.dealers -= taxaDEA2;
	      }
	 }
	 else{
	      OJogo.inspecaoDEAok = true;
	 }
	 
	 if (OJogo.dea >= 100){
	       OJogo.labs = 0;
	       OJogo.velocidadeTransporte = 0.1;
	       OJogo.capacidadeTransporte = 4;
	       OJogo.cozinheiros = 0;
	       OJogo.dealers = 0;
	       OJogo.dea = 0;
	 }
	 
	 Invoke("inspecaoDEA", 40);
	 }
	 
function inspecaoIRS(){
	 var probabilidade = Random.Range(1,101);
	 var taxaIRS = OJogo.dinheiro * (OJogo.irs/100);
	     
	     if (OJogo.irs < 100 && probabilidade <= OJogo.irs){
	        OJogo.inspecaoIRSok = false;
	        OJogo.dinheiro -= taxaIRS;
	      }
	      else{
	      OJogo.inspecaoIRSok = true;
	      }
	     if (OJogo.irs >= 100){
	        OJogo.dinheiro = OJogo.dinheirolimpo;
	        OJogo.dinheirolimpo = 1;
	        OJogo.irs = 0;
	     }
	 Invoke("inspecaoIRS", 30);
	 }