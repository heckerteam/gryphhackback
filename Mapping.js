const apikey = "pk.eyJ1IjoianA4NDEzMzEiLCJhIjoiY2wzZjEwMGE0MDBiaTNla2JsZnB0M3RmdSJ9.ZLQyQW6BpT7i2PcIG2beOw"
let pos = [43.53271, -80.22747];

// let mymap = L.map('map').setView([pos[0], pos[1]], 13);

document.querySelector('.find-state').addEventListener('click', () => {
    const status = document.querySelector('.status');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        pos = [position.coords.latitude, position.coords.longitude];
        console.log(pos);
        const mymap = L.map('map').setView([pos[0], pos[1]], 13);

        
        //ALL THE MARKERS COME IN HERE
        for(i = 0; i<3; i++){

        const marker = L.marker([i], ARRAYLONGITUDE[i]).addTo(mymap);
        marker.bindPopup(ARRAYKEYWORDS[i]);

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