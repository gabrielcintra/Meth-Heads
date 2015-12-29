#pragma strict
class botaoTelefone extends MonoBehaviour {

    var botao : int;
    var telefone : Telefone;
    
    function Start()
    {
    	telefone = GameObject.Find("telefoneInterface").GetComponent(Telefone);
    }

    function OnMouseDown()
    {
        // botao ligar - 10
        // botao desligar - 11
        
        switch(botao) 
	    {
	        case 10:
	            telefone.Telefonar();
	            break;
	            
	        case 11:
	        	if (telefone.resetarNum() == "")
	        		telefone.desativarTelefone();
	        	break;
	        
	        default:
	        	if (telefone.getNum().length < 8)
	            	telefone.atualizarNum(botao.ToString());
	            
	            break;
	    }
	    
    }
}