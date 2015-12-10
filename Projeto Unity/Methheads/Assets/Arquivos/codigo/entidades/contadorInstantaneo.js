#pragma strict

private var velocidade = 0.01;
private var posInicial : float;
private var canvas : CanvasGroup;
var transforms : Transform;


function Start () {
    canvas = gameObject.GetComponent(CanvasGroup);
    canvas.alpha = 0;
    posInicial = gameObject.transform.position.y;
}

function contar(valor : float){
    gameObject.transform.position.y = posInicial;
    gameObject.GetComponent(Text).text = "+" + valor;
    gameObject.GetComponent(CanvasGroup).alpha = 1;
    subir_apagar();
}

    function subir_apagar(){
        CancelInvoke("subir_apagar");
        this.gameObject.transform.position.y += velocidade;
        canvas.alpha -= velocidade;
        Invoke("subir_apagar",0);
}