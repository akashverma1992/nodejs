const request = require('request');

var geocodeAddress = (address, callback) => {
  // var encodedAddress = encodeURIComponent(address);

  var options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  };
  
  // calling request
  request(options, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google Servers.');
    } else if (response.body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (response.body.status === 'OK') {
      callback(undefined, {
        address: response.body.results[0].formatted_address,
        latitude: response.body.results[0].geometry.location.lat,
        longitude: response.body.results[0].geometry.location.lng
      });
    }
  });
};


module.exports = {
  geocodeAddress
};