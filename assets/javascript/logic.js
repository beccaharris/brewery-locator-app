$(document).ready(function () {
  console.log('ready!');
  var beerFacts = [
    { fact: 'Beer is made with hops!' },
    { fact: 'Your mamma has three titties: one for beer, one for water, and the third one says "OUT OF ORDER"' }
  ]
  console.log(beerFacts);
  // Append beerFacets to .beer-facts

  // Cycle through array on 30 second timer


  var userInput;
  $('#search-button').on('click', function (event) {
    userInput = $('#zip-code').val().trim();
    console.log(userInput)
    var queryUrl = 'https://cors-anywhere.herokuapp.com/http://beermapping.com/webservice/loccity/E3b1372b6db3c5e549e795a11ed77331/' + userInput
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).done(function (beer) {
      var beerList = beer.data;
      console.log(queryUrl)
      console.log(beer)
    })
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdqCYrEn0pxKLfqlxBy1YDaPJfJyT10ZQ",
    authDomain: "brewery-locator-app-619ab.firebaseapp.com",
    databaseURL: "https://brewery-locator-app-619ab.firebaseio.com",
    projectId: "brewery-locator-app-619ab",
    storageBucket: "brewery-locator-app-619ab.appspot.com",
    messagingSenderId: "159281817968"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var name = "";
  var age = "";
  var comment = "";

  // Capture Button Click
  $("#submit").on("click", function (event) {
    event.preventDefault();
    var name = $("#name").val().trim();
    console.log(name);
    var age = $("#age").val().trim();
    console.log(age)
    var comment = $("#comment").val().trim();
    console.log(comment)

    var newComment = {
      newName: name,
      newAge: age,
      newComment: comment
    };

    database.ref().push(newComment);
    console.log(newComment.name)

    $("#name").val("");
    $("#age").val("");
    $("#comment").val("");
  });

  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot);
    console.log(childSnapshot.val());

    var name = childSnapshot.val().newName;
    var age = childSnapshot.val().newAge;
    var comment = childSnapshot.val().newComment;

    console.log(name);
  

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function (snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().age);
      console.log(snapshot.val().comment);

  


      $('#input-comments > tbody').append('<tr><td>' + name + age + comment + '<tr><td>')

    });
  });
});