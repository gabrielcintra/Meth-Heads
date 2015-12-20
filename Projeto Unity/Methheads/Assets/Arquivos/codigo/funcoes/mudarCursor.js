#pragma strict

class mudarCursor extends MonoBehaviour {

	var texturaCursorAbrindo : Texture2D;
	var texturaCursorDefault : Texture2D;
	var texturaCursorEmCima : Texture2D;
	var modoCursor : CursorMode = CursorMode.Auto;
	var hotSpot : Vector2 = Vector2.zero;

	function Start()
	{
	    Cursor.SetCursor(texturaCursorDefault,hotSpot,modoCursor);
	}

	function setCursorAbrindo(tempo : int)
	{
	    Cursor.SetCursor(texturaCursorAbrindo,hotSpot,modoCursor);
	    Invoke("setCursorDefault", tempo);
	}

	function setCursorEmCima()
	{
	    Cursor.SetCursor(texturaCursorEmCima,hotSpot,modoCursor);
	}

	function setCursorDefault()
	{
	    Cursor.SetCursor(texturaCursorDefault,hotSpot,modoCursor);
	}

}