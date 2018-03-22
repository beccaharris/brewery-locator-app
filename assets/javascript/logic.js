$(document).ready(function() {
  console.log( 'ready!' );
  var beerFacts = [
    {fact: 'Beer is made with hops!'},
    {fact: 'Your mamma has three titties: one for beer, one for water, and the third one says "OUT OF ORDER"'}
  ]
  console.log(beerFacts);
  // Append beerFacets to .beer-facts

  // Cycle through array on 30 second timer


    var array1 = []
    var array2 = []
    var array3 = []

    var userInput;
    $('#search-button').on('click', function(event) {
      userInput = $('#city-search').val().trim();
      $('#beer-table > tbody').empty();
      console.log(userInput)
      var queryUrl = 'https://thingproxy.freeboard.io/fetch/http://beermapping.com/webservice/loccity/E3b1372b6db3c5e549e795a11ed77331/' + userInput + '&s=json'
      $.ajax({
        url: queryUrl,
        method: 'GET'
      }).done(function(beer) {
        console.log(queryUrl)
        var beerList = beer.data;
        console.log(beer)
        beer.forEach(function(brewery) {
          console.log(brewery.name, brewery.street, brewery.state, brewery.zip, brewery.phone);
          $('#beer-table > tbody').append(
            '<tr>' +
              '<td><a class="map-me">Map Me!' +
              '<td>' + brewery.name + '</td>' +
              '<td>' + brewery.street + '</td>' +
              '<td>' + brewery.city + '</td>' +
              '<td>' + brewery.state + '</td>' +
            '<tr>'
          )
        })
      })
    });
  });


