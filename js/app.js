var map;

this.marker;
function initMap(){
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: 28.60172901103076, lng: 77.22937578649113},
    zoom: 13
  });

  infoWindow = new google.maps.InfoWindow();
  for(var i=0;i<placesData.length;i++){
    addMarker(placesData[i]);
  }
}

function addMarker(place){
  var coordinate = {
    lat: place.location.lat,
    lng: place.location.lng
  };
  self.marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: coordinate
  });

  if(self.marker){
    self.markerArray().push([coordinate, self.marker]);
    google.maps.event.addListener(marker, 'click', function(){
      stopAnimation();
      startAnimation(coordinate);
      // fourSquareDataDisplay(place);
    });
  }
}

function removeMarker(){
  for(var i=0; i<self.markerArray().length; i++){
    self.markerArray()[i][1].setMap(null);
  }
}

function showMarker(){
  for(var i=0; i<self.markerArray().length; i++){
    self.markerArray()[i][1].setMap(map);
  }
}

function startAnimation(coordinate){
  ko.computed(function(){
    ko.utils.arrayForEach(self.markerArray(), function(m){
      if(coordinate.lat === m[0].lat && coordinate.lng === m[0].lng){
        m[1].setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  });
}

function stopAnimation(){
  for(var i=0; i<self.markerArray().length; i++){
    self.markerArray()[i][1].setAnimation(null);
  }
}

var viewModel = function(){
  var self = this;
  this.markerArray = ko.observableArray([]);
  this.searchQuery = ko.observable();

  this.place_image = ko.observable();
  this.place_name = ko.observable();

  this.searchResult = ko.computed(function(){
    query = self.searchQuery();
    if(!query){
      showMarker();
      return placesData;
    }else{
      removeMarker();
      return ko.utils.arrayFilter(placesData, function(place){
        if(place.name.toLowerCase().indexOf(query) >= 0){
          addMarker(place);
          return place;
        }
      });
    }
  });

  this.viewPlaceOnMap = function(place){
    var coordinate = {lat: place.location.lat, lng: place.location.lng};
    stopAnimation();
    startAnimation(coordinate);
  };

}

// Applying bindings of view with model
ko.applyBindings(viewModel);
