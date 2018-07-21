// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

function initMap() {
  var uluru = {lat: 34.1148389, lng: -118.3683995};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: uluru
  });
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Rose. Rabbit. Lie.</h1>'+
      '<div id="bodyContent">'+
      'Worth It season 2 episode 3 Tacos $$$ '+ '<br/>' + '<br/>' +
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+ '<iframe width="560" height="315" src="https://www.youtube.com/embed/DWq_sSSWWSI?start=72" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    title: 'Rose. Rabbit. Lie.'
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
    map.setZoom(10);
    map.setCenter(marker.getPosition());
  });

  var guis = {lat: 34.1148389, lng: -118.3683995};
  var contentString2 = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Guisados</h1>'+
      '<div id="bodyContent">'+
      '<h4> Worth It Season 2 Episode 3 Tacos $$ </h4>' +
      '<p> Foodies flock to this simple Mexican joint for housemade tortillas stuffed with slow-braised meats. </p>' +
      '<p> Rating 4.4 / 5 </p>' +
      '<p> Address: 2100 East Cesar E Chavez Avenue, Los Angeles, CA 90033' +
      '</div>'+ '<iframe width="560" height="315" src="https://www.youtube.com/embed/DWq_sSSWWSI?start=281" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
      '</div>';
  var infowindow2 = new google.maps.InfoWindow({
    content: contentString2
  });

  var marker2 = new google.maps.Marker({
    position: guis,
    map: map,
    title: 'Guisados'
  });

  marker2.addListener('click', function() {
    infowindow2.open(map, marker2);
    map.setZoom(10);
    map.setCenter(marker2.getPosition());
  });

  var guis2 = {lat: 33.9911127, lng: -118.5133336};

  var marker3 = new google.maps.Marker({
    position: guis2,
    map: map,
    title: 'Leos Taco Truck'
  });

  map.addListener('click', function() {
		    infowindow2.close(map);
		    infowindow.close(map);
        });
}
