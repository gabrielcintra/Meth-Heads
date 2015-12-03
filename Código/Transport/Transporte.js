#pragma strict

class Transporte extends MonoBehaviour{

static var transportes: String[];
static var precosTransporte: float[];
static var taxas_capacidadeTransporte : float[];
static var infosTransporte : String[];
static var riscoTransporte : float[];
static var taxas_velocidadeTransporte : float[];
static var TransportesComprados : int[];

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


transportes = ["Wheelbarrow","Bicycle","WoodenBoat","OldCar","Van","Truck","Train","SingleEnginePlane","BulletTrain","CargoHelicopter","CargoShip","Jet"];
taxas_capacidadeTransporte = [9.0,5.0,18.0,23.0,350.0,3400.0,19000.0,9000.0,350000.0,2000000.0,8500000.0,200000.0];
taxas_velocidadeTransporte = [0.02,0.07,0.03,0.09,0.12,0.09,0.2,0.5,1.2,0.8,0.4,5];
riscoTransporte = [8.0,4.0,3.0,6.0,9.0,16.0,24.0,7.0,28.0,45.0,30.0,18.0];
infosTransporte = ["The cops wont suspect anything. Carry 8 lb, improves 'sell velocity' by 0.02. 8% DEA risk.",
"The kid comes for free. Carry 5 lb, improves 'sell velocity' by 0.07. 4% DEA risk.",
"A small boat to interstate business. Carry 18 lb, improves 'sell velocity' by 0.03. 3% DEA risk.",
"Just a regular piece of junk. Carry 23 lb, improves 'sell velocity' by 0.09. 6% DEA risk.",
"Just a van. No big deal. Carry 350 lb, improves 'sell velocity' by 0.12. 9% DEA risk.",
"Space and money are directly proportional. Carry 3400 lb, improves 'sell velocity' by 0.09. 16% DEA risk.",
"It's like Industrial revolution. But with meth. Carry 19k lb, improves 'sell velocity' by 0.2. 24% DEA risk.",
"International business is waiting for you. Carry 9k lb, imrpoves 'sell velocity' by 0.5. 7% DEA risk.",
"As fast as a bullet (No shit). Carry 350k lb, improves 'sell velocity' by 1.2. 28% DEA risk.",
"No soldiers, just meth. Carry 2m lb, improves 'sell velocity' by 0.8. 45% DEA risk.",
"Blue titanic. Carry 8,5m lb, improves 'sell velocity' by 0.4. 30% DEA risk.",
"Really? A jet to carry meth? You crazy nigga. Carry 200k, improves 'sell velocity' by 5. 18% DEA risk."];

FirstRunShop = PlayerPrefs.GetInt("FirstRunShopTransportes");

if (FirstRunShop == 0){
precosDefault();
}
else{
LoadPrecos();
}

identificarItem();

precoUI = GameObject.Find("preco" + transportes[id]).GetComponent(Text);
}

function Update () {
precodoitem = precosTransporte[id];
taxadoitem = taxas_capacidadeTransporte[id];

if (OJogo.dinheiro >= precodoitem){
JaSabeQuemEh = true;
dinheiroEstaMaior = true;
botaoDoItem.interactable = true;
}
else{
dinheiroEstaMaior = false;
botaoDoItem.interactable = false;
}

if (JaSabeQuemEh || TransportesComprados[id] > 0){
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
      OJogo.dinheiro -= precosTransporte[id];
      OJogo.capacidadeTransporte += taxas_capacidadeTransporte[id];
      OJogo.velocidadeTransporte += taxas_velocidadeTransporte[id];
      OJogo.dea += riscoTransporte[id];
      TransportesComprados[id] += 1;
      precosTransporte[id] = precosTransporte[id]*1.25;
//      salvarVelCap();
}
}

function identificarItem(){
item = this.gameObject;
nomedoitem = item.name;
botaoDoItem = item.GetComponent(Button);
id = transportes.IndexOf(transportes,nomedoitem); 
}
	
function showpanel(){
painelInfo.SetActive(true);
painelInfoItem.text = infosTransporte[id];
nomePainelInfo.text = transportes[id];
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
precosTransporte = PlayerPrefsX.GetFloatArray("PrecosTransporte");
TransportesComprados = PlayerPrefsX.GetIntArray("TransportesComprados");
}

function SalvarPrecos(){
PlayerPrefsX.SetFloatArray("PrecosTransporte",precosTransporte);
PlayerPrefsX.SetIntArray("TransportesComprados",TransportesComprados);
}

function SalvarVelCap(){

}

function precosDefault(){
precosTransporte = [20.0,80.0,240.0,800.0,9000.0,75000.0,360000.0,900000.0,5000000.0,25000000.0,1000000000.0,1000000000000.0];
TransportesComprados = [0,0,0,0,0,0,0,0,0,0,0,0];
SalvarPrecos();
FirstRunShop = 1;
PlayerPrefs.SetInt("FirstRunShopTransportes",FirstRunShop);
}
}