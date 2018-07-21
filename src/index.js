var express = require('express');

var app = express();

app.use(express.static(__dirname + '/view'));

app.listen(process.env.PORT || 8000);
