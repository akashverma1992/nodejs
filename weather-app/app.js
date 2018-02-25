console.log(`Starting app.`);

const request = require('request');
// console.log(request);

// params for a request
var options = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=shahadara%20delhi%20india#',
  json: true
};

function callback(error, response, body) {
  // console.log(body);
  console.log(JSON.stringify(body, undefined, 2));

}

// calling response
request(options, callback);
