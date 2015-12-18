#pragma strict

class textoMain extends MonoBehaviour {

	var entidade : entidadeLocal;
	
	var tipo : String;
	var valor : long; // valor que o texto guarda
	var textoValor : Text; // objeto do tipo texto que mostra o valor
	
	var prefixo : String;
	var sufixo : String;

	function Start () 
	{
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		
		textoValor = gameObject.GetComponent(Text);
	}

	function Update () 
	{
		valor = entidade.getValor(tipo);
		textoValor.text = prefixo + entidade.organizarValor(valor) + sufixo;
	}
}