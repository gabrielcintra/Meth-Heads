#pragma strict

var Tag : String;

function Start () {
	IgnorarColisao(Tag);
}

function Update () {

}

function IgnorarColisao(Tag : String){
	for(Objetos in GameObject.FindGameObjectsWithTag(Tag))
		Physics2D.IgnoreCollision(GetComponent(Collider2D),Objetos.GetComponent(Collider2D));
}
