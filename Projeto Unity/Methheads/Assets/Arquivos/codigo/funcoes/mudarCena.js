#pragma strict
import UnityEngine.SceneManagement;
//clicou no botao mudou a cena
function LoadNextLevel(name : String) 
{
	LevelLoad(name);
} 

//da load no level depois de um segundo
function LevelLoad(name : String) 
{
	yield WaitForSeconds(0.9f);
	SceneManager.LoadScene(name);
}
