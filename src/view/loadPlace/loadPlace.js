function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.0201613, lng: -118.2437},
    zoom: 10,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    var place = places[0];

    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    document.getElementById('address-info').innerHTML = place.formatted_address;
    document.getElementById('name-info').innerHTML = place.name;
    document.getElementById('rating-info').innerHTML = place.rating;
    document.getElementById('phone-info').innerHTML = place.formatted_phone_number;
    document.getElementById('url-info').innerHTML = place.url;
    document.getElementById('latitude-info').innerHTML = place.geometry.location.lat();
    document.getElementById('longitude-info').innerHTML = place.geometry.location.lng();

    var video = document.getElementById('video-input').value;
    console.log(video);

    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
}
