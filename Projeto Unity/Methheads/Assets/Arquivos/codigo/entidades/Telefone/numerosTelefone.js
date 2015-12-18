#pragma strict
class numerosTelefone extends Telefone{

    var numero : String;

    function OnMouseDown(){
        
        numeroDigitado += numero;
        GameObject.Find("numeroDigitado").GetComponent(Text).text += numero;
        
        playDigitar();
    
    }
    }