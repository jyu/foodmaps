document.getElementById("submit-button").addEventListener("click", function(){
  // Check a search was done before submit
  if (document.getElementById('name-info').innerHTML === "") {
    return;
  }
  $.post({
         url: '/loadPlace',
         data: {
           'name': document.getElementById('name-info').innerHTML,
           'address': document.getElementById('address-info').innerHTML,
           'rating': document.getElementById('name-info').innerHTML,
           'phone': document.getElementById('phone-info').innerHTML,
           'url': document.getElementById('url-info').innerHTML,
           'latitude': document.getElementById('latitude-info').innerHTML,
           'longitude': document.getElementById('longitude-info').innerHTML,
           'video_url': document.getElementById('video-input').value,
           'series_name': document.getElementById('series-input').value,
           'price': document.getElementById('price-input').value,
           'tags': document.getElementById('tags-input').value
         }
       }).done(function(data) {
      document.getElementById('address-info').innerHTML = "";
      document.getElementById('name-info').innerHTML = "";
      document.getElementById('rating-info').innerHTML = "";
      document.getElementById('phone-info').innerHTML = "";
      document.getElementById('url-info').innerHTML = "";
      document.getElementById('latitude-info').innerHTML = "";
      document.getElementById('longitude-info').innerHTML = "";
      document.getElementById('video-input').value = "";
      document.getElementById('series-input').value = "";
      document.getElementById('price-input').value = "";
      document.getElementById('tags-input').value = "";
      document.getElementById('pac-input').value = "";
      if (data.success == 1) {
        document.getElementById('added').innerHTML = "Added";
      }
  });
});

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
    document.getElementById('added').innerHTML = "";

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
