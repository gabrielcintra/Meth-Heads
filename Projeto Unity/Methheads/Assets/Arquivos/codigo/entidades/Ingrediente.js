#pragma strict

class Ingrediente extends MonoBehaviour {
	
	var precoUnidade : float; // valor da unidade
	var custoProducao : float; // quanto eh consumido por clique
	var quantidadeAtual : float; // quantidade que tem disponivel
	var quantidadeTotal : float; // capacidade total

	var barraQuantidade : GameObject;
	var botaoComprar : GameObject;
	
	var balaoFalas : balaoFala;
	
	var dinheiroLimpo : textoMain;
	var dinheiroSujo : textoMain;
	
	function Start()
	{
		barraQuantidade.SetActive(false);
		botaoComprar.SetActive(false);
		
		balaoFalas = GameObject.Find("balaoFala").GetComponent(balaoFala);
	}
	
	function setValor(precoUnidade : float)
	{
		this.precoUnidade = precoUnidade;
	}
	
	function reabastecer() 
	{
		reabastecer(quantidadeTotal - quantidadeAtual);
	}
	
	function reabastecer(quantidade : float) 
	{
		var dinheiroLimpo = this.dinheiroLimpo.getValor();
		var dinheiroSujo = this.dinheiroSujo.getValor();
		var preco = precoUnidade * quantidade;

		if (quantidade > 5) {
			
			if (preco <= dinheiroSujo) {
				this.dinheiroSujo.setValor(dinheiroSujo - preco);
				quantidadeAtual += quantidade;
			} else {
				if (preco <= dinheiroLimpo) {
					this.dinheiroLimpo.setValor(dinheiroLimpo - preco);	
					quantidadeAtual += quantidade;
				} else {
					if (preco <= dinheiroLimpo + dinheiroSujo) {
						var diferenca = dinheiroLimpo - dinheiroSujo;
						this.dinheiroSujo.setValor(0);
						this.dinheiroLimpo.setValor(dinheiroLimpo - diferenca);
						quantidadeAtual += quantidade;
					} else balaoFalas.falar(1); // fala que falta dinheiro
				}
			}
		}
		
		atualizarBarra();
	}
	
	// remove o custo de producao padrao
	function remover()
	{
		remover(custoProducao);
	}
	
	// remove "quantidade" do ingrediente
	function remover(quantidade : float)
	{
		if (quantidade < 0)
			quantidade = 0;
	
		quantidadeAtual = quantidadeAtual - quantidade;
		if (quantidadeAtual <= 0)
			quantidadeAtual = 0;
	}
	
	function getQuantidade()
	{
		return quantidadeAtual;
	}
	
	function atualizarBarra()
	{
		barraQuantidade.GetComponent(Image).fillAmount = quantidadeAtual * 0.01;	
	}
	
	function OnMouseEnter()
	{
		barraQuantidade.SetActive(true);
		botaoComprar.SetActive(true);
		
		atualizarBarra();
	}
	
	function OnMouseExit()
	{
		barraQuantidade.SetActive(false);
		botaoComprar.SetActive(false);
	}
}