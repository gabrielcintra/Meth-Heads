#pragma strict

var objetoMestre : GameObject;
var cursorManager : mudarCursor;

function OnMouseEnter(){
    Cursor.SetCursor(cursorManager.texturaCursorEmCima,cursorManager.hotSpot,cursorManager.modoCursor);
}

function OnMouseExit(){
    Cursor.SetCursor(cursorManager.texturaCursorDefault,cursorManager.hotSpot,cursorManager.modoCursor);
}

function OnMouseDown(){
    Cursor.SetCursor(cursorManager.texturaCursorAbrindo,cursorManager.hotSpot,cursorManager.modoCursor);

    for( var i = 0; i < objetoMestre.transform.childCount; ++i)
        objetoMestre.transform.GetChild(i).gameObject.SetActive(true);

}