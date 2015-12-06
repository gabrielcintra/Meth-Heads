#pragma strict

class Botao extends MonoBehaviour {

	var valor : long;
	var nome : String;
	var textoValor : Text;

	function Start () 
	{
		textoValor = GameObject.Find(nome).GetComponent(Text);
	}

	function Update () 
	{
		atualizarValor();
	}
	
	function setValor(valor : long) {
		this.valor = valor;
	}

	function getValor()
	{
		return Main.organizarValor(valor);
	}
	
	function getValorLong()
	{
		return valor;
	}

	function atualizarValor() {}

}