#pragma strict

var fornecedor : Fornecedor;
var ingrediente : String;
var slider : GameObject;
var preco : float;         
var valorSlider : float;

function Start () 
{
	fornecedor = GameObject.Find("Fornecedor").GetComponent(Fornecedor);
	ingrediente = this.gameObject.name;
	slider = this.gameObject.transform.GetChild(0).gameObject;
	
	fornecedor.falar(0);
}

function mudarInterface()
{
	slider.SetActive(true);
	fornecedor.falar(1);
}

function atualizarValorSlider()
{
	slider.GetComponent(Slider).maxValue = getValor("cap"+ingrediente) - getValor(ingrediente);
	valorSlider = slider.GetComponent(Slider).value;
	
	fornecedor.setPrecoFinal();
}

function getValor(valor : String)
{
	return fornecedor.entidade.getValor(valor);
}

function getPreco()
{
	preco = getValor("preco"+ingrediente) * valorSlider;
	return preco;  
}

function getQuantidade()
{
	return valorSlider;
}

function resetarSlider()
{
	slider.GetComponent(Slider).value = 0;
	slider.SetActive(false);
}