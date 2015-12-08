#pragma strict

class textoMain extends MonoBehaviour {

	var valor : long;
	
	var prefixo : String;
	var sufixo : String;
	
	var textoValor : Text;

	function Start () 
	{
		textoValor = gameObject.GetComponent(Text);
	}

	function Update () 
	{
		textoValor.text = prefixo + organizarValor(valor) + sufixo;
	}
	
	function getValor() {
		return valor;
	}
	
	function addValor(valor : long, contador : String)
	{
		if (valor < 0)
			valor = 0;
			
		this.valor += valor;

		if (contador != null)
		    GameObject.Find(contador).GetComponent(contadorInstantaneo).contar(valor);
	}
	
	function setValor(valor : long)
	{
		if (valor < 0)
			valor = 0;
	
		this.valor = valor;
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
	
}