'use strict';

// added cyper text
let newToken = 'TFZtRGs5MjNSY0hEdjdoZDgwdFc4RjBQNU9ZU2ZBbHo';
let newUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=${atob(newToken)}&size=2`

let dataStore = {
    startDate: null,
    endDate: null,
    name: null,
    description: null
}

$(`#searchBtn`).on("click", function () {
    let searchCriteria = $('#landing-inp').val();
    let url = newUrl + "stateCode=OR&keyword=" + searchCriteria;
    let method = "GET";

    $.ajax({
        url,
        method
    }).then((response) => {
        if (!response._embedded.events.length) {
            alert('No record found')
            return;
        }
        console.log(response._embedded.events);
        response._embedded.events.map(event => {
            dataStore.startDate = event.dates.start.localDate;
            dataStore.endDate = event.sales.public.endDateTime;
            dataStore.name = event.name;
            dataStore.description = event.name;
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
        type: "GET",
        url: `${newUrl}&latlong=${latlon}`,
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            var e = document.getElementById("events");
            e.innerHTML = json.page.totalElements + " events found.";
            showEvents(json);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });

}

function showError(error) {
    switch (error.code) {
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
    for (var i = 0; i < json.page.size; i++) {
        $("#events").append("<p>" + json._embedded.events[i].name + "</p>");
    }
}


getLocation();
