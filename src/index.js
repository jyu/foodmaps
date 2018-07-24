var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/view'));

var MONGO_URI = "mongodb://" +
                process.env.DB_USER +
                ":" +
                process.env.DB_PASS +
                "@ds147451.mlab.com:47451/foodmaptv";

mongodb.MongoClient.connect(MONGO_URI, function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save client object from the callback for reuse.
    db = client.db("foodmaptv");
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
    });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

app.post('/loadPlace', function(req, res) {

  // TODO: code to check for duplicates
  // TODO: add a buffer before adding it to prod DB

  var place = new Object();
  // From google maps
  place.name = req.body.name;
  place.address = req.body.address;
  place.phone_number = req.body.phone;
  place.rating = req.body.rating;
  place.url = req.body.url;
  place.longitude = req.body.longitude;
  place.latitude = req.body.latitude;
  // From user input
  place.video_url = req.body.video_url;
  place.series_name = req.body.series_name;
  place.price = req.body.price;
  place.tags = req.body.tags;

  db.collection("places").insertOne(place, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new place.");
    } else {
      res.status(200).json({"success": 1});
    }
  });
});

app.get('/getPlaces', function(req, res) {
  // TODO: handle geospatial return of places
  db.collection("places").find({}, async function(err, docs_cursor) {
    if (err) {
      handleError(res, err.message, "Failed to create new mapping.");
    } else {
      var docs = docs_cursor.toArray();
      docs = await docs;
      res.status(200).json({"places": docs});
    }
  });
});
