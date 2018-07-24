// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

function initMap() {
  $.get({
    'url': '/getPlaces'
  }).done(function(data) {
    console.log(data);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.0201613, lng: -118.2437},
      zoom: 11,
    });
    var windows = data['places'].map(place => renderPlace(place, map));
    map.addListener('click', function() {
      for (var i = 0; i < windows.length; i++) {
        windows[i].close(map);
      }
    });
  });
}

function renderPlace(place, map) {
  var location = {lat: parseFloat(place['latitude']), lng: parseFloat(place['longitude'])};
  var contentString = getInfoWindowContent(place);
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: place['name']
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
    map.setZoom(14);
    map.setCenter(marker.getPosition());
  });

  return infowindow;
}

function getInfoWindowContent(place) {
  video_url = place['video_url'].replace("https://youtu.be/", "https://www.youtube.com/embed/");
  video_url = video_url.replace("t=", "start=");
  console.log(video_url)
  return '<div class="card">'
        +
        '  <iframe width="560" height="315" src="' + video_url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        +
        '  <div class="card-header" style="display: inline">'
        +
        '    <h5 class="card-title">' + place['name'] + '</h5>'
        +
        '    <p class="card-text">' + place['tags'] + '</p>'
        +
        '    <a href="' + place['url'] + '" class="site-button btn btn-primary" style="float: right; margin-top: -50px">Website</a>'
        +
        '  </div>'
        +
        '</div';
}
