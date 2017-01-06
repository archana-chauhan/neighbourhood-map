// Google Map Api Key
var googleMapApiKey = "AIzaSyD5WiGW6BKvKHDTK9eGQ-XpGly1xU6MgvA";

//Google map url
var googleMapsUrl = "https://maps.googleapis.com/maps/api/js?" +
                 "key="+googleMapApiKey;

$.getScript(googleMapsUrl)
    // If script loaded successfully calls initializeMap
    .done(function(){
      initializeMap();
    })
    // If script not loaded calls googleMapError
    .fail(function(){
      googleMapError();
});

var map;
var mapCanvas = document.getElementById('map');
var mapOptions = {
  center: {lat:28.6223126,lng:77.2783315},
  zoom:12
};

// initializeMap : function used to initialize the map to the DOM
function initializeMap(){
  map = new google.maps.Map(mapCanvas, mapOptions);
};

// googleMapError : function called when map is not loaded
function googleMapError(){
  console.log("error");
}


// View model
var viewModel = function(){
  var self = this;
  this.markerArray = ko.observableArray([]);
  this.searchQuery = ko.observable();
  this.placeImage = ko.observable();
  this.placeName = ko.observable();
  this.address = ko.observable();
  this.searchResult = ko.computed(function(){
    query = self.searchQuery();
    if(!query){
      showMarksOnMap();
      return places;
    }
  });
};








ko.applyBindings(viewModel);
