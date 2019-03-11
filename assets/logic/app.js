'use strict';

// added cyper text
let token = 'dGJKSzk2NW9LYmFDSW9LeDFIcGVQcFNlM2gxMmtI';
let key = 'OGFkZGIwNTdiYW1zaDljY2Q1NWRjNDYyZjRmNHAxMjM3ZDZqc244ZWQ5MzBhNDNkYTk';

let dataStore = {
    startDate: null,
    endDate: null,
    name: null,
    description: null
}

$(`#searchBtn`).on("click", function () {
    let searchCriteria = 'community';
    let url = "https://predicthq.p.rapidapi.com/v1/events/?category=" + searchCriteria + "&offset=10";
    let method = "GET";

    $.ajax({
        url,
        method,
        headers: {
            "authorization": `Bearer ${atob(token)}`,
            "x-rapidapi-key": `${atob(key)}`
        }
    }).then((response) => {
        if (!response.results.length) {
            alert('No record found')
            return;
        }
        console.log(response.results);
        response.results.map(event => {
            dataStore.startDate = event.start;
            dataStore.endDate = event.end;
            dataStore.name = event.title;
            dataStore.description = event.description;
            console.log(dataStore);
        })
    });
});
// Logic to get location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        var x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    var latlon = position.coords.latitude + "," + position.coords.longitude;


    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=2&latlong="+latlon,
      async:true,
      dataType: "json",
      success: function(json) {
                  console.log(json);
                  var e = document.getElementById("events");
                  e.innerHTML = json.page.totalElements + " events found.";
                  showEvents(json);
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    });

}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


function showEvents(json) {
  for(var i=0; i<json.page.size; i++) {
    $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
  }
}


getLocation();