"use strict"

document.addEventListener('DOMContentLoaded', ()=>{
// Voer alles hieronder uit als de dom is geladen

const jsonData = 'data/Survey_Information_Design_clean-parsed.json'; // locatie van de ruwe data

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

  let nl_kleuren = {blauw:'#0000FF', groen:'#008000', bruin: '#835C3B', lichtblauw: '#add8e6'}
  let opgeschoonde_kleuren = [];

  oogkleuren.forEach(kleur => {
    kleur = kleur.toLowerCase();

    // check eerst alleen of de kleur een hashtag nodig heeft
    if (kleur.length == 6){
      // voeg hashtag aan het begin toe, en stop'm in de nieuwe array
      kleur = "#" + kleur;
      opgeschoonde_kleuren.push(kleur)
    }

    if(typeof nl_kleuren[kleur] !== "undefined"){
      // als de kleur in de nl_kleuren zit, dan zet je de matchende hexcode ook in de opgeschoonde_kleuren lijst
      opgeschoonde_kleuren.push(nl_kleuren[kleur])
    }

    if(kleur.startsWith("rgb")){
      // check voor rgb kleuren

      kleur = kleur.replace(".", ","); // vervangt . voor ,
      let rgb = kleur.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i); // zorgt dat je de cijfers kan pakken

      // maakt van de rgb nummers een hex code
      let hex = "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + 
                      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);

      opgeschoonde_kleuren.push(hex)
    }

  });

  return opgeschoonde_kleuren;
}

function addToDom(nieuwe_kleuren) {

  const body = document.querySelector('body');

  nieuwe_kleuren.forEach(kleur => {
    console.log(kleur);
    body.innerHTML += `<div style='background-color: ${ kleur };  width: 100px; height: 100px;'>${ kleur }</div`;
  });
}

function getOogKleuren(data){


  // stop alle kleuren in een lijst.
  let lijstOogkleuren = [];
  data.forEach(element => lijstOogkleuren.push((element.oogKleur))); 

  check_hashtags(lijstOogkleuren); // check de kleuren op hashtag

  let result_hashtag = check_hashtags(lijstOogkleuren); // het resultaat van de hashtag-check
  let goede_kleuren = result_hashtag[0]; // de kleuren die al goed zijn
  let slechte_kleuren = result_hashtag[1]; // de kleuren die nog moeten worden opgeschoond
  let opgeschoonde_kleuren = verschoon_oogkleuren(slechte_kleuren);

  let nieuwe_kleuren = goede_kleuren + ',' + opgeschoonde_kleuren;
  nieuwe_kleuren = nieuwe_kleuren.split(',');

  addToDom(nieuwe_kleuren);
  
}

fetchData();

});