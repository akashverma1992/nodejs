/* Wrapping up a non-promise returning library into a promise. */

const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    var options = {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    };

    // calling request
    request(options, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google Servers.');
      } else if (response.body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (response.body.status === 'OK') {
        resolve({
          address: response.body.results[0].formatted_address,
          latitude: response.body.results[0].geometry.location.lat,
          longitude: response.body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('110032').then((res) => {
  console.log(`Success: ${JSON.stringify(res, undefined, 2)}`);
}, (err) => {
  console.log(`Error: ${err}`);
});
