#pragma strict

static var jaTem : boolean;

function Awake () {
    if (jaTem){
        Destroy(gameObject);
}
    else{
        DontDestroyOnLoad(gameObject);
        jaTem = true;
    }
}