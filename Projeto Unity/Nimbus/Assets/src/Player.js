#pragma strict

//elementos do corpo
var Corpo : GameObject;
var Cabeca : GameObject;
var Peitoral : GameObject;
var PernaEsq : GameObject;
var PernaDir : GameObject;
var BracoDir : GameObject; 
var BracoEsq : GameObject;
var Membros : GameObject[];

//elementos do personagem
var Nome : String;
var Forca : float;
var Velocidade : float;
var Bola : GameObject;

///elementos de acao
var Voando : boolean;
var Atirando : boolean;
var LadoApontado : String;

// elementos do jogo
var Cam : Camera;
var RigidBody : Rigidbody2D;
 
function Start () 
{
	Corpo = gameObject.Find("Corpo");
	Cabeca = gameObject.Find("Cabeca");
	Peitoral = gameObject.Find("Peitoral");
	PernaEsq = gameObject.Find("PernaEsq");
	PernaDir = gameObject.Find("PernaDir");
	BracoEsq = gameObject.Find("BracoEsq");
	BracoDir = gameObject.Find("BracoDir");

  Membros = [Corpo, Cabeca, Peitoral, PernaEsq, PernaDir, BracoEsq, BracoDir];

	Voando = false;
	Atirando = false;
	LadoApontado = GetMouseLado();

	Cam = GameObject.Find("Camera").GetComponent(Camera);
	RigidBody = gameObject.GetComponent(Rigidbody2D);
}

function Update()
{
	ApontarBraco();
	CorrigirPosicaoCoporal();
}
 
function FixedUpdate() 
{ 
    if(Input.GetAxis("Voar"))   
        if (!Voando)
            Voar();

    if (Input.GetAxis("Jogar"))
        if (Bola != null) {
          Bola.GetComponent(Ball).Empurrar();
          Bola = null;
        }
}
 
function Voar()
{
    Voando = true;
    RigidBody.AddRelativeForce(Vector2.ClampMagnitude(GetMousePos().normalized * Velocidade * Time.deltaTime, 1.0));

    CancelInvoke("ResetarVoo");
    Invoke("ResetarVoo", 3);
}

function ResetarVoo()
{
    Voando = false;
}

function Coletar(Bola : GameObject)
{
  this.Bola = Bola;
  Bola.GetComponent(Ball).AtualizarDono(gameObject);
}

function GetMousePos()
{
	var mousePos = Cam.ScreenToWorldPoint(Input.mousePosition);
  mousePos = Vector2(mousePos.x, mousePos.y);
  var direcao = (mousePos - this.transform.position);

  return direcao;
}

function GetMouseLado()
{
	var Lado : String;
	if (BracoDir.transform.rotation[2] <= 0.7 && BracoDir.transform.rotation[2] >= -0.7)
   		Lado = "Direita";
   	else
   		Lado = "Esquerda";

   	return Lado;
}

function GetMembro(nome : String)
{
  for (var Membro : GameObject in Membros)
    if (Membro.gameObject.name == nome)
      return Membro;

  return null;
}

function GetForca()
{
  return Forca;
}

function GetVelocidade()
{
  return Velocidade;
}

function ApontarBraco()
{
	var angle = Mathf.Atan2(GetMousePos().y, GetMousePos().x) * Mathf.Rad2Deg;
   BracoDir.transform.rotation = Quaternion.Euler(BracoDir.transform.position.x, BracoDir.transform.position.y, angle);
}

function CorrigirPosicaoCoporal()
{
	var NovoLado = GetMouseLado();

   	if (NovoLado != LadoApontado) {
   		if (Corpo.transform.rotation.y == 0) {// apontando pra esquerda
   			Corpo.transform.rotation.y = 180;
   			BracoDir.GetComponent(SpriteRenderer).flipY = true;
   		} else {
   			Corpo.transform.rotation.y = 0;
   			BracoDir.GetComponent(SpriteRenderer).flipY = false;
   		}	
   	}

   	LadoApontado = NovoLado;
}

function OnCollisionEnter2D(Objeto : Collision2D)
{
    var Tag = Objeto.gameObject.tag;
    
    if(Tag == "Plataforma") {
        Voando = false;
        RigidBody.velocity = (Vector3.zero);
	  }

    if (Tag == "Bola") {
        Coletar(Objeto.gameObject);
    }
}