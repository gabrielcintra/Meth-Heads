#pragma strict

class botoesPC extends MonoBehaviour
{
    var funcao : int; //0 abre barra de tarefas, 1 fecha barra de tarefas

    var ativarObjetos : GameObject[];
    var desativarObjetos : GameObject[];
    
    // var Collider : GameObject;
    var cursorManager : mudarCursor;
    var barraTarefas : Sprite;


    function Start(){
        cursorManager = GameObject.Find("managerPC").GetComponent(mudarCursor);
    }

    function OnMouseEnter(){
        cursorManager.setCursorEmCima();
    }

    function OnMouseExit(){
        cursorManager.setCursorDefault();
    }

    function OnMouseDown(){
        
        switch(funcao){

            case 0:
                ativarDesativar();
                abrirTarefas();
                break;
            
            case 1:
                ativarDesativar();
                fecharTarefas();
                break;
            
            default:
                ativarDesativar();
        }
   
    }

    function abrirTarefas(){
        
        cursorManager.setCursorAbrindo();


        if (barraTarefas != null){
            GameObject.Find("barradetarefas").GetComponent(CanvasGroup).alpha = 1;
            GameObject.Find("barradetarefas").GetComponent(Image).sprite = barraTarefas;
        }
    }

    function fecharTarefas(){
     
        if (barraTarefas != null){
            GameObject.Find("barradetarefas").GetComponent(CanvasGroup).alpha = 0;
            GameObject.Find("barradetarefas").GetComponent(Image).sprite = null;
        }

    }

    function ativarDesativar(){
        
        for(var objetos in ativarObjetos){
            for(var i = 0; i < objetos.transform.childCount; ++i)
                objetos.transform.GetChild(i).gameObject.SetActive(true);}

        for(var Objetos in desativarObjetos){
            for(var l = 0; l < Objetos.transform.childCount; ++l)
                Objetos.transform.GetChild(l).gameObject.SetActive(false);}
    }
}