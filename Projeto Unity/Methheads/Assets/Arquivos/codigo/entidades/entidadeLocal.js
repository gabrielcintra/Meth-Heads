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

	//----------------------------------------
	
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
		sistemasAutomaticos();
	}
		
	function novoJogo()
	{
		// longListas compoe: 
		// methProduzida - dinheiroLimpo - dinheiroSujo, 
		// estresse  - estresse padrao p/s    
		// producao p/clique - preco p/unidade  
		// naoh - hcl - h2so4 - metilamina
		// quantos % a barra cresce a cada 100 ms
		
		longListas = [0.0, 0.0, 0.0, 
		              0.0, 0.1, 
		              1.5, 25.0, 
		              100.0, 100.0, 100.0, 100.0,
		              1.0];
		              
		funcListas = [dealers, cookers, pureza, laboratorios, transportes, 
		              empresas];
	}

	function sistemasAutomaticos()
	{
		producaoAutomatica();
		atualizarEstresse();
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
			
			if (GameObject.Find("contadorInstantaneoMeth") != null) {
				contadorMeth = GameObject.Find("contadorInstantaneoMeth").GetComponent(contadorInstantaneo);
				contadorMeth.contar(producao);
			}
		}

		Invoke("producaoAutomatica", 1);
	}

	function atualizarEstresse()
	{
		atualizarEstresse(getValor("estressePadrao"));
		if (GameObject.Find("musicaRadio") != null)
			if (GameObject.Find("musicaRadio").GetComponent(AudioSource).isPlaying)
				atualizarValor("estresse", -0.03);
	}

	function atualizarEstresse(quantidade : float)
	{
		atualizarValor("estresse", quantidade);

		CancelInvoke("atualizarEstresse");
		Invoke("atualizarEstresse", 1);
	}

	function atualizarValor(tipo : String, valor : float) 
	{
		for (var i=0; i < longNomes.length; i++) {
			if (tipo == longNomes[i]) {
				
				longListas[i] += valor;
				longListas[i] = parseFloat(longListas[i].ToString("F2")); 

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
	
	function organizarValor(valor : long)
    {
        var sufixos = [" k", " mi", " bi", " tri"];
        var aux  = valor.ToString("F2");
        var auxInteiro = aux.Split("."[0])[0];

        if (auxInteiro.length < 4)
        	return aux;

        var i = 4;
        var j = 6;
        var sufixo = 0;
       	var auxString = "";

        while (true) {

        	if (auxInteiro.length >= i && auxInteiro.length <= j) {

        		var localPonto = auxInteiro.length - i + 1;
        		for (var k = 0; k < auxInteiro.length; k++) {
        			if (k == localPonto)
        				auxString += ".";
        			if (k >= localPonto+2) 
        				break;

        			auxString += auxInteiro[k];
        		}

        		break;

        	} else {
        		i += 3; 
        		j += 3;
        		sufixo++;
        	}
        }

        return auxString + sufixos[sufixo];
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

	function getMosca()
	{
		var mosca = GameObject.Find("Mosca");
		
		if (mosca != null)
			return true;

		return false;
	}

}