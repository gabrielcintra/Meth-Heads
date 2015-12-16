#pragma strict

class Shop extends MonoBehaviour{

var TextoMetanfetamina : Text;
var TextoDinheiro : Text;
static var MenuTransition : int;

function Start(){
MenuTransition = 0;
TextoMetanfetamina = GameObject.Find("Metanfetamina").GetComponent(Text);
TextoDinheiro = GameObject.Find("Dinheiro").GetComponent(Text);
InvokeRepeating("vendaAutomatica",1,1);
InvokeRepeating("producaoAutomatica",1,1);
}
function Update () {
TextoMetanfetamina.text = OJogo.metanfetamina.ToString("F2") + " lb";
TextoDinheiro.text = "$"+formatarDinheiro();
}

function formatarDinheiro(){
	
	if (OJogo.dinheiro < 1000){
	return OJogo.dinheiro.ToString("F2");
	}
	else if (OJogo.dinheiro >= 1000 && OJogo.dinheiro < 1000000){
	return (OJogo.dinheiro/1000).ToString("F2") + "k";
	}
	else if (OJogo.dinheiro >= 1000000 && OJogo.dinheiro < 1000000000){
	return (OJogo.dinheiro/1000000).ToString("F2") + "m";
	}
	else if (OJogo.dinheiro >= 1000000000 && OJogo.dinheiro < 1000000000000){
	return (OJogo.dinheiro/1000000000).ToString("F2") + "bi";
	}
	else if (OJogo.dinheiro >= 1000000000000){
	return (OJogo.dinheiro/1000000000000).ToString("F2") + "tri";
	}
}

function producaoAutomatica(){
OJogo.metanfetamina += OJogo.cozinheiros;
	}
	
function vendaAutomatica(){
	
	if (OJogo.metanfetamina >= OJogo.dealers){
	   OJogo.metanfetamina -= OJogo.dealers;
	   OJogo.dinheiro += OJogo.dealers * (1 + OJogo.purity); 
	   }
	
	if (OJogo.metanfetamina < 0){
	   OJogo.metanfetamina = 0;
	   }
	}

function MudarMenu(menu : int){
		MenuTransition = menu;
	}
	
static function salvarPrecos(){
PlayerPrefsX.SetFloatArray("PrecosLab",Labs.precoslabs);
PlayerPrefsX.SetFloatArray("PrecosPurity",PurityItems.precos);
PlayerPrefsX.SetFloatArray("PrecosDealers",Dealers.precosDealers);
PlayerPrefsX.SetFloatArray("PrecosCookers",Cookers.precosCookers);
PlayerPrefsX.SetFloatArray("PrecosTransporte",Transporte.precosTransporte);
}
function loadPrecos(){
Labs.precoslabs = PlayerPrefsX.GetFloatArray("PrecosLab");
Dealers.precosDealers = PlayerPrefsX.GetFloatArray("PrecosDealers");
PurityItems.precos = PlayerPrefsX.GetFloatArray("PrecosPurity");
Cookers.precosCookers = PlayerPrefsX.GetFloatArray("PrecosCookers");
}
}