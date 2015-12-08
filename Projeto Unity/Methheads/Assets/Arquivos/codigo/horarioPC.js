#pragma strict
import System.DateTime;


var textoHora : Text;

function Start(){
    atualizarHora();
}

function atualizarHora(){
    textoHora.text = "" + System.DateTime.Now.ToString("hh:mm");
    Invoke("atualizarHora",60);
}