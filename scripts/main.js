const jsonData = 'data/Survey_Information_Design_clean-parsed.json'; // locatie van de ruwe data

const fetchData = () => {
  // haal de data op
  fetch(jsonData)
  .then(response => response.json())
  .then(data => main(data))
}

const filterGood = (subjectList) => {
  const hashtags = subjectList.filter(subject => subject.charAt(0) == "#");

  const cleanup = hashtags.map(item => {
    item = item.toLowerCase();
    item = item.replace(/\s/g, '');
    return item;
  });

  return cleanup;
}

const filterBad = (slechteData) => {

  // moeten alleen nog een # krijgen
  const needHashtag = slechteData.filter(data => data.length == 6);
  const needHashtagResult = needHashtag.map(item =>  item = "#" + item);

  // kleurwoorden aanpassen naar hex
  const woordKleuren = {blauw:'#0000FF', groen:'#008000', bruin: '#835C3B', lichtblauw: '#add8e6'}
  let woordKleurenResult = slechteData.map(item => woordKleuren[item.toLowerCase()]);
  woordKleurenResult = woordKleurenResult.filter(e => e != null);

  // rgb to hex
  let hexColor = slechteData.map(answer => {
    if(answer.startsWith("rgb")){

      answer = answer.replace(".", ","); // vervangt . voor ,
      let rgb = answer.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i); // zorgt dat je de cijfers kan pakken

      // maakt van de rgb nummers een hex code
      let hex = "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + 
                      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
                      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);            
      return hex;                        
    }
  });

  let hexColorResult = hexColor.filter(Boolean);
  const result = needHashtagResult.concat(woordKleurenResult, hexColorResult);
  return result;
}

const addToDom = (nieuwe_kleuren) => {

  nieuwe_kleuren = nieuwe_kleuren.sort();
  const body = document.querySelector('body');
  nieuwe_kleuren.forEach(kleur => {
    body.innerHTML += `<div style='background-color: ${ kleur };  width: 100px; height: 100px;'>${ kleur }</div`;
  });
}



const main = (data) =>{

  // stop alle kleuren in een lijst.
  const subject = "oogKleur";

  const subjectList = data.map(anwser => anwser[subject]);
  filterGood(subjectList);

  const slechteData = subjectList.filter(subject => subject.charAt(0) != "#"); 
  filterBad(slechteData);

  const badHex = filterBad(slechteData);
  const goodHex = filterGood(subjectList);

  const result = goodHex.concat(badHex);

  addToDom(result);
}

fetchData();