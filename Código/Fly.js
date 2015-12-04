#pragma strict

public class Fly extends MonoBehaviour{

var fly : GameObject;
var flydebuff1 : float;
var flydebuff2 : float;
static var flyON : boolean;

function Start () {
   fly = GameObject.Find("FLY");
   fly.SetActive(false);

   Invoke("aparecerfly", (Random.Range(20,120)));
}

function aparecerfly(){
      
      flyON = true;
      fly.transform.position.x = Random.Range(-15,30);
      fly.transform.position.y = Random.Range(-15,30);
      fly.SetActive(true);

      flydebuff1 = OJogo.purity * 0.5;
      flydebuff2 = OJogo.cozinheiros * 0.5;

      OJogo.purity -= flydebuff1;
      OJogo.cozinheiros -= flydebuff2;
}

function sumirfly(){
      
      flyON = false;
      OJogo.purity += flydebuff1;
      OJogo.cozinheiros += flydebuff2;

      fly.SetActive(false);

      Invoke("aparecerfly", (Random.Range(20,120)));
}
}