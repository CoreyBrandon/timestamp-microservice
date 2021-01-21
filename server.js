// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Timestamp-Microservice Project 
app.get("/api/timestamp", function(req, res) {
  const now = new Date()
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});

app.get("/api/timestamp/:date_string", function(req, res) {
  let date_string = req.params.date_string;

  if (parseInt(date_string) > 10000) {
    let unixTimeStamp = new Date(parseInt(date_string));
    res.json({
      "unix": unixTimeStamp.getTime(),
      "utc": unixTimeStamp.toUTCString()
    });
  }

  let paramValue = new Date(date_string);

  if (paramValue == "Invalid Date") {
    res.json({"error" : "Invalid Date" });
  } else {
    res.json({
      "unix": paramValue.getTime(),
      "utc": paramValue.toUTCString()
    })
  }
});



// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});