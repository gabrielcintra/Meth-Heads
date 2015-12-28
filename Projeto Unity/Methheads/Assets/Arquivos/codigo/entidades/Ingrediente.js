#pragma strict

class Ingrediente extends MonoBehaviour {
	
	var entidade : entidadeLocal;
	
	var nome : String;
    var nomeCientifico : String;

	var precoUnidade : float; // valor da unidade
	var custoProducao : float; // quanto eh consumido por clique
	var quantidadeAtual : float; // quantidade que tem disponivel
	var quantidadeTotal : float; // capacidade total

	var barraQuantidade : GameObject;
	var info : GameObject;
	
	var balaoFalas : balaoFala;
	
	function Start()
	{
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		balaoFalas = GameObject.Find("balaoFala").GetComponent(balaoFala);
		
		info.GetComponent(CanvasGroup).alpha = 0;
	}
	
	function setValor(precoUnidade : float)
	{
		this.precoUnidade = precoUnidade;
	}
	
	function remover()
	{
		remover(custoProducao);
	}
	
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

	function getPorcentagem(atual : float, total : float)
	{    
	    var porcentagem = (atual/total)*100;
	    if (porcentagem < 0)
	        porcentagem = 0;
	    
	    return porcentagem;
	}
	
	function reconhecerInfo()
	{
	    var objetosInfo = ["formula", "proporcao", "nome", "porcentagem"];
	    var textos = [nome, custoProducao.ToString() + " mol", nomeCientifico, getPorcentagem(quantidadeAtual, entidade.getValor("cap"+nome)) + "%"];

	    for (var i = 0; i < objetosInfo.length; i++)
	        GameObject.Find(objetosInfo[i]).GetComponent(Text).text = textos[i];
	}

	function mostrarInfo()
	{
	    reconhecerInfo();

	    info.GetComponent(CanvasGroup).alpha = 1;
	    
	    info.transform.position.x = this.gameObject.transform.position.x;
	    info.transform.position.y = this.gameObject.transform.position.y + 2;

    }
	
	function OnMouseEnter()
	{
	    mostrarInfo();
		atualizarBarra();
	}
	
	function OnMouseExit()
	{
		info.GetComponent(CanvasGroup).alpha = 0;
	}
}