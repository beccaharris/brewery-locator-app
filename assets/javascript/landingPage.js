var beerMemes = ['assets/images/memes/meme1.png', 'assets/images/memes/meme2.jpg', 'assets/images/memes/meme3.jpeg', 'assets/images/memes/meme4.jpeg', 'assets/images/memes/meme5.jpg', 'assets/images/memes/meme6.jpg', 'assets/images/memes/meme7.jpg', 'assets/images/memes/meme8.jpg']
var breweries = [
  { 
    //breweryName: '<a target="_blank" href="www.alpinedogbrewery.com">Alpine Dog Brewery</a>',
    breweryName: 'Alpine Dog Brewery',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/alpinedog.png">',
  }, {
    //breweryName: '<a target="_blank" href="www.cerebralbrewing.com">Cerebral Brewing</a>',
    breweryName: '<a target="_blank" href="www.cerebralbrewing.com">Cerebral Brewing</a>',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/cerebral.jpg">',
  }, {
    //breweryName: '<a target="_blank" href="www.drydockbrewing.com">Dry Dock Brewing Co.</a>',
    breweryName: '<a target="_blank" href="www.drydockbrewing.com">Dry Dock Brewing Co.</a>',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/drydock.jpg">',
  }, {
    //breweryName: '<a target="_blank" href="www.postbrewing.com">The Post Brewing Co.</a>',
    breweryName: '<a target="_blank" href="www.postbrewing.com">The Post Brewing Co.</a>',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/post.jpeg">',
  }, {
    //breweryName: '<a target="_blank" href="www.ratiobeerworks.com/">Ratio Beerworks</a>',
    breweryName: 'Ratio Beerworks',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/ratiobeerworks.png">',
  }, {
    //breweryName: '<a target="_blank" href="www.station26brewing.co">Station 26 Brewing Co.</a>',
    breweryName: 'Station 26 Brewing Co.',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/station26.png">',
  }, {
    //breweryName: '<a target="_blank" href="www.ursulabrewery.com">Ursula Brewery</a>',
    breweryName: 'Ursula Brewery',
    breweryImg: '<img class="brewery-image" src="assets/images/breweries/ursulabrew.jpg">',
  }
]

$(document).ready(function () {

  for (var i = 0; i < breweries.length; i++) {
    var eachBreweryImage = breweries[i].breweryImg
    newListItemImg = $('<li>')
    
    $(newListItemImg).append(eachBreweryImage);
    //$(newColumnImg).append(breweryNames[i])
    $('#brewery-picks').append(newListItemImg)

  }
  $('#memes').append('<img id="beer-meme" src="'+ beerMemes[(Math.floor(Math.random() * beerMemes.length))] + '">')
}) 