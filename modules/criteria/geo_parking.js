import { data_geo_parking } from "../dataset.js";
import  getData  from "../request.js";


async function geoParking(areaIds) {

  // get the location dataset
  const data = await getData(data_geo_parking);

  // compare the data with the areaIds
  const areaCompaired = data.filter(item => areaIds.includes(item.areaid));

  // filter on Amsterdam (363)
  const cityData =  areaCompaired.filter(area => area.areamanagerid == "363");

  // get lat, long
  const cordinates = cityData.map(area => area.location);

  return cordinates;
} 

export default geoParking;