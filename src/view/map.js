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
    var places = data['places'];
    var windows = [];
    var markers = [];
    var cards = [];
    for (var i = 0; i < places.length; i++) {
      var place = places[i];
      var info_window_and_marker = renderPlace(place, map, i+1);
      windows.push(info_window_and_marker[0]);
      markers.push(info_window_and_marker[1]);
      cards.push(renderSearchCard(place, i))
    }
    cards.map((card, id) => {
      card.addEventListener("click", function(){
        var info_window = windows[id];
        var marker = markers[id];
        info_window.open(map, marker);
        map.setZoom(14);
        map.setCenter(marker.getPosition());
        focusCard(cards, id, windows, map);
      });
    })
    markers.map((marker, id) => {
      marker.addListener('click', function() {
        focusCard(cards, id, windows, map);
      })
    })
    map.addListener('click', function() {
      windows.map((info_window) => {
        info_window.close(map);
      })
    });
  });
}

function focusCard(cards, id, windows, map) {
  cards.map((card, id) => {
    var card = document.getElementById('search-result-' + id);
    if (card.classList.contains('bg-primary')) {
      card.classList.remove('bg-primary');
      card.classList.add('bg-secondary');
    }
  });
  var card = document.getElementById('search-result-' + id);
  card.classList.remove('bg-secondary');
  card.classList.add('bg-primary');
  windows.map((info_window, win_id) => {
    if (win_id !== id) {
      info_window.close(map);
    }
  });
}

function renderPlace(place, map, id) {
  // Add info window
  var location = {lat: parseFloat(place['latitude']), lng: parseFloat(place['longitude'])};
  var contentString = getInfoWindowContent(place);
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    label: String(id)
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
    map.setZoom(14);
    map.setCenter(marker.getPosition());
  });

  return [infowindow, marker];
}

function getInfoWindowContent(place) {
  video_url = place['video_url'].replace("https://youtu.be/", "https://www.youtube.com/embed/");
  video_url = video_url.replace("t=", "start=");
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
        '    <a href="' + place['url'] + '" class="site-button btn btn-primary" style="float: right; margin-top: -50px">More Info</a>'
        +
        '  </div>'
        +
        '</div';
}

function renderSearchCard(place, id) {
  var div_id = 'search-result-' + id;
  var disp_id = id + 1;
  var card = '<div id="' + div_id + '" class="search-result card text-white bg-secondary mb-3">'
    +
    '      <div class="card-body">'
    +
    '        <h5 class="card-title">' + disp_id + '. ' + place['name'] + '</h5>'
    +
    '        <p class="card-text">Featured on ' + place['series_name'] + ', Price: ' + place['price'] + '</p>'
    +
    '        <p class="card-text">' + place['tags'] +'</p>'
    +
    '      </div>'
    +
    '    </div';
  var card_div = document.createElement('div');
  card_div.innerHTML = card.trim();
  document.getElementById('search-result-list').appendChild(card_div);
  return card_div;
}
