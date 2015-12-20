#pragma strict

class barraEstresse extends MonoBehaviour {

	var entidade : entidadeLocal;
	var barraQuantidade : GameObject;
	var limiteEstresse : float[];

	function Start () 
	{
		atualizarEstresse();
	}
	
	function atualizarEstresse()
	{
		atualizarEstresse(entidade.getValor("estressePadrao"));
	}
	
	function atualizarEstresse(quantidade : float)
	{
		entidade.atualizarValor("estresse", quantidade);
		if (entidade.getValor("estresse") >= 100)
			return;

		barraQuantidade.GetComponent(Image).fillAmount = entidade.getValor("estresse") * 0.01;
		Invoke("atualizarEstresse", 1);
	}
}