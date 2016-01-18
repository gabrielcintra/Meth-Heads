#pragma strict

// Elementos da bola
var Dono : GameObject;
var UltimoDono : GameObject;
var RigidBody : Rigidbody2D;

// elementos do jogo
var Cam : Camera;

function Start () 
{
	RigidBody = gameObject.GetComponent(Rigidbody2D);
	Cam = GameObject.Find("Camera").GetComponent(Camera);
}

function Update () 
{
	if (Dono != null) {
		this.transform.position = Dono.gameObject.GetComponent(Player).GetMembro("BracoDir").transform.GetChild(0).transform.position;
		GetComponent(CircleCollider2D).enabled = false;
	} else {
		GetComponent(CircleCollider2D).enabled = true;
	}
}

function Empurrar()
{
	UltimoDono = Dono;
	Dono = null;

	RigidBody.AddRelativeForce(Vector2.ClampMagnitude(UltimoDono.GetComponent(Player).GetMousePos().normalized,1));
}

function AtualizarDono(Dono : GameObject)
{
	UltimoDono = this.Dono;
	this.Dono = Dono;
}