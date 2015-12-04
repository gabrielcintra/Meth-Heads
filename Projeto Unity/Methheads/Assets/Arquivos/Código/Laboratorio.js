#pragma strict

class Laboratorio extends MonoBehaviour {

	private var imagemFundo : Sprite;
	private var methProduzida : float;
	private var dinheiroSujo : float;
	private var dinheiroLimpo : float;
	private var botaoProduzir : GameObject;
	private var botaoShop : GameObject;

	function Laboratorio() {
		botaoProduzir = GameObject.Find("botaoProduzir");
		botaoShop = GameObject.Find("botaoShop");
	}
	
	function Laboratorio(methProduzida : float, 
						 dinheiroSujo: float, 
						 dinheiroLimpo: float) {
						
		this.methProduzida = methProduzida;
		this.dinheiroSujo = dinheiroSujo;
		this.dinheiroLimpo = dinheiroLimpo;
	}

}