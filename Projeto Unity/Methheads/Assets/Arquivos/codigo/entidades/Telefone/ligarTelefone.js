class ligarTelefone extends Telefone{

 function OnMouseDown(){
        
    switch(parseInt(numeroDigitado)){

        case 7655670:
            playLigar();
            acaoPizza();
            break;
        
        default:
            playOcupado();
            break;
        }
    }
}