var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var request = require('request');

var app = express();
app.use(express.static(__dirname + '/view'));

var MONGO_URI = "mongodb://" +
                process.env.DB_USER +
                ":" +
                process.env.DB_PASS +
                "@ds147451.mlab.com:47451/foodmaptv";

mongodb.MongoClient.connect(MONGO_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
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

app.post('/analyze', function(req, res) {

  var access_token = req.body.access;
  var songidList = req.body.songids;
  var names = req.body.names;
});
