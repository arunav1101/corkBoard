$(function(){

   let config = {
      apiKey: 'AIzaSyBbdB0Z13saO2C5CbwRn6sNvyR9jFuYrtA',
      authDomain: 'eventsearch-9871b.firebaseapp.com',
      databaseURL: 'https://eventsearch-9871b.firebaseio.com',
      projectId: 'eventsearch-9871b',
      storageBucket: 'eventsearch-9871b.appspot.com',
      messagingSenderId: '329903550973'
    };

   firebase.initializeApp(config);

   let newEventName = '';
   let newEventLocation = '';
   let newEventStartDate = '';
   let newEventStartTime = '';
   let newEventEndDate = '';
   let newEventEndTime = '';
   let newEventDescription = '';
   let userName= 'user'

   let database = firebase.database().ref('Events/'+newEventName);


  
   $('#create-event').on('click',function(event){
      event.preventDefault();

       newEventName=$('#event-name-input').val();
       newEventLocation=$('#event-location-input').val();
       newEventStartDate=$('#event-date-start-input').val();
       newEventStartTime=$('#event-time-start-input').val();
       newEventEndDate=$('#event-date-end-input').val();
       newEventEndTime=$('#event-time-end-input').val();
       newEventDescription=$('#event-description-input').val();
       

      database = firebase.database().ref('Events/'+newEventName);

      database.set({

         Name: newEventName,
         Zipcode: newEventLocation,
         Start: newEventStartDate,
         Expire: newEventEndDate,
         StartTime: newEventStartTime,
         EndTime: newEventEndTime,
         Description: newEventDescription,
         DateAdded: firebase.database.ServerValue.TIMESTAMP,
         Admin: userName

      });
    });

   database.on('child_added', function(childSnapshot) {

      console.log(childSnapshot.val().Name);
      console.log(childSnapshot.val().Zipcode);
      console.log(childSnapshot.val().Start);
      console.log(childSnapshot.val().Expire);
      console.log(childSnapshot.val().Description);
      
      let newEventCard = $('<div>').attr('class', 'jumbotron text-center mt-3').attr('id', 'new-jumbo');

      let cardName = $('<h3>').attr('class','row').text('Created Event: ' + childSnapshot.val().Name);
      let cardDate = $('<p>').attr('class','row').text(childSnapshot.val().Start);
      let cardExpire = $('<p>').attr('class','row').text(childSnapshot.val().Expire);
      let cardDescription = $('<p>').attr('class', 'row').text(childSnapshot.val().Description);

      console.log(cardName);
      

      newEventCard.append(cardName, cardDate, cardExpire, cardDescription);
      $('#created-events-here').append(newEventCard);

   });

   // database.orderByChild('dateAdded').limitToLast(1).on('child_added', function(childSnapshot) {
      
   //    let newEventCard = $('<card>');

   //    let cardName = $('<h3>').text(childSnapshot.val().Name);
   //    let cardLocation = $('<h4>').text(childSnapshot.val().Zipcode);
   //    let cardDate = $('<h4>').text(childSnapshot.val().Start);
   //    let cardTime = $('<h4>').text(childSnapshot.val().Expire);
   //    let cardDescription = $('<h4>').text(childSnapshot.val().Description);

   //    console.log(newEventCard);
      

   //    newEventCard.append(cardName, cardLocation, cardDate, cardTime, cardDescription);
   //    $('#created-events-here').append(newEventCard);
   // });
});
