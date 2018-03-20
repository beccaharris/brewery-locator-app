$(document).ready(function() {

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

  })
  

})