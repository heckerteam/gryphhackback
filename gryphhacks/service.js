async function getCords(address) {
  let data = await fetch(
    "http://api.positionstack.com/v1/forward?access_key=d089bf01bca2096c3dd0a8c6bdb838ac&query=" +
      address
  )
    .then((response) => response.json())
    .then((res) => res.data[0])
    .then((d) => d);
  return [data.latitude, data.longitude];
}

async function sendData() {
  let nameHtml = document.getElementById("name");
  let sTime = document.getElementById("stime");
  let eTime = document.getElementById("eTime");
  let address = document.getElementById("address");
  let desc = document.getElementById("desc");
  const [lat, long] = await (await getCords(address));
  fetch("apistuff", {
    method: "POST",
    body: JSON.stringify({
      name: nameHtml,
      time_start: sTime,
      time_end: eTime,
      location: address,
      latitude: lat,
      longitude: long,
      description: desc,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.warn("Something went wrong.", error);
    });
}
