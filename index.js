// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const requestIp = require('request-ip');
// inside middleware handler
var ipMiddleware = function(req, res, next) {
 const clientIp = requestIp.getClientIp(req); 
 next();
};
//As Connect Middleware
app.use(requestIp.mw())


app.get('/api/whoami', (req, res) => {
  // Get the IP address of the client
  var ipadress = req.clientIp;
  // Get the preferred language based on the "Accept-Language" header
  var language = req.acceptsLanguages();
  // Get the software information from the "User-Agent" header
  var software = req.get('User-Agent');
  
  // Send a JSON response with IP address, language, and software details
  res.json({
    ipadress: ipadress,
    language: language[0],
    software: software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
