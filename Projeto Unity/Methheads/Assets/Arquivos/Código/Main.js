#pragma strict

class Main extends MonoBehaviour {
	
	private var methProduzida : float;
	
	function Start() {
	}
	
	function Update(){
	}
	
	function produzir() {
		methProduzida++;
		print (methProduzida);
	}
	
	function produzirAutomaticamente() {
	}
	
	function setMethProduzida(methProduzida : float) {
		this.methProduzida = methProduzida;
	}
	
}
