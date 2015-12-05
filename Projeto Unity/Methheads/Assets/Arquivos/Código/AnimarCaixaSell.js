#pragma strict

var frames : Sprite[];
var framesPerSecond = 10;
var index : int;
var mouseEmCima : boolean;
var imagemDefault : Sprite;
var imagemVenda : Sprite;

function Start () {
}

function Update () {
    if (mouseEmCima){
        index = (Time.time * framesPerSecond) % frames.Length;
        GetComponent(Image).sprite = frames[index];
    }

}

function OnMouseEnter(){
    mouseEmCima = true;
}

function OnMouseDown(){
    mouseEmCima = false;
    GetComponent(Image).sprite = imagemVenda;
}

function OnMouseExit(){
    mouseEmCima = false;
    index = 0;
    GetComponent(Image).sprite = imagemDefault;
}