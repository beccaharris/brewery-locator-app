$(document).ready(function () {
  console.log('ready!');
  var beerFacts = [
    { fact: 'Beer is made with hops!' },
    { fact: 'Your mamma has three titties: one for beer, one for water, and the third one says "OUT OF ORDER"' }
  ]
  console.log(beerFacts);
  // Append beerFacets to .beer-facts

  // Cycle through array on 30 second timer


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




