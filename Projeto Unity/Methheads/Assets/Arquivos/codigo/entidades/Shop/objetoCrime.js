#pragma strict

class objetoCrime extends Objeto {

    function Start()
    {
        super();

        tipoDinheiro = "sujo";
        atualizarComponentes();
    }

    function alternarInfo(condicao : boolean)
    {
        this.transform.GetChild(1).gameObject.SetActive(condicao);
    }

    function OnMouseEnter()
    {
        alternarInfo(true);
    }

    function OnMouseDown()
    {
        transacao(comprar());
    }

    function OnMouseExit()
    {
        alternarInfo(false);
    }

    function transacao(comprou : boolean)
    {
        var contador = GameObject.Find("Transacao").GetComponent(contadorInstantaneo);
        
        if (comprou)
            contador.contarTransacao("complete");
        else
            contador.contarTransacao("failed");
    }

    function atualizarComponentes()
    {
        componentesValores = [nome, entidade.getFuncTamanho(this).ToString(), "$" + entidade.organizarValor(getValor()), getAtributo()+"%"];
    }

    function getFilho(){
        return this;
    }
    
}