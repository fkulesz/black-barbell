var express = require("express");
var bodyParser = require("body-parser");
var db = require('./api/config/db');
var ticketRoutes = require('./api/routes/tickets');
var contactRoutes = require('./api/routes/contacts');

var app = express();

app.use(bodyParser.json());
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

db.on('error', function (err){
  console.error.bind(console, "MongoDB error: ");
  process.exit(1);
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.use('/', ticketRoutes);
app.use('/', contactRoutes);