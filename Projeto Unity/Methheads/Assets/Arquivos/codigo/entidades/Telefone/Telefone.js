#pragma strict

class Telefone extends MonoBehaviour {

	var entidade : entidadeLocal;
	var telefone : GameObject;

	var Som : AudioSource;
	var tipoSom : AudioClip[];

	var numeroDigitado : String;
	var nomeSom : String[];

	//--------- Telefonemas ----------
	var numeroTelefonemas : String[];
	var telefonemas : GameObject[];
	var telefonema : GameObject;
	//--------------------------------

	function Start() 
	{
		entidade = GameObject.Find("Entidade").GetComponent(entidadeLocal);
		telefone = GameObject.Find("telefoneInterface");

		nomeSom = ["ligar", "desligar", "ocupado", "digitar", "ocupadoDireto"];
		numeroTelefonemas = ["5054205", "7655670"]; // fornecedor / pizzaria

	    botaoVermelho();
	}
	
	function Update()
	{
		if (GameObject.Find("numeroDigitado") != null)
			GameObject.Find("numeroDigitado").GetComponent(Text).text = numeroDigitado;
	}

	function ligarTelefone()
	{
		telefone.SetActive(true);
	}

	function desligarTelefone()
	{
	    botaoVermelho();
	    tocarSom("desligar");
	    
	    entidade.fadeObjeto(this.gameObject);
	}
	    
	function botaoVerde()
	{
		if (numeroDigitado.length < 7) {
			tocarSom("ocupadoDireto");
			return;
		}

		cancelarLigacao();

		for (var i=0; i < numeroTelefonemas.length; i++)
			if (numeroDigitado == numeroTelefonemas[i]) {
				telefonar(telefonemas[i]);
				return;
			}

	    tocarSom("ocupado");
	}

	function botaoVermelho()
	{
		Som.Stop();
		cancelarLigacao();
		
		var aux = numeroDigitado;
		numeroDigitado = "";

		return aux;
	}

	function telefonar(telefonema : GameObject)
	{
		CancelInvoke("telefonar");		
		
		tocarSom("ligar");
		this.telefonema = telefonema;

		Invoke("telefonar", Som.clip.length);
	}

	function telefonar()
	{
		if (telefonema != null)
			telefonema.SetActive(true);
	}

	function cancelarLigacao()
	{
		CancelInvoke("telefonar");
		telefonema = null;
	}

	function tocarSom(nome : String)
	{	
		Som.Stop();
		for (var i=0; i < nomeSom.length; i++)
			if (nomeSom[i] == nome)
				 Som.clip = tipoSom[i];		 
		
		Som.Play();
	}

	function atualizarNum(adicao : String)
	{
		numeroDigitado += adicao;
		tocarSom("digitar");
	}

	function getLigacao() 
	{
		return telefonema;
	}

	function getNum()
	{
		return numeroDigitado;
	}
}