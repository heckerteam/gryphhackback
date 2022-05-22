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
  let nameHtml = document.getElementById("name").value;
  let sTime = document.getElementById("stime").value;
  let eTime = document.getElementById("eTime").value;
  let address = document.getElementById("address").value;
  let desc = document.getElementById("desc").value;
  let email = document.getElementById("email").value;
  let date = document.getElementById("date").value;
  let isRecurring = document.getElementById("isRecurring").checked;
  const [lat, long] = await (await getCords(address));
  fetch("http://api.sevahub.tech:8080/api/events/create", {
    method: "POST",
    body: JSON.stringify({
      name: nameHtml,
      time_start: sTime,
      time_end: eTime,
      location: address,
      latitude: lat,
      longitude: long,
      description: desc,
      email: email,
      date: date,
      isRecurring: isRecurring
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
      alert("Something went wrong.\n", error);
    });
}
