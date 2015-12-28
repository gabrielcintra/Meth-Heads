#pragma strict

var fornecedor : Fornecedor;
var ingrediente : String;
var ferramentas : GameObject[]; /// 1 é o toggle /// 0 é o slider
var preco : float;         
var valorSlider : float;

function Start () {
	fornecedor = GameObject.Find("Fornecedor").GetComponent(Fornecedor);
	ingrediente = this.gameObject.name;
	fornecedor.falar(0);
	ferramentas[0].GetComponent(Slider).value = 0;
}

function Update () {
}

function mudarInterface(){
	ferramentas[0].SetActive(ferramentas[1].GetComponent(Toggle).isOn);
	ferramentas[1].SetActive(false);
	fornecedor.falar(1);
}

function atualizarValorSlider(){
	ferramentas[0].GetComponent(Slider).maxValue = getValor("cap"+ingrediente) - getValor(ingrediente);
	
	valorSlider = ferramentas[0].GetComponent(Slider).value;
	
	fornecedor.setPrecoFinal();
}

function getValor(valor : String){
	return fornecedor.entidade.getValor(valor);
}


function getPreco(){
	preco = getValor("preco"+ingrediente) * valorSlider;
	return preco;  
}

function getQuantidade(){
	return valorSlider;
}

function resetarSlider(){
	ferramentas[0].GetComponent(Slider).value = 0;
}