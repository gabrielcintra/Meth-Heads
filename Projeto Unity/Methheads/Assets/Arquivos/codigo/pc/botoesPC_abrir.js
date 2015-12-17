class botoesPC_abrir extends botoesPC{
    
    
    function OnMouseDown(){
    
        Cursor.SetCursor(cursorManager.texturaCursorAbrindo,cursorManager.hotSpot,cursorManager.modoCursor);
 
        if (imagem_barratarefas != null){
            GameObject.Find("barradetarefas").GetComponent(CanvasGroup).alpha = 1;
            GameObject.Find("barradetarefas").GetComponent(Image).sprite = imagem_barratarefas;
        }
        
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
}