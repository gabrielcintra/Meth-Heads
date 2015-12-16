#pragma strict

class Ingredientes extends MonoBehaviour{

static var EstoqueHcl : boolean;
static var EstoqueH2SO4 : boolean;
static var EstoqueNaOH : boolean;

static var proporcaohcl : float;
static var proporcaoH2SO4 : float;
static var proporcaoNaOH : float;

var taxaIngredientes : float;
static var proporcaoIngredientes : float;

static var BarraHCL : GameObject;
static var BarraH2SO4 : GameObject;
static var BarraNaOH : GameObject;

var precoHCL : float;
var precoH2SO4 : float;
var precoNaOH : float;

function Start () {

BarraHCL = GameObject.Find("BarraPorcentagemHCL");
BarraH2SO4 = GameObject.Find("BarraPorcentagemH2SO4");
BarraNaOH = GameObject.Find("BarraPorcentagemNAOH");

loadposicoes();

EstoqueHcl = true;
EstoqueH2SO4 = true;
EstoqueNaOH = true;

proporcaoIngredientes = 0.3;
}

function Update () {

taxaIngredientes = OJogo.clickMeth * proporcaoIngredientes;

proporcaohcl = taxaIngredientes * 0.05;
proporcaoH2SO4 = taxaIngredientes * 0.02;
proporcaoNaOH = taxaIngredientes * 0.03;

precoHCL = 0.2 * OJogo.clickMeth;
precoH2SO4 = 0.2 * OJogo.clickMeth;
precoNaOH = 0.2 * OJogo.clickMeth;

}


static function diminuirBarraIngredientes(){
   
	    if (EstoqueHcl == true){
	    BarraHCL.transform.position.y -= proporcaohcl;
	    }
	    if (BarraHCL.transform.position.y < -10.65542){
	    EstoqueHcl = false;
	    }
	    
	     if (EstoqueH2SO4 == true){
	    BarraH2SO4.transform.position.y -= proporcaoH2SO4;
	    }
	    if (BarraH2SO4.transform.position.y < -10.65542){
	    EstoqueH2SO4 = false;
	    }
	    
	    if (EstoqueNaOH == true){
	    BarraNaOH.transform.position.y -= proporcaoNaOH;
	    }
	    if (BarraNaOH.transform.position.y < -10.65542){
	    EstoqueNaOH = false;
	    }
	    
	    
	}
	
function comprarHCL(){
        if (OJogo.dinheiro > precoHCL && BarraHCL.transform.position.y < 7.5){
	    EstoqueHcl = true;
	    BarraHCL.transform.position.y = 7.5; ///6.784627;
	    OJogo.dinheiro -= precoHCL;
	    }
	}
	
function comprarH2SO4(){
        if (OJogo.dinheiro > precoH2SO4 && BarraH2SO4.transform.position.y < 7.5){
	    EstoqueH2SO4 = true;
	    BarraH2SO4.transform.position.y = 7.5;
	    OJogo.dinheiro -= precoH2SO4;
	    }
	}

function comprarNAOH(){
        if (OJogo.dinheiro > precoNaOH && BarraNaOH.transform.position.y < 7.5){
	    EstoqueNaOH = true;
	    BarraNaOH.transform.position.y = 7.5;
	    OJogo.dinheiro -= precoNaOH;
	    }
	}

function loadposicoes(){
BarraHCL.transform.position.y = PlayerPrefs.GetFloat("HCL");
BarraH2SO4.transform.position.y = PlayerPrefs.GetFloat("H2SO4");
BarraNaOH.transform.position.y = PlayerPrefs.GetFloat("NAOH");
EstoqueHcl = PlayerPrefs.GetInt("EsHCL")? true : false;
EstoqueNaOH = PlayerPrefs.GetInt("EsNaOH")? true : false;
EstoqueH2SO4 = PlayerPrefs.GetInt("EsH2S04") ? true : false;
}

function salvarposicoes(){
PlayerPrefs.SetFloat("HCL", BarraHCL.transform.position.y);
PlayerPrefs.SetFloat("H2SO4", BarraH2SO4.transform.position.y);
PlayerPrefs.SetFloat("NAOH", BarraNaOH.transform.position.y);
PlayerPrefs.SetInt("EsHCL", EstoqueHcl? 1 : 0);
PlayerPrefs.SetInt("EsNaOH", EstoqueNaOH? 1 : 0);
PlayerPrefs.SetInt("EsH2SO4", EstoqueH2SO4? 1 : 0);
}
}
			