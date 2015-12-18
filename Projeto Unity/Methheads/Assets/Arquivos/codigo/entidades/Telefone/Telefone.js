﻿#pragma strict

class Telefone extends MonoBehaviour {

	var numeroDigitado : String;
	var objetoTelefone : GameObject;

	var audioSource : AudioSource;

	var nomeSom : String[];
	var tipoSom : AudioClip[];

	function Start() 
	{
		numeroDigitado = "";
	    objetoTelefone = GameObject.Find("telefoneInterface");
	}
	
	function Update()
	{
		if (GameObject.Find("numeroDigitado") != null)
			GameObject.Find("numeroDigitado").GetComponent(Text).text = numeroDigitado;
	}

	function ativarTelefone()
	{
	    for(var l = 0; l < objetoTelefone.transform.childCount; ++l)
	        objetoTelefone.transform.GetChild(l).gameObject.SetActive(true);
	}

	function desativarTelefone()
	{
	    numeroDigitado = "";

	    for(var l = 0; l < objetoTelefone.transform.childCount; ++l)
	        objetoTelefone.transform.GetChild(l).gameObject.SetActive(false);
	}
	    
	function Telefonar()
	{
		if (numeroDigitado == "")
			return;
		
		switch(parseInt(numeroDigitado)) 
	    {
	        case 7655670:
	            acaoPizza();
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
		numeroDigitado = "";
	}

	function getNum()
	{
		return numeroDigitado;
	}

	function acaoPizza()
	{
		tocarSom("ligar");
		print ("Ok");
	}

}