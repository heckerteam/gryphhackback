//Search Bar

// var searchBar = document.getElementById('search');

// searchBar.addEventListener('keyup', )

const apikey = "pk.eyJ1IjoianA4NDEzMzEiLCJhIjoiY2wzZjEwMGE0MDBiaTNla2JsZnB0M3RmdSJ9.ZLQyQW6BpT7i2PcIG2beOw"
let pos = [43.53271, -80.22747];
latitude = []
longitude = []
locationArray = []
nameArray = []

// let mymap = L.map('map').setView([pos[0], pos[1]], 13);

document.querySelector('.find-state').addEventListener('click', () => {
    const status = document.querySelector('.status');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        pos = [position.coords.latitude, position.coords.longitude];
        console.log(pos);
        const mymap = L.map('map').setView([pos[0], pos[1]], 13);

        console.log("longitude: ", longitude)
        console.log("latitude: ", latitude)
        
        //ALL THE MARKERS COME IN HERE
        for(i = 0; i<longitude.length; i++){

        // var marker = L.marker(latitude[i], longitude[i]).addTo(mymap);
        var marker = L.marker(
          L.latLng(
            parseFloat(latitude[i]),
            parseFloat(longitude[i])
          )
        ).addTo(mymap)
        marker.bindPopup(nameArray[i] + '<br>' + locationArray[i]);

        }
          



        //DO NOT TOUCH --
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: apikey
        }).addTo(mymap);
        //-- DO NOT TOUCH ENDS
    }, () => {
        status.textConent = "FAIL"
        pos = [43.53271, -80.22747];
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: apikey
    }).addTo(mymap);

    });
    // L.map('map').setView([pos[0], pos[1]], 13).addTo(mymap);
});


async function getEvents() {
  let posts = await fetch("http://34.125.42.33:8080/api/events/all", {
    mode: "cors",
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch(error => alert("there has been an error with loading please try again\n" + error));

  console.log(posts[0]);
  if (posts.length > 0) {
    for (i = 0; i < posts.length; i++) {
      temp = document.createElement("div");
      temp.className = "post";
      temp.id = "post" + i;
      document.getElementById("main").appendChild(temp);

      tempPosition = document.createElement("h2");
      tempPosition.className = "position"
      tempPosition.innerHTML = posts[i].name;
      document.getElementById("post" + i).appendChild(tempPosition);
      nameArray.push(posts[i].name)

      if (posts[i].location) {
        tempLocation = document.createElement("h2");
        tempLocation.className = "location";
        tempLocation.innerHTML = posts[i].location;
        document.getElementById("post" + i).appendChild(tempLocation);
        locationArray.push(posts[i].location)
      }
      if (posts[i].time_start && posts[i].time_end) {
        tempTime = document.createElement("h2");
        tempTime.className = "timings";
        var Sdate = new Date(posts[i].time_start);
        var Edate = new Date(posts[i].time_end);
        tempTime.innerHTML =
          Sdate.getHours() +
          ":" +
          Sdate.getMinutes() +
          " - " +
          Edate.getHours() +
          ":" +
          Edate.getMinutes();
        document.getElementById("post" + i).appendChild(tempTime);
      }
      if (posts[i].description) {
        tempDesc = document.createElement("p");
        tempDesc.className = "description";
        tempDesc.innerHTML = posts[i].description;
        document.getElementById("post" + i).appendChild(tempDesc);
      }
      if (posts[i].lat && posts[i].long){
        latitude.push(posts[i].lat)
        longitude.push(posts[i].long)
      }
    }
  }
}

