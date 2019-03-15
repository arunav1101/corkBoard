$(function(){

    let config = {
       apiKey: "AIzaSyBbdB0Z13saO2C5CbwRn6sNvyR9jFuYrtA",
       authDomain: "eventsearch-9871b.firebaseapp.com",
       databaseURL: "https://eventsearch-9871b.firebaseio.com",
       projectId: "eventsearch-9871b",
       storageBucket: "eventsearch-9871b.appspot.com",
       messagingSenderId: "329903550973"
     };
 
    firebase.initializeApp(config);
 
    let newEventName = "";
    let newEventLocation = "";
    let newEventDate = "";
    let newEventTime = "";
    let newEventDescription = "";
    let userName= "user"
 
    let database = firebase.database().ref('Events/'+newEventName);
 
 
   
    $("#create-event-button").on("click",function(event){
       event.preventDefault();
 
        newEventName=$("#event-name-input").val();
        newEventLocation=$("#event-location-input").val();
        newEventStartDate=$("#event-date-start-input").val();
        newEventStartTime=$("#event-time-start-input").val();
        newEventEndDate=$("#event-date-end-input").val();
        newEventEndTime=$("#event-time-end-input").val();
        newEventDescription=$("#event-description-input").val();
        
 
       database = firebase.database().ref('Events/'+newEventName);
 
       database.set({
 
          Name: newEventName,
          Zipcode: newEventLocation,
          Start: newEventStartDate,
          Expire: newEventEndDate,
          StartTime: newEventStartTime,
          Description: newEventDescription,
          DateAdded: firebase.database.ServerValue.TIMESTAMP,
          Admin: userName
 
       });
     });
 
    database.on("child_added", function(childSnapshot) {
 
       console.log(childSnapshot.val().Name);
       console.log(childSnapshot.val().Zipcode);
       console.log(childSnapshot.val().Start);
       console.log(childSnapshot.val().Expire);
       console.log(childSnapshot.val().Description);
 
    });
 
    database.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
       
       let newEventCard = $("<card>");
 
       let cardName = $("<h3>").text(snapshot.val().Name);
       let cardLocation = $("<h4>").text(snapshot.val().Zipcode);
       let cardDate = $("<h4>").text(snapshot.val().Start);
       let cardTime = $("<h4>").text(snapshot.val().Expire);
       let cardDescription = $("<h4>").text(snapshot.val().Description);
 
       newEventCard.append(cardName, cardLocation, cardDate, cardTime, cardDescription);
       $("#created-events-here").append(newEventCard);
    });
 });
 