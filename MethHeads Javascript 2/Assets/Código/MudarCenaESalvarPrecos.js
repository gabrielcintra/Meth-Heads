#pragma strict
function MudarCena(cena : String){
Application.LoadLevel(cena);
}

function salvarPrecos(){
PlayerPrefsX.SetFloatArray("PrecosLab",Labs.precoslabs);
PlayerPrefsX.SetIntArray("LabsComprados",Labs.LabsComprados);

PlayerPrefsX.SetFloatArray("PrecosPurity",PurityItems.precos);

PlayerPrefsX.SetFloatArray("PrecosDealers",Dealers.precosDealers);
PlayerPrefsX.SetIntArray("DealersComprados",Dealers.DealersComprados);

PlayerPrefsX.SetFloatArray("PrecosCookers",Cookers.precosCookers);
PlayerPrefsX.SetIntArray("SavedCookersComprados", Cookers.CookersComprados);

PlayerPrefsX.SetFloatArray("PrecosTransporte",Transporte.precosTransporte);
PlayerPrefsX.SetIntArray("TransportesComprados",Transporte.TransportesComprados);
}
function loadPrecos(){
Labs.precoslabs = PlayerPrefsX.GetFloatArray("PrecosLab");
Dealers.precosDealers = PlayerPrefsX.GetFloatArray("PrecosDealers");
PurityItems.precos = PlayerPrefsX.GetFloatArray("PrecosPurity");
Cookers.precosCookers = PlayerPrefsX.GetFloatArray("PrecosCookers");
}