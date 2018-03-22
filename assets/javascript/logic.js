$(document).ready(function() {
  var beerFacts = [
    {fact: 'Beer is made with hops!'},
    {fact: 'Your mamma has three titties: one for milk, one for beer, and the third one says "OUT OF ORDER"'}
  ];
  // Append beerFacets to .beer-facts
  beerFacts.forEach(fact => {
    // Append one fact for 30 seconds
    
  });

  function factRotation(i) {
    if(i < beerFacts.length) {
      setTimeout(function() {
        console.log(beerFacts[i])
        var newFact = $("<p>");
        $('#beer-facts').empty();
        $('#beer-facts').append(newFact);
        newFact.text(beerFacts[i].fact);
        factRotation(i + 1);
      }, 3000);
    }
  }

  factRotation(0);
  
  // for (let i = 0; i < beerFacts.length; i++) {
  //   setDelay(i)
  // };

  // function setDelay(whichIndex) {
  //   setTimeout(() => {
  //     console.log(beerFacts[whichIndex])
  //     var newFact = $("<p>")
  //     $('#beer-facts').append(newFact);
  //     newFact.text(beerFacts[whichIndex].fact);
  //   }, 3000);

  // }
  // $('#beer-facts').remove();

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
});