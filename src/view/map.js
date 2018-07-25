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
    places = shuffle(places);
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
        focusCard(cards, id, windows, map);
        focusWindow(marker, map);
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

function focusWindow(marker, map) {
  map.setZoom(14);
  var marker_pos = marker.getPosition();
  var bounds = map.getBounds();
  var lng_across = (bounds.b.b - bounds.b.f);
  var lat_across = (bounds.f.b - bounds.f.f);
  marker_pos = {lat: marker_pos.lat() - lat_across / 6, lng: marker_pos.lng()};

  // var small_bounds = map.getBounds();
  // var boundDiff = 0.5
  // var center_lng = (bounds.b.b + bounds.b.f) / 2;
  // var center_lat = (bounds.f.b + bounds.f.f) / 2;
  // console.log('center lng ', center_lng);
  // console.log('center lat ', center_lat);
  // small_bounds.b.b = (bounds.b.b + center_lng) / 2;
  // small_bounds.b.f = (bounds.b.f + center_lng) / 2;
  // small_bounds.f.b = (bounds.f.b + center_lat) / 2;
  // small_bounds.f.f = (bounds.f.f + center_lat) / 2;
  // console.log(small_bounds);
  // console.log("large bounds", bounds.contains(marker_pos));
  // console.log("small bounds", small_bounds.contains(marker_pos));

  if (map.getZoom() !== 14 || !bounds.contains(marker_pos)) {
    map.setCenter(marker_pos);
  }
  //  if (!small_bounds.contains(marker_pos) && bounds.contains(marker_pos)) {
  // }
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
  if (!isElementInViewport(card)) {
    card.scrollIntoView();
  }
}
function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    focusWindow(marker, map);
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
  var price = ""
  if (place['price'] !== "") {
    price = ', Price: ' + place['price'];
  }
  var card = '<div id="' + div_id + '" class="search-result card text-white bg-secondary mb-3">'
    +
    '      <div class="card-body">'
    +
    '        <h5 class="card-title">' + disp_id + '. ' + place['name'] + '</h5>'
    +
    '        <p class="card-text">Featured on ' + place['series_name'] + price + '</p>'
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
