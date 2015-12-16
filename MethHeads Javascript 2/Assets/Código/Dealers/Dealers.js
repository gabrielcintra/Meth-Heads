#pragma strict

class Dealers extends MonoBehaviour{

static var dealers: String[];
static var precosDealers: float[];
static var taxasDealers : float[];
static var infosDealers : String[];
static var riscoDealers : float[];
static var DealersComprados : int[];

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


dealers = ["Badger","SkinnyPete","Combo","Tuco","Declan","Lydia","Gustavo"];
taxasDealers = [1.0,20.0,120.0,1000.0,30000.0,100000.0,10000000.0];
riscoDealers = [3.0,2.2,1.2,20.0,14.0,7.0,1.0];
infosDealers = ["'I totally would have smoked that.' \n Sells 1 automatically. 3% DEA risk.",
"'Yeah man, whatever'\n Sells 20 automatically. 2.2% DEA risk. ",
"'Now run 'ome, cuz mummy's cookin' curry'\n Sells 120 automatically. 1.2% DEA risk.",
"'When you have to shoot, shoot. Don't talk.' \n Sells 1k automatically. 20% DEA risk(be careful with this guy).",
"'Heisenberg.' \n Sells 30kautomatically. 14% DEA risk. ",
"'We're going to make a lot of money together.'\n Sells 100k automatically. 7% DEA risk",
"'What does a man do? A man provides.' \n Sells 10m automatically. 1% DEA risk"];

FirstRunShop = PlayerPrefs.GetInt("FirstRunShopDealers");

if (FirstRunShop == 0){
precosDefault();
}
else{
LoadPrecos();
}

identificarItem();

precoUI = GameObject.Find("preco" + dealers[id]).GetComponent(Text);
}

function Update () {

precodoitem = precosDealers[id];
taxadoitem = taxasDealers[id];

if (OJogo.dinheiro >= precodoitem){
JaSabeQuemEh = true;
dinheiroEstaMaior = true;
botaoDoItem.interactable = true;
}
else{
dinheiroEstaMaior = false;
botaoDoItem.interactable = false;
}

if (JaSabeQuemEh || DealersComprados[id] > 0){
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
      OJogo.dinheiro -= precosDealers[id];
      OJogo.dealers += taxasDealers[id];
      OJogo.dea += riscoDealers[id];
      DealersComprados[id] += 1;
      precosDealers[id] = precosDealers[id]*1.25;
}
}

function identificarItem(){
item = this.gameObject;
nomedoitem = item.name;
botaoDoItem = item.GetComponent(Button);
id = dealers.IndexOf(dealers,nomedoitem); 
}
	
function showpanel(){
painelInfo.SetActive(true);
painelInfoItem.text = infosDealers[id];
nomePainelInfo.text = dealers[id];
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
precosDealers = PlayerPrefsX.GetFloatArray("PrecosDealers");
DealersComprados = PlayerPrefsX.GetIntArray("DealersComprados");
}


function SalvarPrecos(){
PlayerPrefsX.SetFloatArray("PrecosDealers",precosDealers);
PlayerPrefsX.SetIntArray("DealersComprados",DealersComprados);
}

function precosDefault(){
precosDealers = [45.0,150.0,2800.0,25000.0,500000,100000000.0,1000000000.0];
DealersComprados = [0,0,0,0,0,0,0];
SalvarPrecos();
FirstRunShop = 1;
PlayerPrefs.SetInt("FirstRunShopDealers",FirstRunShop);
}

}