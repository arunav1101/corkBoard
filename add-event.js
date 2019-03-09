$(function(){

   var config = {
      apiKey: "AIzaSyD0cTV847nOsyMKkChLqVZSxTD6OMoucXw",
      authDomain: "volex-da21a.firebaseapp.com",
      databaseURL: "https://volex-da21a.firebaseio.com",
      projectId: "volex-da21a",
      storageBucket: "volex-da21a.appspot.com",
      messagingSenderId: "986439603302"
   }
   firebase.initializeApp(config);

   var dataRef = firebase.database();

   var newEventName = "";
   var newEventLocation = "";
   var newEventDate = "";
   var newEventTime = "";
   var newEventDescription = "";

   $("#submit").on("click",function(event){
      event.preventDefault();

       newEventName=$("#event-name-input").val();
       newEventLocation=$("#event-location-input").val();
       newEventDate=$("#event-date-input").val();
       newEventTime=$("#event-time-input").val();
       newEventDescription=$("#event-description-input").val();

      //  console.log(newEventName);
      //  console.log(newEventLocation);
      //  console.log(newEventDate);
      //  console.log(newEventTime);
      //  console.log(newEventDescription);

       dataRef.ref().push({

         name: newEventName,
         location: newEventLocation,
         date: newEventDate,
         time: newEventTime,
         description: newEventDescription,
         dateAdded: firebase.database.ServerValue.TIMESTAMP

      });
    });

   dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().location);
      console.log(childSnapshot.val().date);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().description);
   });

   dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      var newEventCard = $("<card>");

      var cardName = $("<h3>").text(snapshot.val().name);
      var cardLocation = $("<h4>").text(snapshot.val().location);
      var cardDate = $("<h4>").text(snapshot.val().date);
      var cardTime = $("<h4>").text(snapshot.val().time);
      var cardDescription = $("<h4>").text(snapshot.val().description);

      newEventCard.append(cardName, cardLocation, cardDate, cardTime, cardDescription);
      $("#created-events-here").append(newEventCard);
   });
});
