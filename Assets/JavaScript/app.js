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

var event = firebase.database().ref('Event');
var userName; //set player username
var user = firebase.database().ref(userName);


// add event details
event.set({
  Description: 'val',
  Start: 'time',
  Expire: 'time',
  zipcode: 'zip',
  admin: userName
});


// create stored events
user.set({
  Event: {
    name: 'event name',
    start: 'time',
    expire: 'time',
    description: 'string'
  },
});
