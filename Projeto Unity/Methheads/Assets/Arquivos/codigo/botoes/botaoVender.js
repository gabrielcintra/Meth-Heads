#pragma strict

class botaoVender extends MonoBehaviour {

	var entidade : entidadeLocal;
	var frames : Sprite[];
	
	var contador : contadorInstantaneo;
	var barraQuantidade : GameObject;
	var caixa : GameObject;
	
	var posCaixa : int; // posicao inicial da caixa de venda
	
	var porcentagemBarra : float; // quanto a barra esta cheia
	var quantidadeVender : float; // quanto de meth sera vendida
	
	var emTransporte : boolean;
	var entregando : boolean;

	function Start() 
	{ 
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		contador = GameObject.Find("contadorInstantaneoSell").GetComponent(contadorInstantaneo);
		posCaixa = caixa.transform.position.x;

		caixa.GetComponent(Animator).enabled = false;
		emTransporte = false;
		
		barraQuantidade.GetComponent(Image).fillAmount = porcentagemBarra * 0.01;
		barraQuantidade.transform.parent.gameObject.SetActive(false);
	}
	
	function iniciarVenda()
	{
		entregando = true;
		
		quantidadeVender = entidade.getValor("meth");
		entidade.atualizarValor("meth", entidade.getValor("meth") * -1);
		
		transportar();
	}
	
	function transportar() 
	{
			emTransporte = true;
			
			if (entregando) { // caixa indo para a venda
	        	
	        	caixa.transform.position.x += 0.01;
	        	
	        	if (caixa.transform.position.x > 9.0
	        	    && caixa.transform.position.x < 9.05)
	        	    	alternarBarra(); 
	        	
	        	if (caixa.transform.position.x > 13) {
	        		vender();
	        		return;
	        	}
	        
	        } else { // caixa voltando
	        	
	        	caixa.transform.position.x -= 0.01;
	        	
	        	if (caixa.transform.position.x <= posCaixa) {
	        		caixa.transform.position.x = posCaixa;
	        		emTransporte = false;
	        		
	        		concluirVenda();
	        		return;
	        	}
	        } 
	        	
	        caixa.GetComponent(Image).sprite = frames[0]; // caixa fechada
	        Invoke("transportar", 0);
	}
	
	function vender()
	{
		//----------------- Calculo da velocidade de venda ----------
		var velocidade = entidade.getValor("velocidadeVenda");
		velocidade -= quantidadeVender * 0.01;

		if (velocidade <= 0)
			velocidade = 0.05;
		//------------------------------------------------------------

		porcentagemBarra += velocidade;
			
		if (porcentagemBarra >= 100) {
		
			entregando = false;
			porcentagemBarra = 0.0;
			
			alternarBarra();
			Invoke("transportar", 1);

		} else 
			Invoke("vender", 0.1);
		
		barraQuantidade.GetComponent(Image).fillAmount = porcentagemBarra * 0.01;
	}
	
	function concluirVenda()
	{
		barraQuantidade.transform.parent.gameObject.SetActive(false);
	
		entidade.atualizarValor("sujo", quantidadeVender * entidade.getValor("precoUnidade"));
		contador.contar(quantidadeVender);
	}
	
	function alternarBarra()
	{
		if (barraQuantidade.transform.parent.gameObject.activeSelf)
			barraQuantidade.transform.parent.gameObject.SetActive(false);
		else
			barraQuantidade.transform.parent.gameObject.SetActive(true);
	}
	
	function OnMouseDown() 
	{
		if (entidade.getValor("meth") > 0 && !emTransporte) 
		{
			iniciarVenda();
			
			caixa.GetComponent(Image).sprite = frames[1];
			caixa.GetComponent(Animator).enabled = false;
		}
	}
	
	function OnMouseEnter() 
	{
		if (!emTransporte) {
			if (entidade.getValor("meth") >= entidade.getValor("producaoUnidade")) {
				caixa.GetComponent(Animator).enabled = true;
				caixa.GetComponent(Image).sprite = frames[2]; // caixa cheia
			} else {
				caixa.GetComponent(Animator).enabled = false;
				caixa.GetComponent(Image).sprite = frames[1]; // caixa vazia
			}
		}
	}

	function OnMouseExit() 
	{
		caixa.GetComponent(Image).sprite = frames[0]; // caixa fechada
		caixa.GetComponent(Animator).enabled = false;
	}

}