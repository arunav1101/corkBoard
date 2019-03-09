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

   var newEventName = "";
   var newEventLocation = "";
   var newEventDate = "";
   var newEventTime = "";
   var newEventDescription = "";
   var userName= "user"

   var database = firebase.database().ref('Events/'+newEventName);


  
   $("#create-event").on("click",function(event){
      event.preventDefault();

       newEventName=$("#event-name-input").val();
       newEventLocation=$("#event-location-input").val();
       newEventDate=$("#event-date-input").val();
       newEventTime=$("#event-time-input").val();
       newEventDescription=$("#event-description-input").val();
       

      database = firebase.database().ref('Events/'+newEventName);

      database.set({

         name: newEventName,
         location: newEventLocation,
         date: newEventDate,
         time: newEventTime,
         description: newEventDescription,
         dateAdded: firebase.database.ServerValue.TIMESTAMP,
         username: userName

      });
    });

   database.on("child_added", function(childSnapshot) {

      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().location);
      console.log(childSnapshot.val().date);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().description);

   });

   database.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      
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
