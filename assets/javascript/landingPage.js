var breweries = [
  { 
    breweryUrl: 'http://www.alpinedogbrewery.com',
    breweryName: 'Alpine Dog Brewery',
    breweryCityState: 'Denver, CO',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/alpinedog.png">',
  }, {
    breweryUrl: 'http://www.cerebralbrewing.com',
    breweryName: 'Cerebral Brewing',
    breweryCityState: 'Denver, CO',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/cerebral.jpg">',
  }, {
    breweryUrl: 'http://www.postbrewing.com',
    breweryName: 'The Post Brewing Co.',
    breweryCityState: 'Lafayette, CO',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/post.jpeg">',
  }, {
    breweryUrl: 'http://www.ratiobeerworks.com',
    breweryName: 'Ratio Beerworks',
    breweryCityState: 'Denver, CO',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/ratiobeerworks.png">',
  }
];

$(document).ready(function () {

  for (var i = 0; i < breweries.length; i++) {
    var eachBreweryImage = breweries[i].breweryImg;
    var eachBreweryName = breweries[i].breweryName;
    var eachBreweryUrl = breweries[i].breweryUrl;
    var newLink = $('<a>');
    newLink.attr('href', breweries[i].breweryUrl);
    
    var eachBreweryCitySt = breweries[i].breweryCityState;

    newListItemImg = $('<li>');
    
    $(newListItemImg).append(eachBreweryImage + '<br><a target="_blank" href="' + eachBreweryUrl + '">'  + eachBreweryName + '</a><br><p>' + eachBreweryCitySt);
    //$(newColumnImg).append(breweryNames[i])
    $('#brewery-picks').append(newListItemImg);

  }
}) 