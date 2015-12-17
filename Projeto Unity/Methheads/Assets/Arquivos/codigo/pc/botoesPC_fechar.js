class botoesPC_fechar extends botoesPC {
    
    function OnMouseDown(){
        
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