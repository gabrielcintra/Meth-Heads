#pragma strict

class botaoVender extends MonoBehaviour {

	var entidade : entidadeLocal;
	var frames : Sprite[];
	
	var contador : contadorInstantaneo;
	var barraQuantidade : GameObject;
	var caixa : GameObject;
	var posCaixa : int; // posicao inicial da caixa de venda
	
	var porcentagemBarra : float; // quanto a barra esta cheia
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
	}
	
	function iniciarVenda()
	{
		entregando = true;
		transportar();
	}
	
	function transportar() 
	{
			emTransporte = true;
			
			if (entregando) { // caixa indo para a venda
	        	
	        	caixa.transform.position.x += 0.01;
	        	
	        	if (caixa.transform.position.x > 10) {
	        		vender();
	        		return;
	        	}
	        
	        } else { // caixa voltando
	        	
	        	caixa.transform.position.x -= 0.01; // retorna para a posicao
	        	
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
		porcentagemBarra += entidade.getValor("velocidadeVenda"); // em quanto a barra vai crescer por milisegundo
		porcentagemBarra -= entidade.getValor("meth") * 0.01; // 1% do peso da meth produzida afeta o transporte
		
		if (porcentagemBarra <= 0.0)
			porcentagemBarra = 0.1;
			
		if (porcentagemBarra >= 100) {
		
			entregando = false;
			Invoke("transportar", 1);
			porcentagemBarra = 0.0;
			
		} else 
			Invoke("vender", 0.1);
		
		barraQuantidade.GetComponent(Image).fillAmount = porcentagemBarra * 0.01;
	}
	
	function concluirVenda()
	{
		caixa.transform.position.x = posCaixa; // retorna a posicao inicial da caixa
		
		var valor : float;
		valor = entidade.getValor("meth") * entidade.getValor("precoUnidade");
	
		entidade.atualizarValor("sujo", valor);
		entidade.atualizarValor("meth", entidade.getValor("meth") * -1);
		
		contador.contar(valor);
	}
	
	function OnMouseDown() 
	{
		if (entidade.getValor("meth") > 0 && !emTransporte) 
		{
			entregando = true;
			transportar();
			
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