#pragma strict

class Telefone extends MonoBehaviour {

	var numeroDigitado : String;
	var objetoTelefone : GameObject;

	var audioSource : AudioSource;

	var nomeSom : String[];
	var tipoSom : AudioClip[];

	//--------- Telefonemas ----------
	var Fornecedor : GameObject;
	//--------------------------------

	function Start() 
	{
		numeroDigitado = "";
		nomeSom = ["ligar", "desligar", "ocupado", "digitar", "ocupadoDireto"];
	    objetoTelefone = GameObject.Find("telefoneInterface");
	}
	
	function Update()
	{
		if (GameObject.Find("numeroDigitado") != null)
			GameObject.Find("numeroDigitado").GetComponent(Text).text = numeroDigitado;
	}

	function ativarTelefone()
	{
		gameObject.SetActive(true);
	}

	function desativarTelefone()
	{
	    numeroDigitado = "";

	    gameObject.SetActive(false);
	}
	    
	function Telefonar()
	{
		if (numeroDigitado.length < 7) {
			tocarSom("ocupadoDireto");
			return;
		}
		
		switch(parseInt(numeroDigitado)) 
	    {
	        case 7655670:
	            ligar("acaoPizza");
	            break;

        	case 5054205:
        		ligar("acaoFornecedor");
        		break;
	        
	        default:
	            tocarSom("ocupado");
	            break;
	    }
	}

	function tocarSom(nome : String)
	{	
		for (var i=0; i < nomeSom.length; i++)
			if (nomeSom[i] == nome)
				 audioSource.clip = tipoSom[i];
				 
		audioSource.Play();
	}

	function atualizarNum(adicao : String)
	{
		numeroDigitado += adicao;
		tocarSom("digitar");
	}

	function resetarNum()
	{
		audioSource.Stop();
		
		var aux = numeroDigitado;
		numeroDigitado = "";

		return aux;
	}

	function getNum()
	{
		return numeroDigitado;
	}

	function ligar(funcao : String)
	{
		tocarSom("ligar");
		Invoke(funcao, audioSource.clip.length);
	}

	function acaoPizza()
	{
		print ("Ok");
	}

	function acaoFornecedor()
	{
		Fornecedor.SetActive(true);
	}

}