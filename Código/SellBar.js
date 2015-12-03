#pragma strict

function Start () {
this.gameObject.transform.position.y = -39.25702;
}

function Update () {
if (OJogo.vendeu == true){
this.gameObject.transform.position.y += OJogo.velocidadeTransporte;
}
if (this.gameObject.transform.position.y > -12.95665){
OJogo.vendermeth();
OJogo.vendeu = false;
this.gameObject.transform.position.y = -39.25702;
}
}
