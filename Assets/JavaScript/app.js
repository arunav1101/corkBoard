// Initialize Firebase
var config = {
  apiKey: "AIzaSyBbdB0Z13saO2C5CbwRn6sNvyR9jFuYrtA",
  authDomain: "eventsearch-9871b.firebaseapp.com",
  databaseURL: "https://eventsearch-9871b.firebaseio.com",
  projectId: "eventsearch-9871b",
  storageBucket: "eventsearch-9871b.appspot.com",
  messagingSenderId: "329903550973"
};
firebase.initializeApp(config);

// Global variables init empty to be stored by user
var eventName;
var userName;


// for creating event
var event = firebase.database().ref('Events/' + eventName); 


// for saving event for users
var user = firebase.database().ref('Users/' + userName + eventName);


// add event details
$('#create-event-button').on('click', function() {
  // store event name in global variable
  eventName = $('#event-name').text().trim();
    event.set({
      Name: 'Name of Event',
      Description: 'val',
      Start: 'time',
      Expire: 'time',
      Zipcode: 'zip',
      Admin: userName
    });
})



// create stored events
$('#save-event-button').on('click', function() {
  // userName needs to be stored on login

  // store event name in global variable
  eventName = $('#event-name').text().trim();
  user.set({
    Name: 'event name',
    Start: 'time',
    Expire: 'time',
    Description: 'string',
    Zipcode: 'zip'
  });
})

