#pragma strict

import UnityEngine.UI;

class Main extends MonoBehaviour {
	
	private var metanfetamina : long;
	private var dinheiroSujo : long;
	private var dinheiroLimpo : long;

    
    private var caixaSell : GameObject;
    private var barraSell : GameObject;
    private var barraSellUnmask : GameObject;
    private var vendeu : boolean;

	private var textoMetanfetamina : Text;
	private var textoSujo : Text;
	private var textoLimpo : Text;
	
	function Start() 
	{
		textoMetanfetamina = GameObject.Find("contadorMeth").GetComponent(Text);
		textoSujo = GameObject.Find("contadorDinheiroSujo").GetComponent(Text);
		textoLimpo = GameObject.Find("contadorDinheiroLimpo").GetComponent(Text);
       
		caixaSell = GameObject.Find("CaixaSell");
		barraSell = GameObject.Find("barraSell");
		barraSellUnmask = GameObject.Find("barraSellUnmasked");

		barraSell.SetActive(false);
	}
	
	function Update()
	{
		textoMetanfetamina.text = organizarValor(metanfetamina) + " lb";
		textoSujo.text = "$ " + organizarValor(dinheiroSujo);
		textoLimpo.text = "$ " + organizarValor(dinheiroLimpo);

		carregarBarraSell();
	}
	

	
	// produz metanfetamina
	function produzirMeth() 
	{
	    metanfetamina += 1;
	}
	
	    
        // ativa a função carregarBarraSell através de um boolean
	function venderMeth()
	{
	    if (metanfetamina > 0){
	        vendeu = true;
	    }
	}
	 
     // carrega a barra e realiza a venda da metanfetamina
	function carregarBarraSell(){
	    if (vendeu){
	        barraSell.SetActive(true);
	        caixaSell.SetActive(false);

	        barraSellUnmask.transform.position.y += 0.01; //velocidadeTransporte
            
	        if (barraSellUnmask.transform.position.y > -3.2){
	            
	            vendeu = false;
	            
	            dinheiroSujo += metanfetamina;
	            metanfetamina = 0;
	            
	            barraSellUnmask.transform.position.y = -5.5;
	            
	            barraSell.SetActive(false);
	            caixaSell.SetActive(true);
	        }
                
	    }


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

}
