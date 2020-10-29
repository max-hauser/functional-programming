import { data_parking_open } from "../dataset.js";
import  getData  from "../request.js";

async function exitParking() {
  // returns the areaid's where you can always leave at anytime of the day
  const data = await getData(data_parking_open);
  const query =  data.filter(places => places.exitpossibleallday == "1" && places.openallyear == "1");
  const result = query.map(places => places.areaid);
  return result;
}

export default exitParking;