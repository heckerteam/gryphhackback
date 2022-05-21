//Search Bar

// var searchBar = document.getElementById('search');

// searchBar.addEventListener('keyup', )

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
    });

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

      if (posts[i].location) {
        tempLocation = document.createElement("h2");
        tempLocation.className = "location";
        tempLocation.innerHTML = posts[i].location;
        document.getElementById("post" + i).appendChild(tempLocation);
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
    }
  }
}

