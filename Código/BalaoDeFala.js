#pragma strict

class BalaoDeFala extends MonoBehaviour{

var balaodefala : GameObject;
var balaodefalatexto : Text;
var FalasWWmain : String[];
var FalasWWFly : String[];
var FalasWWDEA : String[];
var FalasWWDEA2 : String[];
var FalasWWIRS : String[];
var FalasWWIRS2 : String[];
var FalasWWDeaIRS : String[];
var falaAtual : String;

function Start () {
balaodefala = GameObject.Find("Balaodefala");
balaodefalatexto = GameObject.Find("TextoBalaoDeFala").GetComponent(Text);

FalasWWmain = ["Say my name.", "I'm the one who \n knocks.", 
"Your meth is disgraceful!", "Lets cook!", "Don't you know how to cook?", 
"CLICK! CLICK EVERYWHERE!", "Watch out for DEA."];

FalasWWFly = ["A FLY! KILL IT!", "We can't cook correctly with \n a fly in the lab.", 
"A fucking fly. Kill it please.", "Thats the sound of... OMG! A FLY!"];

FalasWWDEA = ["You're taking too much risk.", 
"DEA is on us."];
FalasWWDEA2 = ["DEA has seized some of our labs and \n arrested some of our dealers."];

FalasWWDeaIRS = ["DEA and IRS are on us."];

FalasWWIRS = ["IRS is watching us.", "Be careful with IRS."];
FalasWWIRS2 = ["Shit...IRS took our money"];


balaodefala.SetActive(false);
Invoke("falar", 5);
}

function Update () {

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
}

function falar(){
balaodefala.SetActive(true);
balaodefalatexto.text = "" + falaAtual;
Invoke("calar", 8);
}

function calar(){
balaodefala.SetActive(false);
Invoke("falar",5);
}
}