"use strict"

document.addEventListener('DOMContentLoaded', ()=>{
// Voer alles hieronder uit als de dom is geladen

const jsonData = './Survey_Information_Design_clean-parsed.json'; // locatie van de ruwe data

function fetchData() {
  // haal de data op
  fetch(jsonData)
  .then( response => response.json() )
  .then( data => getOogKleuren(data) )
}

function check_hashtags( oogkleuren ) {
  // Check van de data welke al een hashtag hebben
  let hashtags = [];
  let geen_hashtags = [];

  oogkleuren.forEach(oogKleur =>{
    // schoon de hashtags op zodat ze goed te gebruiken zijn.
    if(oogKleur.charAt(0) == "#"){
      oogKleur = oogKleur.replace(/\s/g, ''); // haal spaties weg
      oogKleur = oogKleur.toLowerCase(); // zet alles naar lowercase
      hashtags.push(oogKleur);
    }else{
      geen_hashtags.push(oogKleur);
    }
  });

  return [hashtags, geen_hashtags];
}

function verschoon_oogkleuren( oogkleuren ) {
  //console.log(oogkleuren);

  let nl_kleuren = {blauw:'#0000FF', groen:'#008000', bruin: '#835C3B'}
  let opgeschoonde_kleuren = [];

  oogkleuren.forEach(kleur => {
    kleur = kleur.toLowerCase();
    //console.log(kleur);

    // check eerst alleen of de kleur een hashtag nodig heeft
    if (kleur.length == 6){
      // voeg hashtag aan het begin toe, en stop'm in de nieuwe array
      kleur = "#" + kleur;
      opgeschoonde_kleuren.push(kleur)
    }

    // check de kleurwoorden
    const tekstkleuren = Object.keys(nl_kleuren);

    if(tekstkleuren.includes(kleur)) {
      //console.log(kleur)
    }

  });

  //console.log(opgeschoonde_kleuren);
}

function getOogKleuren(data){


  // stop alle kleuren in een lijst.
  let lijstOogkleuren = [];
  data.forEach(element => lijstOogkleuren.push((element.oogKleur))); 

  console.log(lijstOogkleuren);

  check_hashtags(lijstOogkleuren); // check de kleuren op hashtag

  let result_hashtag = check_hashtags(lijstOogkleuren); // het resultaat van de hashtag-check
  let goede_kleuren = result_hashtag[0]; // de kleuren die al goed zijn
  let slechte_kleuren = result_hashtag[1]; // de kleuren die nog moeten worden opgeschoond
  
  verschoon_oogkleuren(slechte_kleuren)
}

fetchData();

});