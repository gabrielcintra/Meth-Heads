#pragma strict

class botoesPC extends MonoBehaviour {

	var tipo : String; // tipos = botaoIcone, botaoFechar, botaoComum

    var ativarElementos : GameObject[];
    var desativarElementos : GameObject[];
    
    var cursor : mudarCursor;
    var barraTarefas : Sprite;

    function Start()
    {
        cursor = GameObject.Find("managerPC").GetComponent(mudarCursor);
    }

    function OnMouseEnter()
    {
        cursor.setCursorEmCima();
    }

    function OnMouseExit()
    {
        cursor.setCursorDefault();
    }

    function OnMouseDown()
    {
    	cursor.setCursorDefault();
    
    	alternarBotao(ativarElementos, true);
    	alternarBotao(desativarElementos, false);
    	
    	alternarTarefas();
    }
    
    // troca o estado atual da lista
    function alternarBotao(lista : GameObject[], estado : boolean)
    {
        for(var Objeto in lista) {
        	Objeto.SetActive(estado);
            for(var i = 0; i < Objeto.transform.childCount; i++)
                Objeto.transform.GetChild(i).gameObject.SetActive(estado);
        }
    }
    
    function alternarTarefas()
    {
    	var alpha : int;
    	var sprite : Sprite;
    
    	if (tipo == "botaoFechar") {
    		alpha = 0;
    		sprite = null;
    	}
    	
    	if (tipo == "botaoIcone")
    	{
    		alpha = 1;
    		sprite = barraTarefas;
    	}
    	
    	if (tipo != "botaoComum")
    	{
    		GameObject.Find("barraTarefas").GetComponent(CanvasGroup).alpha = alpha;
        	GameObject.Find("barraTarefas").GetComponent(Image).sprite = sprite;
    	}
    }
}