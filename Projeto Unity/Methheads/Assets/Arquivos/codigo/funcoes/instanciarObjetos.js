#pragma strict

static var temRadio : boolean;
static var temEntidade : boolean;

function Awake () 
{
    if (gameObject.name == "musicaRadio"){
    	if (temRadio)
        	Destroy(gameObject);
    	else {
        	DontDestroyOnLoad(gameObject);
        	temRadio = true;
		}
	}
	
	else if(gameObject.name == "Entidade"){
		if (temEntidade)
    		Destroy(gameObject);
    	else {
        	DontDestroyOnLoad(gameObject);
        	temEntidade = true;
		}
	}
}
