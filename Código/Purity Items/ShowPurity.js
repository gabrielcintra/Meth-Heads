#pragma strict
function Update () {

for (var child : Transform in this.transform) {
			if (Shop.MenuTransition == 2) {
				child.gameObject.SetActive (true);
			} else {
				child.gameObject.SetActive (false);
			}
		}

}