#pragma strict

class PurityItems extends MonoBehaviour{

static var itens : String[];
static var precos : float[];
static var taxas : float[];
static var infos : String[];
static var PurityComprados : int[];

var precodoitem : float;
var taxadoitem : float;

var imagemDoItem : Sprite;
var item : GameObject;
var nomedoitem : String;
var botaoDoItem : Button;
var id : int;

var precoUI : Text;

var FirstRunShop : int;

var JaSabeQuemEh : boolean;
var dinheiroEstaMaior : boolean;
var MouseEmCima : boolean;

static var painelInfo : GameObject;
static var nomePainelInfo : Text;
static var painelInfoItem : Text;
static var imagemitem : Image;

function Start () {
painelInfo = GameObject.Find("painelinfo");
nomePainelInfo = GameObject.Find("InfoNome").GetComponent(Text);
painelInfoItem = GameObject.Find("InfoText").GetComponent(Text);
imagemitem = GameObject.Find("ImageItem").GetComponent(Image);

itens = ["Broom","TrashCan","Gloves","Flasks","AirFilter","CarbonFilter","CorrosionInhibitor","VacuumCleaner","Autoclave","CleaningWoman","DustCollector","IndustrialAutoclave"];
taxas = [0.01,0.025,0.04,0.6,0.9,0.12,0.18,0.26,0.38,0.53,0.7,0,85,1];
infos = ["The greatest enemy against dirt. \n Improves purity by 1%", 
"Organize your lab garbage. \n Improves purity by 2,5%", 
"Your dirty hands will not affect the meth. \n Improves purity by 4%",
"A good lab has many of these \n Improves purity by 6%", 
"Why stock if you can filter it? \n Improves purity by 12%",
"Say goodbye to contaminants. \n Improves purity by 18%",
"Your machines are now immune to corrosion. \n Improves purity by 26%",
"CLEAN THEM ALL! \n Improves purity by 38%",
"Sterilize your tools efficiently. \n Improves purity by 53%",
"She may be reliable... or not. \n Improves purity by 70%",
"Broom is not the greatest enemy against dirt after all...\n Improves purity by 85%",
"It has industrial on your name. Must be good. \n Improves purity by 100%"];

FirstRunShop = PlayerPrefs.GetInt("FirstRunShopPurity");

if (FirstRunShop == 0){
precosDefault();
}
else{
LoadPrecos();
}

identificarItem();

precoUI = GameObject.Find("preco" + itens[id]).GetComponent(Text);
}

function Update () {

precodoitem = precos[id];
taxadoitem = taxas[id];

if (OJogo.dinheiro >= precodoitem){
JaSabeQuemEh = true;
dinheiroEstaMaior = true;
botaoDoItem.interactable = true;
}
else{
dinheiroEstaMaior = false;
botaoDoItem.interactable = false;
}

if (JaSabeQuemEh || PurityComprados[id] > 0){
precoUI.text = "$" + formatarPreco();
}
else{
precoUI.text = "???";
}  
}

function OnMouseEnter(){
  if (JaSabeQuemEh){
     showpanel();
}
}

function OnMouseDown(){
    ComprarItem();
}

function OnMouseExit(){
   hidepanel();
}


function ComprarItem(){
   if(OJogo.dinheiro >= precodoitem){
      OJogo.dinheiro -= precos[id];
      OJogo.purity += taxas[id];
      PurityComprados[id] += 1;
      precos[id] = precos[id]*1.25;
}
}

function identificarItem(){
item = this.gameObject;
nomedoitem = item.name;
botaoDoItem = item.GetComponent(Button);
id = itens.IndexOf(itens,nomedoitem); 
}
	
function showpanel(){
painelInfo.SetActive(true);
painelInfoItem.text = infos[id];
nomePainelInfo.text = itens[id];
imagemitem.sprite = imagemDoItem;
}

function hidepanel(){
painelInfo.SetActive(false);
}

function formatarPreco(){
	
	if (precodoitem < 1000){
	return precodoitem.ToString("F2");
	}
	else if (precodoitem >= 1000 && precodoitem < 1000000){
	return (precodoitem/1000).ToString("F2") + "k";
	}
	else if (precodoitem >= 1000000 && precodoitem< 1000000000){
	return (precodoitem/1000000).ToString("F2") + "m";
	}
	else if (precodoitem >= 1000000000 && precodoitem < 1000000000000){
	return (precodoitem/1000000000).ToString("F2") + "bi";
	}
	else if (precodoitem >= 1000000000000){
	return (precodoitem/1000000000000).ToString("F2") + "tri";
	}
}
function LoadPrecos(){
precos = PlayerPrefsX.GetFloatArray("PrecosPurity");
PurityComprados = PlayerPrefsX.GetIntArray("PurityComprados");
}
function SalvarPrecos(){
PlayerPrefsX.SetFloatArray("PrecosPurity",precos);
PlayerPrefsX.SetIntArray("PurityComprados",PurityComprados);
}

function precosDefault(){
precos = [10.0,18.0,90.0,130.0,420.0,1300.0,10000.0,60000.0,400000.0,840000.0,5000000.0,150000000.0];
PurityComprados = [0,0,0,0,0,0,0,0,0,0,0,0];
SalvarPrecos();
FirstRunShop = 1;
PlayerPrefs.SetInt("FirstRunShopPurity",FirstRunShop);
}

}