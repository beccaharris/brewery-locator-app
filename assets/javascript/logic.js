$(document).ready(function () {
  console.log('ready!');
  var beerFacts = [
    { fact: 'Beer is made with hops!' },
    { fact: 'Your mamma has three titties: one for beer, one for water, and the third one says "OUT OF ORDER"' }
  ]
  console.log(beerFacts);
  // Append beerFacets to .beer-facts

  // Cycle through array on 30 second timer


  var array1 = []
  var array2 = []
  var array3 = []

  var userInput;
  $('#search-button').on('click', function (event) {
    userInput = $('#city-search').val().trim();
    $('#beer-table > tbody').empty();
    $('#pagination').empty();
    console.log(userInput)
    var queryUrl = 'https://thingproxy.freeboard.io/fetch/http://beermapping.com/webservice/loccity/E3b1372b6db3c5e549e795a11ed77331/' + userInput + '&s=json'
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).done(function (beer) {
      var beerList = beer;
      console.log(beer.length);
      console.log(beerList);

      var arrayOfArrays = [];

      var numberOf10ElementArrays = beerList.length / 10; // How many pages of 10 items you can get from the response

      for (let i = 0; i < numberOf10ElementArrays; i++) {
        let array = [];
        console.log('-----------------------------')
        for (let j = 0; j < 10; j++) {
          console.log(beerList[j]);
          if (beerList[j]) {
            array.push(beerList[j]);
            beerList.splice(j, 1);
          }
        }
        arrayOfArrays.push(array);
      }

      console.log(arrayOfArrays);

      arrayOfArrays.forEach((array, index) => {
        var numIndicator = $(`<button class="pagination-btn" data-index=${index}>${index}</button>`);
       // want to empty the page divs // 
        $('#pagination').append(numIndicator);
      });

      $('#pagination').on('click', '.pagination-btn', function () {
        var whichButton = ($(this).data('index'));
        console.log(arrayOfArrays[whichButton]);
        $('#beer-table > tbody').empty();
        arrayOfArrays[whichButton].forEach(function (brewery) {
          $('#beer-table > tbody').append(
            '<tr>' +
            '<td><a class="map-me">Map Me!' +
            '<td>' + brewery.name + '</td>' +
            '<td>' + brewery.street + '</td>' +
            '<td>' + brewery.city + '</td>' +
            '<td>' + brewery.state + '</td>' +
            '<tr>'
          );
        });
      });


      arrayOfArrays[0].forEach(brewery => {
        $('#beer-table > tbody').append(
          '<tr>' +
          '<td><a class="map-me">Map Me!' +
          '<td>' + brewery.name + '</td>' +
          '<td>' + brewery.street + '</td>' +
          '<td>' + brewery.city + '</td>' +
          '<td>' + brewery.state + '</td>' +
          '<tr>'
        );
      })
    })
  });
});


