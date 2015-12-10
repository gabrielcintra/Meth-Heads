#pragma strict

class entidadeLocal extends MonoBehaviour {

	var methProduzida : long;
	var dinheiroLimpo : long;
	var dinheiroSujo : long;
	
	var dealers = new Array();
	var cookers = new Array();

	var pureza = new Array();
	var laboratorios = new Array();
	var transportes = new Array();
	
	var laboratorio : Laboratorio;
	
	function aumentarDinheiro(tipo : String,  quantidade : float) 
	{
		if (quantidade < 0)
			return;
	
		if (tipo == "limpo") 
			dinheiroLimpo += quantidade;
		if (tipo == "sujo")
			dinheiroSujo += quantidade;
	}
	
	function diminuirDinheiro(tipo : String,  quantidade : float) 
	{
		if (tipo == "limpo") 
			dinheiroLimpo -= quantidade;
		if (tipo == "sujo")
			dinheiroSujo -= quantidade;
			
		dinheiroLimpo = checaNegativo(dinheiroLimpo);
		dinheiroSujo = checaNegativo(dinheiroSujo);
	}
	
	function checaNegativo(valor : long)
	{
		if (valor < 0)
			return 0;
			
		return valor;
	}
	
	function temDinheiro(tipo : String, valor : float)
	{
		if (tipo == "limpo")
			if (dinheiroLimpo - valor > 0)
				return true;
		
		if (tipo == "sujo")
			if (dinheiroSujo - valor > 0)
				return true;
		
		return false;
	}
	
	function adicionar(dealer : Dealer) 
	{
		dealers.Add(dealer);
	}
	
	function adicionar(cooker : Cooker) 
	{
		cookers.Add(cooker);
	}
	
	function adicionar(objeto : objetoPureza) 
	{
		pureza.Add(objeto);
	}
	
	function adicionar(laboratorio : Laboratorio) 
	{
		laboratorios.Add(laboratorio);
	}
	
	function adicionar(transporte : objetoTransporte) 
	{
		transportes.Add(transporte);
	}
	
	function adicionarPrincipal(lab : Laboratorio) 
	{
		laboratorio = lab;
	}

}