#pragma strict
var Menu_ : int;
function Update () {

for (var child : Transform in this.transform) {
			if (Shop.MenuTransition == Menu_) {
				child.gameObject.SetActive (true);
			} else {
				child.gameObject.SetActive (false);
			}
		}

}