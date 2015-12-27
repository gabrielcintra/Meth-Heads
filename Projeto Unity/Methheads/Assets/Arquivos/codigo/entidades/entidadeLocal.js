#pragma strict
#pragma downcast

class entidadeLocal extends MonoBehaviour {

	var ambiente : String;
	
	//------------ Funcionarios ---------------
	
	var dealers = new Array();
	var cookers = new Array();
	var providers = new Array();

	var pureza = new Array();
	var laboratorios = new Array();
	var transportes = new Array();
	var empresas = new Array();
	
	//----------- Listas ----------------
	
	var funcNomes : String[]; // nomes dos funcionarios
	var funcListas : Array[]; // listas dos funcionarios
	var longNomes : String[]; // nome dos valores que tem numeros (meth, dinheiro, etc)
	var longListas : float[]; // listas que compoem os valores
	
	//-----------------------------------------
	
	var contadorMeth : contadorInstantaneo;
	
	function Start()
	{
		longNomes = ["meth", "limpo", "sujo", 
		             "estresse", "estressePadrao", 
		             "producaoUnidade", "precoUnidade", 
		             "naoh", "hcl", "h2so4", "C10H15N",
		             "velocidadeVenda"];
		
		funcNomes = ["dealer", "cooker", "provider", "pureza", "transporte", 
		             "laboratorio", "empresa"];
		             
		if (ambiente != "pc" && ambiente != "quarto")
			contadorMeth = GameObject.Find("contadorInstantaneoMeth").GetComponent(contadorInstantaneo);
	
		//carregarJogo()
		novoJogo();
		producaoAutomatica();
	}
		
	function novoJogo()
	{
		// longListas compoe: 
		// methProduzida - dinheiroLimpo - dinheiroSujo, 
		// estresse  - estresse p/s    
		// producao p/clique - preco p/unidade  
		// naoh - hcl - h2so4 - metilamina
		// quantos % a barra cresce a cada 100 ms
		
		longListas = [0.0, 0.0, 0.0, 
		              0.0, 0.1, 
		              1.5, 5.0, 
		              100.0, 100.0, 100.0, 100.0,
		              1.0];
		              
		funcListas = [dealers, cookers, pureza, laboratorios, transportes, 
		              empresas];
	}
	
	function producaoAutomatica()
	{
		var producao = 0.0;
		var cooker : objetoCooker;
		
		for each (cookerContratado in getFunc("cooker")) {
			cooker = cookerContratado;
			producao += cooker.getAtributo();
		}
			
		if (producao > 0.0) {
			atualizarValor("meth", producao);
			
			if (contadorMeth != null)
				contadorMeth.contar(producao);
		}

		Invoke("producaoAutomatica", 1);
	}

	function atualizarValor(tipo : String,  valor : float) 
	{
		for (var i=0; i < longNomes.length; i++) {
			if (tipo == longNomes[i]) {
				
				longListas[i] += valor;
				longListas[i] = corrigirValor(longListas[i]); // arredonda para duas casas decimais

				if (tipo == "limpo" || tipo == "sujo" || tipo == "meth")
					longListas[i] = checaNegativo(longListas[i]);
				
				break;
			}
		}
	}

	function checaNegativo(valor : float)
	{
		if (valor < 0)
			return 0;
			
		return valor;
	}
	
	function temValor(tipo : String)
	{
		temValor(tipo, 0.0);
	}
	
	function temValor(tipo : String, valor : float)
	{
		for (var i=0; i < longNomes.length; i++)
			if (longNomes[i] == tipo)
				if (longListas[i] - valor >= 0)
					return true;

		return false;
	}

	function mudarAmbiente(ambiente : String) 
	{ 
		this.ambiente = ambiente;
	}
	
	function adicionar(objeto : Objeto) 
	{	
		for (var i = 0; i < funcNomes.length; i++)
			if (objeto.getTipo() == funcNomes[i]) {
				funcListas[i].Add(objeto);
				return true;
			}
				
		return false;
	}
	
	function remover(objeto : Objeto) 
	{	
		var i : int;
		for (i = 0; i < funcNomes.length; i++)
			if (objeto.getTipo() == funcNomes[i])
				break;
			
		var aux : Objeto;	
		for (var j = 0; j < funcListas[i].length; j++) {
			aux = funcListas[i][j];
			if (aux.getNome() == objeto.getNome()) {
				funcListas[i].RemoveAt(j);
				return true;
			}
				
		}
			
		return false;
	}
	
	function organizarValor(valor : float)
	{
	    var sufixos = ["", "k", "m", "bi", "tri"];
	    var valorString = "";
	    var sufixo = 0;
	    var tamanho = 0;

	    valor = corrigirValor(valor);

	    for (var i = valor.ToString().length-1; i >= 0; i++) {

	        if (valorString.length == 6)
	            valorString = "" + valorString[0];

	        if (valorString.length == 2)
	            valorString = "." + valorString;

	        if (tamanho % 4 == 0)
	            sufixo++;

	        if (valor.ToString()[i] != ".") {
	            tamanho++;
	            valorString += valor.ToString()[i];
	        }
	    }

	    if (valorString[0] == ".")
	        valorString[0] = "";

	    return valorString + sufixos[sufixo];
	}

    // arredonda para duas casas decimais
    function corrigirValor(valor : float)
    {
    	var valorCorreto = Mathf.Round(valor * 100.0) / 100.0;
    	return valorCorreto;
    }
   
    function getValor(tipo : String)
	{
		for (var i=0; i < longNomes.length; i++)
			if (tipo == longNomes[i])
				return longListas[i];
				
		return -1;
	}
	
	function getFunc(tipo : String)
	{
		for (var i=0; i < funcNomes.length; i++)
			if (tipo == funcNomes[i])
				return funcListas[i];
				
		return new Array();
	}

	function getFuncTamanho(tipo : String)
	{
		return getFunc(tipo).length;
	}
	
}