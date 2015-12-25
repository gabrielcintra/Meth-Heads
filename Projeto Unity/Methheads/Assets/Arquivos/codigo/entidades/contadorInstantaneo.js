#pragma strict

class contadorInstantaneo extends MonoBehaviour {

	private var velocidade = 0.01;
	private var posInicial : float;
	private var canvas : CanvasGroup;
	
	var entidade : entidadeLocal;
	var contadorOriginal : GameObject;
    var Canvas : Transform;

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
	    
	    subir();
	}

	function subir() 
	{
	        CancelInvoke("subir");
	        this.transform.position.y += velocidade;
	        canvas.alpha -= velocidade;
	    	
	    	if (canvas.alpha > 0)
	        	Invoke("subir", 0);
	}

	function criarObjeto(valor : float){
	    var copiaContador : GameObject = new GameObject("contadorCopia");
	    copiaContador.AddComponent(Text);
	    copiaContador.AddComponent(CanvasGroup);
	    copiaContador.AddComponent(contadorInstantaneo);
	    copiaContador.GetComponent(contadorInstantaneo).Canvas = GameObject.Find("Canvas").GetComponent(Transform);
	    copiaContador.transform.SetParent(Canvas);
	    copiaContador.transform.position = contadorOriginal.transform.position;
	    copiaContador.GetComponent(Text).text = ""+valor;
	    copiaContador.GetComponent(Text).font = gameObject.GetComponent(Text).font;
	    copiaContador.GetComponent(contadorInstantaneo).entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
	    copiaContador.GetComponent(contadorInstantaneo).contadorOriginal = this.gameObject;
	    subir();
	}

}