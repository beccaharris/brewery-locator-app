$(document).ready(function() {
  console.log( 'ready!' );
  var beerFacts = [
    {fact: 'Beer is made with hops!'},
    {fact: 'You mamma has three titties: one for milk, one for water, and the third one says "OUT OF ORDER"'}
  ]
  console.log(beerFacts);
  // Append beerFacets to .beer-facts

  // Cycle through array on 30 second timer
  });

  var userInput;
  $('#search-button').on('click', function(event) {
    userInput = $('#zip-code').val().trim();
    console.log(userInput)
    var queryUrl = 'https://cors-anywhere.herokuapp.com/http://beermapping.com/webservice/loccity/E3b1372b6db3c5e549e795a11ed77331/' + userInput
  $.ajax({
    url: queryUrl,
    method: 'GET'
  }).done(function(beer) {
    var beerList = beer.data;
    console.log(queryUrl)
    console.log(beer)
  })
});
