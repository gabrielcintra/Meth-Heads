#pragma strict

class botaoProduzir extends MonoBehaviour {

	var entidade : entidadeLocal;

	var frames : Sprite[]; // 0 - normal / 1 - destacado
	var ingredientes : GameObject[];
	
	var balaoFalas : balaoFala;
	var contador : contadorInstantaneo;
	
	function Start()
	{
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		contador = GameObject.Find("contadorInstantaneoMeth").GetComponent(contadorInstantaneo);
	}

	function OnMouseEnter()
	{
		GetComponent(Image).sprite = frames[1];
	}
	
	function OnMouseExit()
	{
		GetComponent(Image).sprite = frames[0];
	}
	
	function OnMouseDown()
	{
		produzir();
	}	

	function produzir()
	{
		for each (ingrediente in ingredientes) {
			if (ingrediente.GetComponent(Ingrediente).getQuantidade() <= 0) { // se nao tem ingredientes:
				balaoFalas.falar(0); // 0 indica que nao possui ingredientes
				return;
			}
		}
				
		for each (ingrediente in ingredientes)
			ingrediente.GetComponent(Ingrediente).remover();
		
		var producao = entidade.getValor("producaoUnidade");
		producao -= entidade.getValor("estresse") * 0.01;

		entidade.atualizarValor("meth", producao);
		contador.contar(producao);
	}

}

