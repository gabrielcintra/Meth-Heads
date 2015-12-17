#pragma strict

class botoesPC extends MonoBehaviour
{
    var objetoMestre : GameObject;
    var desativarObjetos : GameObject[];
    var ativar_desativarCollider : GameObject;
    var cursorManager : mudarCursor;
    var imagem_barratarefas : Sprite;

    function OnMouseEnter(){
        Cursor.SetCursor(cursorManager.texturaCursorEmCima,cursorManager.hotSpot,cursorManager.modoCursor);
    }

    function OnMouseExit(){
        Cursor.SetCursor(cursorManager.texturaCursorDefault,cursorManager.hotSpot,cursorManager.modoCursor);
    }
}