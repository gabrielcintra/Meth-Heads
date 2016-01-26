#pragma strict
var admSites : Sites; /// é o script Sites no GM_PC

var Estrutura : GameObject; ///setado no inspector, é sempre o "scrollNomeDoSite"

var Endereco : String; ///elementos setados de acordo com o site no inspector
var Icone : Sprite;
var Descricao : String;

var Elementos = new Array();
var Scrollbar : GameObject; ///setado no inspector, é o scrollbar do site.

function Start(){
}


function idElementos(){
	admSites = GameObject.Find("GM_PC").GetComponent(Sites);
	Estrutura = transform.parent.gameObject.transform.parent.gameObject;
	Estrutura.SetActive(true);
	Scrollbar.SetActive(true);

	if (GameObject.Find("GM_PC").GetComponent(Sites).getSite() == null && GameObject.Find("scrollSpeedD") != null)
		GameObject.Find("scrollSpeedD").SetActive(false);

	admSites.setSite(this);
	
	idAtributos();
	carregarSite();
}

function idAtributos(){
	GameObject.Find("EnderecoInput").transform.GetChild(1).gameObject.GetComponent(Text).text = Endereco;
	GameObject.Find("descricaoSite").GetComponent(Text).text = Descricao;
	GameObject.Find("Icone").GetComponent(Image).sprite = Icone;
}

function carregarSite(){

	for (var elemento : Transform in this.gameObject.transform)
		Elementos.Add(elemento.gameObject);
	
	if (Elementos.length > 0){
		
		var index = Random.Range(0,Elementos.length-1);
		var tempo = Random.Range(0.0,0.3);

		var elemento : GameObject;
		
		elemento = Elementos[index];
		elemento.SetActive(true);
		Elementos.RemoveAt(index);
		Invoke("carregarSite", tempo);
	}	
	else
		CancelInvoke();
}

function estruturaOff(){
	Estrutura.SetActive(false);
	Scrollbar.SetActive(false);
}

function resetarElementos(){
	Elementos = [];
}

function desCriancas(){
	for (var crianca : Transform in gameObject.transform)
		crianca.gameObject.SetActive(false);
}

function getScrollbar(){
	return Scrollbar;
}

function getEndereco(){
	return Endereco;
}

function cancelInvoke(){
	CancelInvoke("carregarSite");
}