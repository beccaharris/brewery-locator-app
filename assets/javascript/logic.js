$(document).ready(function() {
  var beerFacts = [
    {fact: 'At any given time, 0.7% of the world is drunk. So 50 million people are drunk right now.'},
    {fact: "The worlds longest hangover lasted 4 weeks after a Scotsman consumed 60 pints of beer."},
    {fact: 'Steven Petrosino of New Cumberland, Pennsylvania downed 1 liter of beer or 33 ounces in a chilly 1.3 seconds in 1977 which made him a World Beer Chugging Champion according to the Guinness Book of World Records.'},
    {fact: 'Amsterdam pays alcoholics in beer. For cleaning the city streets, local alcoholics get 10 Euros, half a packet of rolling tobacco and 5 beers as payment by a government-funded organization.'},
    {fact: 'In 1814, almost 400,000 gallons of beer flooded several streets in London after a huge vat ruptured in the parish of St. Giles.'},
    {fact: "Beer commercials in the US aren't really allowed to show people actually drinking the beer. It's a US law that people cannot actually be shown consuming an alcoholic beverage on television."},
    {fact: 'The world´s strongest beer is Brewmeister´s "Snake Venom“. While regular beer usually have about 5% ABV, this Scottish killer has a stomach-burning 67,5% ABV.'},
    {fact: 'The most beer-drinking country in the world is the Czech Republic. With an incredible per capita beer consumption of almost 40 gallons a year, the Czechs are way out in front in the beer drinking world league table.'},
    {fact: 'Old Vikings believed that in their heaven called Valhalla, there is a giant goat whose udders provided unlimited supply of beer.'},
    {fact: 'Cenosillicaphobia is the fear of an empty beer glass.'},
    {fact: "The world's largest beer festival is Oktoberfest. Held annually in Munich, Germany, it is a 16-day funfair running from late September to the first weekend in October with more than 6 million people from around the world attending the event every year."}
  ];

  var fact = beerFacts[Math.floor(Math.random() * beerFacts.length)].fact
  $('#beer-facts').append("<p>" + fact)

  function factRotation(i) {
    if(i < beerFacts.length) {
      setTimeout(function() {
        console.log(beerFacts[i])
        var newFact = $("<p>");
        $('#beer-facts').empty();
        $('#beer-facts').append(newFact);
        newFact.text(beerFacts[i].fact);
        factRotation(i + 1);
        if (i === 11) {
          i = 0
        };
      }, 3000);
    };
  };

  factRotation(Math.floor(Math.random() * beerFacts.length));

// =========================================================== //
// ====================== BEERMAPPING ======================== //
// =========================================================== //
  var userInput;
  
  $('#search-button').on('click', function(event) {
    userInput = $('#city-search').val().trim();
    $('#beer-table > tbody').empty();
    var queryUrl = 'https://thingproxy.freeboard.io/fetch/http://beermapping.com/webservice/loccity/E3b1372b6db3c5e549e795a11ed77331/' + userInput + '&s=json'
    $.ajax({
      url: queryUrl,
      method: 'GET',
      success: function(obj, textstatus) {
        if ($.fn.DataTable.isDataTable("#beer-table")) {
          $('#beer-table').DataTable().clear().destroy();
        }
        $('#beer-table').DataTable({
          data: obj,
          columns: [
            {data: 'id'},
            {data: 'name'},
            {data: 'status'},
            {data: 'reviewlink'},
            {data: 'proxylink'},
            {data: 'blogmap'},
            {data: 'street'},
            {data: 'city'},
            {data: 'state'},
            {data: 'zip'},
            {data: 'country'},
            {data: 'phone'},
            {data: 'url'},
            {data: 'overall'},
            {data: 'imagecount'}
          ],
          "columnDefs" : [
            {
              "targets": [0],
              "visible": false
            },{
              "targets": [2],
              "visible": false
            },{
              "targets": [3],
              "visible": false
            },{
              "targets": [4],
              "visible": false
            },{
              "targets": [5],
              "visible": false
            },{
              "targets": [10],
              "visible": false
            },{
              "targets": [11],
              "visible": false
            },{
              "targets": [12],
              "visible": false
            },{
              "targets": [13],
              "visible": false
            },{
              "targets": [14],
              "visible": false
            }
          ]
        })
      }
    }) 
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
