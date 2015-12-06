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
		textoValor.text = prefixo + Main.organizarValor(valor) + sufixo;
	}
	
	function getValor() {
		return valor;
	}
	
	function addValor(valor : long)
	{
		this.valor += valor;
	}
	
	function setValor(valor : long)
	{
		this.valor = valor;
	}
	
}