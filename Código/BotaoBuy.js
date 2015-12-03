#pragma strict


function Update () {

if (OJogo.dinheiro <= (OJogo.clickMeth * 0.2)){
GetComponent(Button).interactable = false;
}else{
GetComponent(Button).interactable = true;
}
}