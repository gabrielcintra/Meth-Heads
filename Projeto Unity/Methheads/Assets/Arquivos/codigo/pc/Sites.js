#pragma strict
///Esse script está acoplado em GM_PC
///idElementos : inicia o carregamento do site
///estruturaOff : desliga o site
///resetarElementos : reseta a lista de itens carregados pelo site
///desCriancas : desliga as crianças sem passar pelo desativarAtual

var siteAtual : Site;
var siteAnterior : Site;

var sitesExistentes : Site[];

var speedD : GameObject;
var iconeSpeedD : Sprite;

function Update(){
	if (Input.GetKey(KeyCode.KeypadEnter) || Input.GetKey("enter"))
		checarEndereco();
}

function desativarAtual(){	

	siteAtual.cancelInvoke();

	for (var crianca : Transform in siteAtual.gameObject.transform)
		crianca.gameObject.SetActive(false);

	siteAtual.estruturaOff(); //desativa o parente principal(scroll) e scrollbar
	siteAtual.resetarElementos();  // reseta os elementos carregados
	siteAnterior = siteAtual;
	siteAtual = null;
}

function checarEndereco(){
	
	for (var k = 0; k < sitesExistentes.length; k++)
		if (enderecoExiste(k)){
			if (siteAtual != null)
				desativarAtual();
			sitesExistentes[k].idElementos();
		}
}

function enderecoExiste(index : int){
	var inputEnd = GameObject.Find("EnderecoInput").GetComponent(InputField).text.ToLower();
	var Endereco = sitesExistentes[index].getEndereco();

	if (inputEnd == Endereco || 
		inputEnd == Endereco + "/" || 
		inputEnd == "http://"+Endereco ||
		inputEnd == "www."+Endereco)
		return true;
	else
		return false;
}

function voltarInicial(){
	var aux : Site;
	
	if (siteAnterior != null && siteAnterior != siteAtual){
		aux = siteAnterior;
		desativarAtual();
		siteAnterior = null;
		aux.idElementos();
		GameObject.Find("EnderecoInput").GetComponent(InputField).text = aux.getEndereco();
	}
	
	else{
		ativarSpeedD();
		siteAnterior = null;
	}

}

function setSite(site : Site){
	siteAtual = site;
}

function getSite(){
	return siteAtual;
}

function atualizarSite(){
	if (siteAtual != null){
		var siteAtualizado = siteAtual;
		siteAtualizado.desCriancas(); /// desliga as crianças
		siteAtualizado.idElementos(); /// inicia o carregamento do site
	}
}

function ativarSpeedD(){
	desativarAtual();
	speedD.SetActive(true);
	GameObject.Find("descricaoSite").GetComponent(Text).text = "SpeedDial";
	GameObject.Find("Icone").GetComponent(Image).sprite = iconeSpeedD;
	GameObject.Find("EnderecoInput").GetComponent(InputField).text = "";
	GameObject.Find("Placeholder").GetComponent(Text).text = "";
}