#pragma strict
var Texto : Text;
var hue : float;
function Start(){
	Texto = gameObject.GetComponent(Text);

}
function Update () {
	Texto.color = Color.HSVToRGB(hue,1,1);
	if(hue < 1.0)
		hue+=0.01;
	else{
		hue = 0;
	}
}