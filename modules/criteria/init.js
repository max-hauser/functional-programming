/*

This is the init file (for now..)

First I import the criteria functions, then I put all the results together.
Once the results are all together, I filter out the ones that are only from Amsterdam.
After that I map the array so that only the items that were in all 3 seperate arrays stay.
Lastly I send the data away in the getLocations.
*/

import cashOnly from "./cash_only.js";
import exitParking from "./exit_parking.js";
import maxVehicleHeight from "./max_vehicle_height.js";
import getLocations from "./get_location.js";

async function init() {

  // get all the areaid's
  const varCashOnly = await cashOnly();
  const varMaxVehicleHeight = await maxVehicleHeight();
  const varExitParking = await exitParking();

  // put the areaid's together in one array
  const concatData = varCashOnly.concat(varMaxVehicleHeight, varExitParking);

  // Only get the areaid's from Amsterdam (363)
  const cityData = concatData.filter(item => item.includes("363"));

  // filter out the areaid's if they occur 3 times in the array
  let keyValues = {};

  let canditAreas = cityData.map(area => {
    keyValues[area] = keyValues[area] == null ? 1 : keyValues[area] + 1;
  
    if (keyValues[area] == 3) {
      return area;
    }
  }).filter(area => area != null);

  getLocations(canditAreas);
}

export default init;