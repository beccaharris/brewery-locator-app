function initMapFromAPIResults(addressArray) {
    //test for geocode//
    function codeAddress() {
      var geocoder;
      for (var i=0; i < addressArray.length; i++){
        var contentString = '<div id="content">'+
        '<h5 id="breweryName">' + breweryNames[i] + '</h5>' +
        '<p id="firstHeading" class="firstHeading">' + addresses[i] + '</p>'+
        '<a target="_blank" href=https://maps.google.com?saddr=Current+Location&daddr=' + encodeURIComponent(addresses[i]) + '>Get Directions!</a>' +
        '</div>';
  
      infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
        geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': addressArray[i]}, function(results, status) {

          if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            })
            marker.addListener('click', function() {
              infoWindow.open(map, marker);
            });
          
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
  
      infoWindow = new google.maps.InfoWindow({
      });
  
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