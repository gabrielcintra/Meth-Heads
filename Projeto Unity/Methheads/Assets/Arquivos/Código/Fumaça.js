#pragma strict
var smoke : GameObject;

function Start () {
smoke = GameObject.Find("WhiteSmoke");
smoke.SetActive(false);
}

function Update () {

}

function OnMouseEnter(){
smoke.SetActive(true); 
}

function OnMouseExit(){
smoke.SetActive(false);
}