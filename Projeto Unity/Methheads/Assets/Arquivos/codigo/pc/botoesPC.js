#pragma strict

var objetoMestre : GameObject;
var desativarObjetos : GameObject[];
var ativar_desativarCollider : GameObject;
var cursorManager : mudarCursor;
var funcao : String;
var imagem_barratarefas : Sprite;

function OnMouseEnter(){
    Cursor.SetCursor(cursorManager.texturaCursorEmCima,cursorManager.hotSpot,cursorManager.modoCursor);
}

function OnMouseExit(){
    Cursor.SetCursor(cursorManager.texturaCursorDefault,cursorManager.hotSpot,cursorManager.modoCursor);
}

function OnMouseDown(){
    Cursor.SetCursor(cursorManager.texturaCursorAbrindo,cursorManager.hotSpot,cursorManager.modoCursor);
 
    if (imagem_barratarefas != null){
        GameObject.Find("barradetarefas").GetComponent(CanvasGroup).alpha = 1;
        GameObject.Find("barradetarefas").GetComponent(Image).sprite = imagem_barratarefas;
    }


    if (funcao == "abrir"){
        
        for(var i = 0; i < objetoMestre.transform.childCount; ++i)
            objetoMestre.transform.GetChild(i).gameObject.SetActive(true);

        if (desativarObjetos.length > 0)
        {
            for(var objetos in desativarObjetos){
                for(var l = 0; l < objetos.transform.childCount; ++l)
                    objetos.transform.GetChild(l).gameObject.SetActive(false);}
        }


        if (ativar_desativarCollider != null){
            for(var v = 0; v < ativar_desativarCollider.transform.childCount; ++v)
                ativar_desativarCollider.transform.GetChild(v).GetComponent(BoxCollider).enabled = false;
        }
    }
    
    
    if (funcao == "fechar"){

        if (imagem_barratarefas != null){
            GameObject.Find("barradetarefas").GetComponent(CanvasGroup).alpha = 0;
            GameObject.Find("barradetarefas").GetComponent(Image).sprite = null;
        }
           
            for(var y = 0; y < objetoMestre.transform.childCount; ++y)
                objetoMestre.transform.GetChild(y).gameObject.SetActive(false);
       
        
            if (ativar_desativarCollider != null){
                for(var s = 0; s < ativar_desativarCollider.transform.childCount; ++s)
                    ativar_desativarCollider.transform.GetChild(s).GetComponent(BoxCollider).enabled = true;
            }
    
        }
    }