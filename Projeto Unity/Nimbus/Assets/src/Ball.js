#pragma strict
import UnityEngine.Quaternion;
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
	if (Dono != null) 
		this.transform.position = Dono.gameObject.GetComponent(Player).GetMembro("BracoDir").transform.GetChild(0).transform.position;	
}

function Empurrar()
{
	UltimoDono = Dono;
	Dono = null;

	var Player = UltimoDono.GetComponent(Player);

	transform.LookAt(Player.GetMousePos().normalized, Vector3.forward);
	RigidBody.AddForce(transform.forward * Player.GetForca());
}

function AtualizarDono(Dono : GameObject)
{
	UltimoDono = this.Dono;
	this.Dono = Dono;
}

function OnTriggerEnter2D(Objeto : Collider2D){
	var Tag = Objeto.gameObject.tag;

	if (Tag == "Jogador"){
		Objeto.GetComponent(Player).Coletar(this.gameObject);	
	}
}