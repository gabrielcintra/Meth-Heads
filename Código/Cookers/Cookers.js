#pragma strict

class Cookers extends MonoBehaviour{

static var cookers : String[];
static var precosCookers : float[];
static var taxasCookers : float[];
static var infosCookers : String[];
static var CookersComprados : int[];

var precodoitem : float;
var taxadoitem : float;

var imagemDoItem : Sprite;
var item : GameObject;
var nomedoitem : String;
var botaoDoItem : Button;
var id : int;

var precoUI : Text;

var JaSabeQuemEh : boolean;
var dinheiroEstaMaior : boolean;
var MouseEmCima : boolean;

var FirstRunShop : int;

static var painelInfo : GameObject;
static var nomePainelInfo : Text;
static var painelInfoItem : Text;
static var imagemitem : Image;

function Start () {
painelInfo = GameObject.Find("painelinfo");
nomePainelInfo = GameObject.Find("InfoNome").GetComponent(Text);
painelInfoItem = GameObject.Find("InfoText").GetComponent(Text);
imagemitem = GameObject.Find("ImageItem").GetComponent(Image);

cookers = ["GenericCooker","Todd","WalterWhite","Gale","JessePinkman","Heisenberg","UltraHeisenberg"];
taxasCookers = [1.0,25.0,120.0,1000.0,30000.0,100000.0,10000000.0];
infosCookers = ["Just a generic guy.\n Cooks 1 automatically.",
"'Man, shit happens, huh?'\n Cooks 25 automatically.",
"'I can cook... noodles.'\n Cooks 120 automatically.",
"'To W.W. My star, my perfect silence.' \n Cooks 1000 automatically.",
"'Are we in the meth business, or the money business?' \n Cooks 30k automatically'",
"'Say my name'\n Cooks 100k automatically",
"'I did it for me. I liked it. I was good at it. And, I was really... I was alive.' \n Cooks 10m automatically"];

FirstRunShop = PlayerPrefs.GetInt("FirstRunShopLab");
if (FirstRunShop == 0){
precosDefault();
print("ok");
}
else{
LoadPrecos();
}

identificarItem();

precoUI = GameObject.Find("preco" + cookers[id]).GetComponent(Text);
}
function Update () {
print(FirstRunShop);
precodoitem = precosCookers[id];
taxadoitem = taxasCookers[id];

if (OJogo.dinheiro >= precodoitem){
JaSabeQuemEh = true;
dinheiroEstaMaior = true;
botaoDoItem.interactable = true;
}
else{
dinheiroEstaMaior = false;
botaoDoItem.interactable = false;
}

if (JaSabeQuemEh || CookersComprados[id] > 0){
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
      CookersComprados[id] += 1;
      OJogo.dinheiro -= precosCookers[id];
      OJogo.cozinheiros += taxasCookers[id];
      precosCookers[id] = precosCookers[id]*1.25;
}
}

function identificarItem()
{
	item = this.gameObject;
	nomedoitem = item.name;
	botaoDoItem = item.GetComponent(Button);
	id = cookers.IndexOf(cookers,nomedoitem); 
}
	
function showpanel()
{
	painelInfo.SetActive(true);
	painelInfoItem.text = infosCookers[id];
	nomePainelInfo.text = cookers[id];
	imagemitem.sprite = imagemDoItem;
}

function hidepanel()
{
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
precosCookers = PlayerPrefsX.GetFloatArray("PrecosCookers");
CookersComprados = PlayerPrefsX.GetIntArray("SavedCookersComprados");
}

function SalvarPrecos(){
PlayerPrefsX.SetFloatArray("PrecosCookers",precosCookers);
PlayerPrefsX.SetIntArray("SavedCookersComprados",CookersComprados);
}

function precosDefault(){
precosCookers = [20.0,550.0,2800.0,25000.0,500000,100000000.0,1000000000.0];
CookersComprados = [0,0,0,0,0,0,0];
SalvarPrecos();
FirstRunShop = 1;
PlayerPrefs.SetInt("FirstRunShopLab",FirstRunShop);
}
}