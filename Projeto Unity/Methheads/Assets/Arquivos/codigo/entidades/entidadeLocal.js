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
	
	var laboratorio : objetoLab;
	
	var tipos : String[];
	var tiposListas : Array[];
	
	function Start()
	{
		tipos = ["dealer", "cooker", "pureza", "transporte", "laboratorio"];
		tiposListas = [dealers, cookers, pureza, laboratorios, transportes];
	}
	
	function Update()
	{
		Start();
	}
	
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
	
	function getDinheiro(tipo : String)
	{
		if (tipo == "limpo")
			return dinheiroLimpo;
		
		return dinheiroSujo;
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
	
	function temDinheiro(tipo : String)
	{
		if (tipo == "limpo")
			if (dinheiroLimpo > 0)
				return true;
		
		if (tipo == "sujo")
			if (dinheiroSujo > 0)
				return true;
		
		return false;
	}

	function novoLaboratorio(lab : objetoLab) 
	{ 
		laboratorio = lab; 
	}
	
	function adicionar(objeto : Objeto) 
	{	
		for (var i = 0; i < tipos.length; i++)
			if (objeto.getTipo() == tipos[i]) {
				tiposListas[i].Add(objeto);
				return true;
			}
				
		return false;
	}
	
	function remover(objeto : Objeto) 
	{	
		var i : int;
		for (i = 0; i < tipos.length; i++)
			if (objeto.getTipo() == tipos[i])
				break;
			
		var aux : Objeto;	
		for (var j = 0; j < tiposListas[i].length; j++) {
			aux = tiposListas[i][j];
			if (aux.getNome() == objeto.getNome()) {
				tiposListas[i].RemoveAt(j);
				return true;
			}
				
		}
			
		return false;
	}
}