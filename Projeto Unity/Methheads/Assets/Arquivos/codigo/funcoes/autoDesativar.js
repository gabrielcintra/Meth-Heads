var object : GameObject;
function ativar(objeto : GameObject){
    object = objeto;
    objeto.SetActive(true);
    Invoke("desativar",3);
}

function desativar(){
    object.SetActive(false);
    CancelInvoke("desativar");
}