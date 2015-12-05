#pragma strict

var frames : Sprite[];
var framesPerSecond = 10;
var index : int;

function Start () {
}

function Update () {
    index = (Time.time * framesPerSecond) % frames.Length;
    GetComponent(Image).sprite = frames[index];
}