#pragma strict

class barraEstresse extends MonoBehaviour {

	var entidade : entidadeLocal;
	var barraQuantidade : GameObject;

	function Start()
	{
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		barraQuantidade = GameObject.Find("barraEstresse");
	}

	function Update ()
	{
		barraQuantidade.GetComponent(Image).fillAmount = entidade.getValor("estresse") * 0.01;
	}
}