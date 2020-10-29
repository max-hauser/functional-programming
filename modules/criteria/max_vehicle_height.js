import { data_specificaties_parkeergebied } from "../dataset.js";
import  getData  from "../request.js";

async function maxVehicleHeight() {
  // returns the areaid's where you can park a car heigher then 200cm
  const data = await getData(data_specificaties_parkeergebied);
  const query =  data.filter(vehicleHeight => vehicleHeight.maximumvehicleheight >= 200);
  const result = query.map(places => places.areaid);
  return result;
}

export default maxVehicleHeight;