#pragma strict

class entidadeLocal extends MonoBehaviour {

	var methProduzida : long;
	var dinheiroLimpo : long;
	var dinheiroSujo : long;
	
	var precoUnidade : long; // preco da unidade de meth
	var ingredientes : float[]; // quantidade de ingredientes
	var nomeIngredientes : String[];
	
	var dealers = new Array();
	var cookers = new Array();
	var pureza = new Array();
	var laboratorios = new Array();
	var transportes = new Array();
	var empresas = new Array();
	
	var laboratorio : objetoLab;
	
	var tipos : String[];
	var tiposListas : Array[];
	
	function Start()
	{
		nomeIngredientes = ["naoh", "hcl", "h2so4", "metilamina"];
		tipos = ["dealer", "cooker", "pureza", "transporte", "laboratorio", "empresa"];
		tiposListas = [dealers, cookers, pureza, laboratorios, transportes, empresas];
	}
	
	function atualizarMeth(valor : float)
	{
		methProduzida += valor;
	}
	
	function atualizarIngrediente(nome : String, valor : float)
	{
		for (var i=0; i < nomeIngredientes.length; i++)
			if (nome == nomeIngredientes[i])
				ingredientes[i] += valor;
	}
	
	function atualizarDinheiro(tipo : String,  valor : float) 
	{
		if (tipo == "limpo") 
			dinheiroLimpo += valor;
		if (tipo == "sujo")
			dinheiroSujo += valor;
			
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
			if (dinheiroLimpo - valor >= 0)
				return true;
		
		if (tipo == "sujo")
			if (dinheiroSujo - valor >= 0)
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
	
	function organizarValor(valor : long) 
    {
        var tamanho = valor.ToString().length;
        var valorString = "";
        var valores = ["", "k", "m", "bi", "tri"];

        if (tamanho >= 4) {
            for (var i = 0; i < 3; i++) {
                if (i == 1)
                    valorString += ".";
			
                valorString += valor.ToString()[i];
            }
			
            var index = 0;
            for (var j = 4; j < 15; j=j+3) {
                var diferenca = tamanho - j;
                if (diferenca >= 0)
                    index++;
            }
		
            valorString += valores[index];

        } else valorString += valor.ToString();
	
       
        return valorString;
    }
   
    function getValor(tipo : String)
	{
		if (tipo == "limpo")
			return dinheiroLimpo;
		if (tipo == "sujo")
			return dinheiroSujo;
		
		return methProduzida;
	}
	
	function getIngrediente(nome : String)
	{
		for (var i=0; i < nomeIngredientes.length; i++)
			if (nome == nomeIngredientes[i])
				return ingredientes[i];
				
		return -1;	
	}
	
	function getPrecoUnidade()
	{
		return precoUnidade;
	}
}