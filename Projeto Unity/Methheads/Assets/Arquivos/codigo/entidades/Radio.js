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
    checarTamanho();
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
    checarTamanho();
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

function checarTamanho(){
    if (audioManager.clip.length > 120){
        audioManager.loop = false;
        Invoke("passar", audioManager.clip.length);
    }
    else{
        audioManager.loop = true;
    }
}