#pragma strict

class contadorInstantaneo extends MonoBehaviour {

	private var velocidade = 0.01;
	private var posInicial : float;
	private var canvas : CanvasGroup;
	
	var entidade : entidadeLocal;
	var transforms : Transform;

	function Start () 
	{
	    canvas = gameObject.GetComponent(CanvasGroup);
		posInicial = gameObject.transform.position.y;
		   
	    canvas.alpha = 0;
	}

	function contar(valor : float) 
	{
	    gameObject.transform.position.y = posInicial;
	    gameObject.GetComponent(Text).text = "+" + entidade.organizarValor(valor);
	    gameObject.GetComponent(CanvasGroup).alpha = 1;
	    
	    subir_apagar();
	}

	function subir_apagar() 
	{
	        CancelInvoke("subir_apagar");
	        this.gameObject.transform.position.y += velocidade;
	        canvas.alpha -= velocidade;
	        
	        Invoke("subir_apagar",0);
	}

}