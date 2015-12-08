#pragma strict

    //clicou no botao mudou a cena
 function LoadNextLevel(name : String){
  LevelLoad(name);
} 

    //da load no level depois de um segundo
  function LevelLoad(name : String){
        yield WaitForSeconds(1f);
        Application.LoadLevel(name);
    }