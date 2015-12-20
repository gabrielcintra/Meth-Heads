#pragma strict
#pragma downcast

class entidadeLocal extends MonoBehaviour {

	var laboratorio : objetoLab;
	
	//------------ Funcionarios ---------------
	
	var dealers = new Array();
	var cookers = new Array();
	var pureza = new Array();
	var laboratorios = new Array();
	var transportes = new Array();
	var empresas = new Array();
	
	//----------- Listas ----------------
	
	var funcNomes : String[]; // nomes dos funcionarios
	var funcListas : Array[]; // listas dos funcionarios
	var longNomes : String[]; // nome dos valores long type
	var longListas : float[]; // listas que compoem os valores
	
	//-----------------------------------------
	
	function Start()
	{
		longNomes = ["meth", "limpo", "sujo", 
		             "estresse", "estressePadrao", 
		             "producaoUnidade", "precoUnidade", 
		             "naoh", "hcl", "h2so4", "metilamina",
		             "velocidadeVenda"];
		
		funcNomes = ["dealer", "cooker", "pureza", "transporte", 
		             "laboratorio", "empresa"];
	
		//carregarJogo()
		novoJogo();
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
		              1.5, 40.0, 
		              100.0, 100.0, 100.0, 100.0,
		              1.0];
		              
		funcListas = [dealers, cookers, pureza, laboratorios, transportes, 
		              empresas];
	}

	function atualizarValor(tipo : String,  valor : float) 
	{
		for (var i=0; i < longNomes.length; i++) {
			if (tipo == longNomes[i]) {
				
				longListas[i] += valor;
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

	function novoLaboratorio(lab : objetoLab) 
	{ 
		laboratorio = lab; 
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
        var tamanho = 0;
        var valorString = "";
        var valores = ["", "k", "m", "bi", "tri"];
        
        for each (letra in valor.ToString("F2"))
			if (letra != ".")
				tamanho += 1;

        if (tamanho >= 5) {
            for (var i = 0; i < 3; i++) {
                if (i == 1)
                    valorString += ".";
			
                valorString += valor.ToString("F2")[i];
            }
			
            var index = 0;
            for (var j = 4; j < 15; j=j+3) {
                var diferenca = tamanho - j;
                if (diferenca >= 0)
                    index++;
            }
		
            valorString += valores[index];

        } else valorString += valor.ToString("F2");

        return valorString;
    }
   
    function getValor(tipo : String)
	{
		for (var i=0; i < longNomes.length; i++)
			if (tipo == longNomes[i])
				return longListas[i];
				
		return -1;
	}
	
}