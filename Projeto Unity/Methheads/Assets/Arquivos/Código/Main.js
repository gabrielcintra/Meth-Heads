#pragma strict

import UnityEngine.UI;

class Main extends MonoBehaviour {
	
	private var metanfetamina : long;
	private var dinheiroSujo : long;
	private var dinheiroLimpo : long;
	
	private var textoMetanfetamina : Text;
	private var textoSujo : Text;
	private var textoLimpo : Text;
	
	function Start() 
	{
		textoMetanfetamina = GameObject.Find("contadorMeth").GetComponent(Text);
		textoSujo = GameObject.Find("contadorDinheiroSujo").GetComponent(Text);
		textoLimpo = GameObject.Find("contadorDinheiroLimpo").GetComponent(Text);
	}
	
	function Update()
	{
		textoMetanfetamina.text = organizarValor(metanfetamina) + " lb";
		textoSujo.text = "$ " + organizarValor(dinheiroSujo);
		textoLimpo.text = "$ " + organizarValor(dinheiroLimpo);
	}
	
	// Adiciona k,m,bi,tri de acordo com a quantidade
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
	
	// produz metanfetamina
	function produzirMeth() 
	{
		metanfetamina += 1;
	}
	
	// vende a quantidade disponivel de metanfetamina
	function venderMeth()
	{
		dinheiroSujo += metanfetamina;
		metanfetamina = 0;
	}
	

}
