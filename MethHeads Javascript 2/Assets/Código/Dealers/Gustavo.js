#pragma strict
 
private class Gustavo extends MonoBehaviour {
 
        static var preco : int;
        static var taxa : float;
        private var MouseEmCima : boolean;
        private var dinheiroEstaMaior : boolean;
        private var JaSabeQuemEh : boolean;
        private var nome : String;
        private var PrecoMostrado : int;
        private var precoUI : Text;
 
        function Start()
        {
                preco = 1000000000;
                taxa = 20000000;
                nome = this.gameObject.name;
                precoUI = GameObject.Find("GustavoPrice").GetComponent(Text);          
        }
 
        function Update()
        {
                if (OJogo.dinheiro >= preco) {
                        dinheiroEstaMaior = true;
                        JaSabeQuemEh = true;
                        this.gameObject.GetComponent(Button).interactable = true;  
                } else {
                        dinheiroEstaMaior = false;
                        this.gameObject.GetComponent(Button).interactable = false;
                }
                if (JaSabeQuemEh){
                precoUI.text = "$" + formatarPrecoMostrado();
                }
                else{
                precoUI.text = "???";
                }
        }
 
         function ComprarDealer()
        {
     
              OJogo.dinheiro -= preco;
              OJogo.dealers += taxa;
              preco = preco * 1.10;
        
        }
        
        function formatarPrecoMostrado(){
             if (preco >= 100000 && preco < 1000000){
                PrecoMostrado = preco/1000;
                return PrecoMostrado + "k";
             }
             else if (preco >= 1000000){
                PrecoMostrado = preco/1000000;
                return PrecoMostrado + "m";
             }
             else{
                return preco;
             }
        }
        function OnMouseEnter()
        {
        MouseEmCima = true;
        }

        function OnMouseExit()
        {
        MouseEmCima = false;
        }
        
        function OnGUI(){
        }
 }