#pragma strict

var frames : Sprite[];
var framesPerSecond = 10;

function Update () {
if (OJogo.dea >= 40){
var index : int = (Time.time * framesPerSecond) % frames.Length;
GetComponent(Image).sprite = frames[index];
}
else{
GetComponent(Image).sprite = frames[0];
}
}