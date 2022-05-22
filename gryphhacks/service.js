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
  let sTime = document.getElementById("sTime").value;
  let eTime = document.getElementById("eTime").value;
  let address = document.getElementById("location").value;
  let minAge = document.getElementById("minAge").value;
  if(minAge < 0 || minAge > 100 ){
    alert("please input correct age")
    return 0
  }
  let desc = document.getElementById("desc").value;
  let email = document.getElementById("email").value;
  let date = document.getElementById("date").value;
  if(Date.parse(date)-Date.parse(new Date())<0){
    alert("please input future date")
    return 0
  }
  let isRecurring = document.getElementById("isRecurring").checked;
  const [lat, long] = await (await getCords(address));
  fetch("http://api.sevahub.tech:8080/api/events/create", {
    method: "POST",
    body: JSON.stringify({
      name: nameHtml,
      time_start: date + " " + sTime + ":00",
      time_end: date + " " + eTime + ":00",
      location: address,
      min_age: parseInt(minAge),
      lat: lat,
      long: long,
      description: desc,
      email: email,
      is_recurring: isRecurring
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
      console.warn("Something went wrong.\n" + error);
    });
}
