#pragma strict

import UnityEngine.UI;

class Main extends MonoBehaviour {

	function Start() 
	{
	}
			
	function Update()
	{
	}

	// Adiciona k,m,bi,tri de acordo com a quantidade
	static function organizarValor(valor : long) 
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
}
