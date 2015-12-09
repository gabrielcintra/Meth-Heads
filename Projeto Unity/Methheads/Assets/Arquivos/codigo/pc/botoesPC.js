#pragma strict

var objetoMestre : GameObject;
var desativarObjetos : GameObject[];
var ativar_desativarCollider : GameObject;
var cursorManager : mudarCursor;
var funcao : String;

function OnMouseEnter(){
    Cursor.SetCursor(cursorManager.texturaCursorEmCima,cursorManager.hotSpot,cursorManager.modoCursor);
}

function OnMouseExit(){
    Cursor.SetCursor(cursorManager.texturaCursorDefault,cursorManager.hotSpot,cursorManager.modoCursor);
}

function OnMouseDown(){
    Cursor.SetCursor(cursorManager.texturaCursorAbrindo,cursorManager.hotSpot,cursorManager.modoCursor);
 
    if (funcao == "abrir"){
        
        for(var i = 0; i < objetoMestre.transform.childCount; ++i)
            objetoMestre.transform.GetChild(i).gameObject.SetActive(true);


        if (desativarObjetos != null)
        {
            for(var objetos : GameObject in desativarObjetos)
                for(var l = 0; l < objetos.transform.childCount; ++l)
                    objetos.transform.GetChild(i).gameObject.SetActive(false);
            }


        if (ativar_desativarCollider != null){
            for(var v = 0; v < ativar_desativarCollider.transform.childCount; ++v)
                ativar_desativarCollider.transform.GetChild(v).GetComponent(BoxCollider).enabled = false;
      }
    
    
    }
    
    
    if (funcao == "fechar"){
           
        for(var y = 0; y < objetoMestre.transform.childCount; ++y)
            objetoMestre.transform.GetChild(y).gameObject.SetActive(false);
       
        
        if (ativar_desativarCollider != null){
            for(var s = 0; s < ativar_desativarCollider.transform.childCount; ++s)
                ativar_desativarCollider.transform.GetChild(s).GetComponent(BoxCollider).enabled = true;
        }
    
    }



}