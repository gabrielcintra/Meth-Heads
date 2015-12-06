#pragma strict
var smokeLeft : GameObject;
var smokeRight : GameObject;

function Start () {
	smokeLeft = GameObject.Find("smokeLeft");
	smokeRight = GameObject.Find("smokeRight");
	
	smokeRight.SetActive(true);
	smokeLeft.SetActive(true);
}

function Update () {
}

function OnMouseDown(){
}

function OnMouseExit(){
}