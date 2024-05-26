function theOwner(){
    const saveOwner={
        name: document.getElementById('InputName').value,
        alamat: document.getElementById('InputAlamat').value,
        KTP: document.getElementById('InputKTP').value,
        hp: document.getElementById('InputTelephone').value
    }
    localStorage.setItem('saveOwner', JSON.stringify(saveOwner));
    window.location.href = '/mobil' 
}

function loadOwner() {
    const theOwner = JSON.parse(localStorage.getItem('theOwner'));
    if (theOwner) {
        document.getElementById('InputName').value = saveOwner.name,
        document.getElementById('InputAlamat').value =  saveOwner.alamat,
        document.getElementById('InputKTP').value = saveOwner.KTP,
        document.getElementById('InputTelephone').value = saveOwner.hp
        
    }
  }

  document.addEventListener('contentLoaded', function () {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
      nextButton.addEventListener('click', theOwner);
    }
  });