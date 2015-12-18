#pragma strict

static var numeroDigitado : String;
static var objetoTelefone : GameObject;

var audioSource : AudioSource;
var somOcupado : AudioClip;
var somLigar : AudioClip;
var somDesligar : AudioClip;
var somDigitar : AudioClip;

function Start () {
    objetoTelefone = GameObject.Find("telefoneInterface");
}

function ativarTelefone(){
    for(var l = 0; l < objetoTelefone.transform.childCount; ++l)
        objetoTelefone.transform.GetChild(l).gameObject.SetActive(true);
}

function Desligar(){
    numeroDigitado = "";
    GameObject.Find("numeroDigitado").GetComponent(Text).text = "";

    for(var l = 0; l < objetoTelefone.transform.childCount; ++l)
        objetoTelefone.transform.GetChild(l).gameObject.SetActive(false);
}

function playDesligar(){
    audioSource.clip = somDesligar;
    audioSource.Play();
}

function playLigar(){
    audioSource.clip = somLigar;
    audioSource.Play();
    Invoke("Desligar",somLigar.length);
    
}

function playOcupado(){
    audioSource.clip = somOcupado;
    audioSource.Play();
}

function playDigitar(){
    audioSource.clip = somDigitar;
    audioSource.Play();
}

function acaoPizza(){
    print("ok");
}