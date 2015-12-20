#pragma strict
import System.DateTime;

var textoHora : Text;

class managerPC extends MonoBehaviour {

	function Start()
	{
	    atualizarHora();
	}

	function atualizarHora()
	{
	    textoHora.text = "" + System.DateTime.Now.ToString("hh:mm");
	    Invoke("atualizarHora", 60);
	}

}