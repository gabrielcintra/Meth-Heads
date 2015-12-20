#pragma strict

class Ingrediente extends MonoBehaviour {
	
	var entidade : entidadeLocal;
	
	var nome : String;
	var precoUnidade : float; // valor da unidade
	var custoProducao : float; // quanto eh consumido por clique
	var quantidadeAtual : float; // quantidade que tem disponivel
	var quantidadeTotal : float; // capacidade total

	var barraQuantidade : GameObject;
	var botaoComprar : GameObject;
	
	var balaoFalas : balaoFala;
	
	function Start()
	{
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		balaoFalas = GameObject.Find("balaoFala").GetComponent(balaoFala);
		
		barraQuantidade.SetActive(false);
		botaoComprar.SetActive(false);
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
		var dinheiroLimpo = entidade.getValor("limpo");
		var dinheiroSujo = entidade.getValor("sujo");
		var preco = precoUnidade * quantidade;

		if (quantidade > 5) {
			
			if (preco <= dinheiroSujo) { // checa se ele tem dinheiro sujo pra pagar
				entidade.atualizarValor("sujo", preco * -1);
				entidade.atualizarValor(nome, quantidade);
			} else {
				if (preco <= dinheiroLimpo) { // checa se ele tem dinheiro limpo pra pagar
					entidade.atualizarValor("limpo", preco * -1);
					entidade.atualizarValor(nome, quantidade);
				} else {
					if (preco <= dinheiroLimpo + dinheiroSujo) { // checa se somando os dois tipos de dinheiro ele pode pagar
						var diferenca = entidade.getValor("limpo") - entidade.getValor("sujo");
						
						entidade.atualizarValor("sujo", entidade.getValor("sujo") * -1);
						entidade.atualizarValor("limpo", entidade.getValor("limpo") - diferenca);
						
						quantidadeAtual += quantidade;
					} else // se nao, ele nao tem dinheiro
						balaoFalas.falar(1); // fala que falta dinheiro
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
	
		entidade.atualizarValor(nome, quantidade * -1);
		
		if (entidade.getValor(nome) <= 0)
			entidade.atualizarValor(nome, 0);
			
		atualizarBarra();
	}
	
	function getQuantidade()
	{
		return quantidadeAtual;
	}
	
	function atualizarBarra()
	{
		quantidadeAtual = entidade.getValor(nome);
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