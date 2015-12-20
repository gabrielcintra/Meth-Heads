#pragma strict

class botaoVender extends MonoBehaviour {

	var entidade : entidadeLocal;
	var frames : Sprite[];
	
	var contador : contadorInstantaneo;
	var barraQuantidade : GameObject;
	
	var porcentagemBarra : float; // quanto a barra esta cheia
	var produzindo : boolean;

	function Start() 
	{ 
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		contador = GameObject.Find("contadorInstantaneoSell").GetComponent(contadorInstantaneo);
	
		GetComponent(Animator).enabled = false;
		produzindo = false;
		
		barraQuantidade.GetComponent(Image).fillAmount = porcentagemBarra * 0.01;
	}
	
	function vender()
	{
		produzindo = true;
	
		porcentagemBarra += entidade.getValor("velocidadeVenda"); // em quanto a barra vai crescer por milisegundo
		porcentagemBarra -= entidade.getValor("meth") * 0.01; // 1% do peso da meth produzida afeta o transporte
		
		if (porcentagemBarra <= 0.0)
			porcentagemBarra = 0.1;
		
		if (porcentagemBarra >= 100) {
			concluirVenda();
			porcentagemBarra = 0.0;
		} else 
			Invoke("vender", 0.1);
		
		barraQuantidade.GetComponent(Image).fillAmount = porcentagemBarra * 0.01;
	}
	
	function concluirVenda()
	{
		produzindo = false;
		
		var valor : float;
		valor = entidade.getValor("meth") * entidade.getValor("precoUnidade");
	
		entidade.atualizarValor("sujo", valor);
		entidade.atualizarValor("meth", entidade.getValor("meth") * -1);
		
		contador.contar(valor);
	}
	
	function OnMouseDown() 
	{
		if (entidade.getValor("meth") > 0 && !produzindo) 
		{
			vender();
			GetComponent(Image).sprite = frames[1];
			GetComponent(Animator).enabled = false;
		}
	}
	
	function OnMouseEnter() 
	{
		if (!produzindo) {
			if (entidade.getValor("meth") >= entidade.getValor("producaoUnidade")) {
				GetComponent(Animator).enabled = true;
				GetComponent(Image).sprite = frames[2]; // caixa cheia
			} else {
				GetComponent(Animator).enabled = false;
				GetComponent(Image).sprite = frames[1];
			}
		}
	}

	function OnMouseExit() 
	{
		GetComponent(Image).sprite = frames[0];
		GetComponent(Animator).enabled = false;
	}

}