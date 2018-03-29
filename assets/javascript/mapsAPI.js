function initMapFromAPIResults(addressArray) {
console.log(addressArray);
  //test for geocode//
  function codeAddress() {
    var geocoder;
    for (var i=0; i < addressArray.length; i++){
      console.log(addressArray[i]);
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': addressArray[i]}, function(results, status) {
        console.log(results);
        console.log(status);
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          })
         console.log(results);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }


  }
  var map, infoWindow;
  
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 10
    });
    
    infoWindow = new google.maps.InfoWindow;

  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  } 
  initMap();
  codeAddress();
}