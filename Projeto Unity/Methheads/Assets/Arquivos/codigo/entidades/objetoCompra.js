#pragma strict

class objetoCompra extends MonoBehaviour {
	
	var entidade : entidadeLocal;
	var precoFloat : float;
	var tipo : String;
	
	function Start()
	{
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
	}
	
	function comprar()
	{
		if (entidade.temDinheiro("limpo", precoFloat)) {
			entidade.diminuirDinheiro("limpo", precoFloat);
		}
	}
}