#pragma strict

class Labs extends MonoBehaviour{

static var labs: String[];
static var precoslabs: float[];
static var taxaslabs : float[];
static var infoslabs : String[];
static var riscolabs : float[];
static var taxasingredientes : float[];
static var LabsComprados : int[];

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


labs = ["Basement","Container","RV","Shed","Tented House","Kitchen","Laboratory","Bunker","Airplane","Submarine","Space lab"];
taxaslabs = [20.0,65.0,360.0,2600.0,8500.0,18000.0,75000.0,12000000.0,51000000.0,23000000000,65000000000.0];
taxasingredientes = [0.1,0.2,0.4,0.3,0.5,0.3,0.2,0.4,0.7,0.8,1];
riscolabs = [6.0,7.2,3.4,5.4,1.4,7.0,12.0,0.6,16.0,1.1,0.3];
infoslabs = ["A hiding place to cook. 20 Meth per click. 6% DEA risk.",
"A hidden container near the port. \n 65 Meth per click. 7.2% DEA risk.",
"A RV to remote cook just like Heisenberg. \n 360 Meth per click. 3.4% DEA risk",
"A cheap shed in a quiet neighborhood. \n 2.6k Meth per click. 5.4% DEA risk",
"Vamonos Pest is ready to rock. \n 8.5k Meth per click. 1.4% DEA risk",
"Let's cook! \n 18k meth per click. 7% DEA risk",
"A scientific lab with all good equipments \n 75k Meth per click 12% DEA risk",
"No one will find you... really. \n 12mi Meth per click. 1.1% DEA risk",
"Remote cook has a new definition. \n 51mi Meth per click. 16% DEA risk",
"Cook underwater to maximum discretion. \n 23bi Meth per click. 0.6% DEA risk",
"Pluto, Saturn, Mars... cook EVERYWHERE! \n 65bi Meth per click. 0.3% DEA risk"];

FirstRunShop = PlayerPrefs.GetInt("FirstRunShopLabs");

if (FirstRunShop == 0){
precosDefault();
}
else{
LoadPrecos();
}

identificarItem();

precoUI = GameObject.Find("preco" + labs[id]).GetComponent(Text);
}

function Update () {

precodoitem = precoslabs[id];
taxadoitem = taxaslabs[id];

if (OJogo.dinheiro >= precodoitem){
JaSabeQuemEh = true;
dinheiroEstaMaior = true;
botaoDoItem.interactable = true;
}
else{
dinheiroEstaMaior = false;
botaoDoItem.interactable = false;
}

if (JaSabeQuemEh || LabsComprados[id] > 0){
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
      OJogo.dinheiro -= precoslabs[id];
      OJogo.labs += taxaslabs[id];
      OJogo.dea += riscolabs[id];
      Ingredientes.proporcaoIngredientes += taxasingredientes[id];
      LabsComprados[id] += 1;
      precoslabs[id] = precoslabs[id]*1.25;
}
}

function identificarItem(){
item = this.gameObject;
nomedoitem = item.name;
botaoDoItem = item.GetComponent(Button);
id = labs.IndexOf(labs,nomedoitem); 
}
	
function showpanel(){
painelInfo.SetActive(true);
painelInfoItem.text = infoslabs[id];
nomePainelInfo.text = labs[id];
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
precoslabs = PlayerPrefsX.GetFloatArray("PrecosLab");
LabsComprados = PlayerPrefsX.GetIntArray("LabsComprados");
}

function SalvarPrecos(){
PlayerPrefsX.SetFloatArray("PrecosLab",precoslabs);
PlayerPrefsX.SetIntArray("LabsComprados",LabsComprados);
}

function precosDefault(){
precoslabs = [400.0,1250.0,6550.0,30000.0,145000.0,410000.0,1000000.0,500000000.0,1200000000.0,500000000000.0,1000000000000.0];
LabsComprados = [0,0,0,0,0,0,0,0,0,0,0];
SalvarPrecos();
FirstRunShop = 1;
PlayerPrefs.SetInt("FirstRunShopLabs",FirstRunShop);
}

}