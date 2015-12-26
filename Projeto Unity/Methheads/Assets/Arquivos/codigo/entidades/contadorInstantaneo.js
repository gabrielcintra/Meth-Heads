#pragma strict

class contadorInstantaneo extends MonoBehaviour {

    private var velocidade = 0.01;
	private var posInicial : float;
	private var canvas : CanvasGroup;

    var transacaoCompleta : Sprite;
    var transacaoFalhou : Sprite;
	
	var entidade : entidadeLocal;


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

	function contarTransacao(situacao : String){

	    if (situacao == "complete")
	        this.transform.GetChild(1).GetComponent(Image).sprite = transacaoCompleta;
	    if (situacao == "failed")
	        this.transform.GetChild(1).GetComponent(Image).sprite = transacaoFalhou;

	    gameObject.transform.position.y = posInicial;
	    gameObject.GetComponentInChildren(Text).text = "Transiction \n" + situacao;
	    gameObject.GetComponent(CanvasGroup).alpha = 1;
	    
	    descer();
	}

	function subir() 
	{
	    CancelInvoke("subir");
        this.transform.position.y += velocidade;
        canvas.alpha -= velocidade;
	    	
	    	if (canvas.alpha > 0)
	        	Invoke("subir", 0);
	}

	function descer() 
	{
	    CancelInvoke("descer");
	    this.transform.position.y -= 0.01;
	    canvas.alpha -= 0.004;
	    	
	    if (canvas.alpha > 0)
	        Invoke("descer", 0);
	}
}