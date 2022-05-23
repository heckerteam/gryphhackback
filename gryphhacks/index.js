//Search Bar

// var searchBar = document.getElementById('search');

// searchBar.addEventListener('keyup', )
console.log("if you see then you have to make us win")
const apikey = "pk.eyJ1IjoianA4NDEzMzEiLCJhIjoiY2wzZjEwMGE0MDBiaTNla2JsZnB0M3RmdSJ9.ZLQyQW6BpT7i2PcIG2beOw"
let pos = [43.53271, -80.22747];
let latitude = []
let longitude = []
let locationArray = []
let nameArray = []


var logoIcon = L.icon({
  iconUrl: 'unknown.png',
  shadowUrl: 'unknown.png',

  iconSize:     [45, 45], // size of the icon
  shadowSize:   [0, 0], // size of the shadow
});

console.log("HelLOoLoo")

// let mymap = L.map('map').setView([pos[0], pos[1]], 13);
function noButtons(){
  let button = document.getElementById('button')
  button.remove();
}


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
    .catch(error => console.warn("there has been an error with loading please try again\n" + error));

  if (posts && posts.length > 0) {
    for (i = posts.length -1; i >= 0; i--) {
      temp = document.createElement("div");
      temp.className = "post";
      temp.id = "post" + i;
      document.getElementById("main").appendChild(temp);

      console.log(i)

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
          ('0' + Sdate.getMinutes()).slice(-2) +
          " - " +
          Edate.getHours() +
          ":" +
          ('0' + Edate.getMinutes()).slice(-2);
        document.getElementById("post" + i).appendChild(tempTime);
      }
      if (posts[i].email) {
        tempEmail = document.createElement("h2");
        tempEmail.className = "email";
        tempEmail.innerHTML = posts[i].email;
        document.getElementById("post" + i).appendChild(tempEmail);
      }
      if (posts[i].min_age){
        tempAge = document.createElement("h2");
        tempAge.className = "age";
        tempAge.innerHTML = posts[i].min_age + " years old";
        document.getElementById("post" + i).appendChild(tempAge)
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
  }else{
    temp = document.createElement("div");
      temp.className = "post";
      temp.id = "post1";
      document.getElementById("main").appendChild(temp);

      tempPosition = document.createElement("h2");
      tempPosition.className = "position"
      tempPosition.innerHTML = 'Geulph University Volunteer Tutor';
      document.getElementById("post1").appendChild(tempPosition);
      nameArray.push("Geulph University Volunteer Tutor");

      tempLocation = document.createElement("h2");
      tempLocation.className = "location";
      tempLocation.innerHTML = "Geulph University";
      document.getElementById("post1").appendChild(tempLocation);
      locationArray.push('Geulph University');
      latitude.push('43.53285');
      longitude.push('-80.22614');
      
      tempTime = document.createElement("h2");
      tempTime.className = "timings";
      tempTime.innerHTML ="3:00 - 7:00"
      document.getElementById("post1").appendChild(tempTime);

      tempEmail = document.createElement("h2");
        tempEmail.className = "email";
        tempEmail.innerHTML = "Volunteering@GeulphUniversity.com";
        document.getElementById("post1").appendChild(tempEmail);

        tempAge = document.createElement("h2");
        tempAge.className = "age";
        tempAge.innerHTML = "16 years old";
        document.getElementById("post1").appendChild(tempAge)

      tempDesc = document.createElement("p");
        tempDesc.className = "description";
        tempDesc.innerHTML = "help students at the university to help in their studies and mentor them in continuing their education and joining the workforce";
        document.getElementById("post1").appendChild(tempDesc);
  }
}


document.querySelector('.find-state').addEventListener('click', () => {
    const status = document.querySelector('.status');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        pos = [position.coords.latitude, position.coords.longitude];
        console.log(pos);
        const mymap = L.map('map').setView([pos[0], pos[1]], 10);


        //ALL THE MARKERS COME IN HERE
        for(i = 0; i<longitude.length; i++){

        // var marker = L.marker(latitude[i], longitude[i]).addTo(mymap);
        var marker = L.marker(
          L.latLng(
            parseFloat(latitude[i]),
            parseFloat(longitude[i])
          ), {icon:logoIcon}
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

