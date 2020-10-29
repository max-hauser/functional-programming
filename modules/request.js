async function getData(url) {
  // fetches the requested data and returns it
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default getData;