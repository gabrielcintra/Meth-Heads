#pragma strict
import System.DateTime;

var textoHora : Text;
var cursorManager : mudarCursor;

function Start(){
    atualizarHora();
    Cursor.SetCursor(cursorManager.texturaCursorDefault,cursorManager.hotSpot,cursorManager.modoCursor);
}

function atualizarHora(){
    textoHora.text = "" + System.DateTime.Now.ToString("hh:mm");
    Invoke("atualizarHora",60);
}