#pragma strict

var menuRadio : GameObject;
var sons : AudioClip[];
private var audioManager : AudioSource;
private var menuAberto : boolean;

///todas as declarações foram feitas no inspector

function Start () {
    menuRadio.SetActive(false);
    menuAberto = false;
    audioManager = GameObject.Find("musicaRadio").GetComponent(AudioSource);
}

function iniciar(){
    audioManager.UnPause();
}

function pausar(){
    audioManager.Pause();
}

function passar(){
    var indexMusicaAtual = sons.IndexOf(sons,audioManager.clip);
    
    if (indexMusicaAtual + 1 < sons.length){
        audioManager.clip = sons[indexMusicaAtual+1];
        audioManager.Play();
    }
    else{
        audioManager.clip = sons[0];
        audioManager.Play();
    }
}

function abrirFecharMenu(){
    if (!menuAberto){
        menuRadio.SetActive(true);
        menuAberto = true;
    }
    else{
        menuRadio.SetActive(false);
        menuAberto = false;
    }
}