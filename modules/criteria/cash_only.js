import { data_betaalmethodes } from "../dataset.js";
import  getData  from "../request.js";

async function cashOnly() {
  // returns the areaid's where you can pay with cash
  const data = await getData(data_betaalmethodes);
  const query =  data.filter(info => info.paymentmethod == "CASH");
  const result = query.map(places => places.areaid);
  return result;
}

export default cashOnly;