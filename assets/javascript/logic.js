var addresses = [];

$(document).ready(function () {
  
  $('.active-map-div').hide();

  // =========================================================== //
  // ====================== BEER FACTS  ======================== //
  // =========================================================== //
  
  var beerFacts = [
    { fact: 'At any given time, 0.7% of the world is drunk. So, 50 million people are drunk right now.' },
    { fact: "The world's longest hangover lasted 4 weeks after a Scotsman consumed 60 pints of beer." },
    { fact: 'Steven Petrosino of New Cumberland, Pennsylvania downed 1 liter of beer (or 33 ounces) in a chilly 1.3 seconds in 1977, which made him a World Beer Chugging Champion according to the Guinness Book of World Records.' },
    { fact: 'Amsterdam pays alcoholics in beer. For cleaning the city streets, local alcoholics get 10 Euros, half a packet of rolling tobacco, and 5 beers as payment by a government-funded organization.' },
    { fact: 'In 1814, almost 400,000 gallons of beer flooded several streets in London after a huge vat ruptured in the parish of St. Giles.' },
    { fact: "Beer commercials in the U.S. aren't really allowed to show people actually drinking the beer. It's a US law that people cannot actually be shown consuming an alcoholic beverage on television." },
    { fact: 'The world´s strongest beer is Brewmeister´s "Snake Venom". While regular beer usually have about 5% ABV, this Scottish killer has a stomach-burning 67.5% ABV.' },
    { fact: 'The most beer-drinking country in the world is the Czech Republic. With an incredible per capita beer consumption of almost 40 gallons a year, the Czechs are way out in front in the beer drinking world league table.' },
    { fact: 'Old Vikings believed that in their heaven called Valhalla, there is a giant goat whose udders provided unlimited supply of beer.' },
    { fact: 'Cenosillicaphobia is the fear of an empty beer glass.' },
    { fact: "The world's largest beer festival is Oktoberfest. Held annually in Munich, Germany, it is a 16-day funfair running from late September to the first weekend in October with more than 6 million people from around the world attending the event every year." },
    { fact: "Craft Beer is good for your bones! Beer has high levels of silicon, which promotes strong bones." },
    { fact: "Frosty glasses will cause your beer to foam." },
    { fact: "The first professional brewers were women." },
    { fact: "According to a diary entry from a passenger on the Mayflower, the pilgrims made their landing at Plymouth Rock, rather than continue to their destination in Virginia, due to lack of beer." },
    { fact: 'Coined in the early 1900s, the word "alcoholiday" means leisure time spent drinking.' },
    { fact: "The Code of Hammurabi decreed that bartenders who watered down beer would be executed." },
    { fact: "J.K. Rowling invented Quidditch in a pub." }
  ];

  var fact = beerFacts[Math.floor(Math.random() * beerFacts.length)].fact
  $('#beer-facts').append("<p class='fact'>" + fact)

  function factRotation(i) {
    if (i < beerFacts.length) {
      setTimeout(function () {
        var newFact = $("<p>");
        newFact.addClass('fact');
        $('#beer-facts').empty();
        $('#beer-facts').append(newFact);
        newFact.text(beerFacts[i].fact);
        if (i === 17) {
          i = 0
        }
        factRotation(i + 1);
      }, 45000);
    };
  };

  factRotation(Math.floor(Math.random() * beerFacts.length));

  // =========================================================== //
  // ====================== BEERMAPPING API CALL================ //
  // =========================================================== //

  $('#search-button').on('click', function (event) {
    $('.active-map-div').show();
    $('.inactive-map-div').hide();
    var userInput = $('#city-search').val().trim();
    $('#beer-table > tbody').empty();
    var queryUrl = 'https://thingproxy.freeboard.io/fetch/http://beermapping.com/webservice/loccity/E3b1372b6db3c5e549e795a11ed77331/' + userInput + '&s=json'
    $.ajax({
      url: queryUrl,
      method: 'GET',
      success: function (obj, textstatus) {
        for (var i = 0; i < obj.length; i++) {
          var completeAddress = obj[i].street + ", " + obj[i].city + ", " + obj[i].state + " " + obj[i].zip;
          addresses.push(completeAddress)
        }
        console.log('obj', obj);
        //console.log('textStatus', textStatus);
        console.log('addresses', addresses);
      if (addresses.length > 11) { // Google API only allows 11 pins on a map at once
        addresses.length = 11;
      }
      initMapFromAPIResults(addresses);
        
        // console.log(addresses)
        if ($.fn.DataTable.isDataTable("#beer-table")) {
          $('#beer-table').DataTable().clear().destroy();
        }
        $('#beer-table').DataTable({
          responsive: true,
          data: obj,
          columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'status' },
            { data: 'reviewlink' },
            { data: 'proxylink' },
            { data: 'blogmap' },
            { data: 'street' },
            { data: 'city' },
            { data: 'state' },
            { data: 'zip' },
            { data: 'country' },
            { data: 'phone' },
            { data: 'url' },
            { data: 'overall' },
            { data: 'imagecount' }
          ],
          "columnDefs": [
            {
              "targets": [0],
              "visible": false
            }, {
              "targets": [2],
              "visible": false
            }, {
              "targets": [3],
              "visible": false
            }, {
              "targets": [4],
              "visible": false
            }, {
              "targets": [5],
              "visible": false
            }
            , {
              "targets": [9],
              "visible": false
            }, {
              "targets": [10],
              "visible": false
            }, {
              "targets": [11],
              "visible": false
            }, {
              "targets": [12],
              "visible": false
            }, {
              "targets": [13],
              "visible": false
            }, {
              "targets": [14],
              "visible": false
            }
          ]
        })
      }
    })
  })

  // ================================================= //
  // ====================== FIREBASE ================= //
  // ================================================= //

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
    var age = $("#age").val().trim();
    var comment = $("#comment").val().trim();

    $("#name").on("invalid.zf.abide", function (ev, el) {
      alert("Input field foo is invalid");
    });
    var newComment = {
      newName: name,
      newAge: age,
      newComment: comment
    };


    // Makes name, age, and comment into one object that gets pushed to firebase
    database.ref().push(newComment);

    $("#name").val("");
    $("#age").val("");
    $("#comment").val("");
  });

  // Using child added so that you can add multipe names, ages, and comments without overwriting them
  database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var name = childSnapshot.val().newName;
    var age = childSnapshot.val().newAge;
    var comment = childSnapshot.val().newComment;


    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function (snapshot) {
    });
    // Make sure this is in the on.click but outside the database.ref or it will append twice
    $('#input-comments > tbody').append(`<tr><td>${name}</td><td>${age}</td><td>${comment}</td></tr>`)
  });

  // Function that disables submit button
  function checkAge() {
    var age = $("#age").val().trim();
    if (age < 21 || age > 150) {
      $("#error").append("<b>Must be 21 or over or a reasonable age</b>");
      $('#submit').attr("disabled", true);
    }
    else {
      $("#error").empty();
      $('#submit').attr("disabled", false);
    }
  };

  // If age does not meet checkAge conditions, .blur run function checkAge
  $("#age").blur(function() {
    checkAge()});


  // ================================================= //
  // ================== ACCORDION LOGIC ============== //
  // ================================================= //

  function accordion() {
    $('.accordion-panel-title').on('click',function() {
      $('.accordion-panel-content').slideUp('slow');
      $(this).next('.accordion-panel-content').slideDown('slow');
    });
  } 
  accordion();

}) 