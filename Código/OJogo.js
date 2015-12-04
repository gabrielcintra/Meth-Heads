#pragma strict
import UnityEngine.UI;

public class OJogo extends MonoBehaviour {

	static var metanfetamina : float;
	
	static var dinheiro : float;
	static var dinheirolimpo : float;
	static var taxadinheirolimpo : float;
	
	static var cozinheiros : float;
	static var dealers : float;
	
	static var vendeu : boolean;
	static var velocidadeTransporte : float;
	static var capacidadeTransporte : float;
	
	static var purity : float;
	
	static var labs : float;
	static var clickMeth : float;
	
	static var dea : float;
	static var DEAchance : int;
	static var inspecaoDEAok : boolean;
	
	static var irs : float;
	static var inspecaoIRSok : boolean;
	
	var firstRun : int;
	var dinheiroFormatado : String;
	var TextoMetanfetamina : Text;
	var TextoDinheiro : Text;
	var TextoDinheiroLimpo : Text;

	function Start () {
	    firstRun = PlayerPrefs.GetInt("savedFirstRun");
	    if (firstRun == 0){
	    SetDefaultValues();
	    }
	    else{
	    load();
	    }
	    
	    clickMeth = 1;
	    
	    vendeu = false;
	    
	    inspecaoDEAok = true;
	    inspecaoIRSok = true;
	    DEAchance = 101;
	    
	    InvokeRepeating("vendaAutomatica",0,1);
	    InvokeRepeating("producaoAutomatica",0,1);
		InvokeRepeating("salvar",0,10);
		TextoMetanfetamina = GameObject.Find("Meths").GetComponent(Text);
		TextoDinheiro = GameObject.Find("Dinheiro Sujo").GetComponent(Text);
		TextoDinheiroLimpo = GameObject.Find("Dinheiro Limpo").GetComponent(Text);
	}
	
	function Update () {
	    print(firstRun);
	    print(capacidadeTransporte);
		TextoMetanfetamina.text = metanfetamina.ToString("F2") + " lb";
		TextoDinheiro.text = "$" + formatarDinheiro();
		TextoDinheiroLimpo.text = "$" + formatarDinheiroLimpo();
		
		if(dinheirolimpo < dinheiro){
		dinheirolimpo += taxadinheirolimpo;
		}
		
		irs = (dinheiro/dinheirolimpo)/1000;  
		
	}

	function produzirmeth()
	{
	    if (Ingredientes.EstoqueHcl == true && Ingredientes.EstoqueNaOH == true && Ingredientes.EstoqueH2SO4 == true){  
		metanfetamina += (clickMeth + labs);
		Ingredientes.diminuirBarraIngredientes();
		}
	}
	
	function producaoAutomatica(){
	metanfetamina += cozinheiros;
	}
	
	function vendaAutomatica(){
	var metanfetamina_depois : float;
	metanfetamina_depois = metanfetamina - dealers;
	   if (metanfetamina_depois > 0){
	   metanfetamina -= dealers;
	   dinheiro += dealers * (1 + purity);
	   }
	   else{
	   dinheiro += metanfetamina * (1+purity);
	   metanfetamina = 0;
	   }
	}

	static function vendermeth(){
	    var metanfetamina_depois : float;
	    metanfetamina_depois = metanfetamina - capacidadeTransporte;
		if (metanfetamina_depois > 0) {
			dinheiro += capacidadeTransporte * (1 + purity);
			metanfetamina -= capacidadeTransporte;
		}
		else{
		dinheiro += metanfetamina * (1 + purity);
		metanfetamina = 0;
		}
	}
	function VendeuAMeth(){
	if (metanfetamina > 0){
	    vendeu = true;
	}
	}

	
	function formatarDinheiro(){
	
	if (dinheiro < 1000){
	return dinheiro.ToString("F2");
	}
	else if (dinheiro >= 1000 && dinheiro < 1000000){
	return (dinheiro/1000).ToString("F2") + "k";
	}
	else if (dinheiro >= 1000000 && dinheiro < 1000000000){
	return (dinheiro/1000000).ToString("F2")  + "m";
	}
	else if (dinheiro >= 1000000000 && dinheiro < 1000000000000){
	return (dinheiro/1000000000).ToString("F2")  + "bi";
	}
	else if (dinheiro >= 1000000000000){
	return (dinheiro/1000000000000).ToString("F2")  + "tri";
	}
}
    
    
    function formatarDinheiroLimpo(){
	
	if (dinheirolimpo < 1000){
	return dinheirolimpo.ToString("F2");
	}
	else if (dinheirolimpo >= 1000 && dinheirolimpo < 1000000){
	return (dinheirolimpo/1000).ToString("F2") + "k";
	}
	else if (dinheirolimpo >= 1000000 && dinheirolimpo < 1000000000){
	return (dinheirolimpo/1000000).ToString("F2")  + "m";
	}
	else if (dinheirolimpo >= 1000000000 && dinheirolimpo < 1000000000000){
	return (dinheirolimpo/1000000000).ToString("F2")  + "bi";
	}
	else if(dinheirolimpo >= 1000000000000){
	return (dinheirolimpo/1000000000000).ToString("F2")  + "tri";
	}
	}
	
	 function salvar(){
//	 PlayerPrefs.SetFloat("meth", metanfetamina);
	 PlayerPrefs.SetFloat("savedDinheiroLimpo",dinheirolimpo);
	 PlayerPrefs.SetFloat("savedDinheiro",dinheiro);
	 PlayerPrefs.SetFloat("savedVTransp",velocidadeTransporte);
	 PlayerPrefs.SetFloat("savedCTransp",capacidadeTransporte);
	 }
//	 
	 function load(){
//	 metanfetamina = PlayerPrefs.GetFloat("meth");
        dinheiro = PlayerPrefs.GetFloat("savedDinheiro");
	    dinheirolimpo = PlayerPrefs.GetFloat("savedDinheiroLimpo");
	    velocidadeTransporte = PlayerPrefs.GetFloat("savedVTransp");
	    capacidadeTransporte = PlayerPrefs.GetFloat("savedCTransp");
	 }
	 function SetDefaultValues(){
	   	dinheirolimpo = 1;
	   	capacidadeTransporte = 4;
	   	velocidadeTransporte = 0.1;
	    firstRun = 1;
	   	PlayerPrefs.SetInt("savedFirstRun",firstRun);
	   	salvar();
	 }
	
}