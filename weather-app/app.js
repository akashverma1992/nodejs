const request = require('request');
const yargs = require('yargs');

console.log(`Starting app.`);
// console.log(request);

// params for a request
var argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log(`Entered Address: ${argv.a}`);

var encodedAddress = encodeURIComponent(argv.a);
// console.log(`EncodedURL: ${encodedAddress}`);

/*var options = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=street%204%20east%20rohtash%20nagar%20shahadara%20delhi%20india#',
  json: true
};*/

var options = {
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
};

function callback(error, response, body) {
  // console.log(JSON.stringify(body, undefined, 2));
  console.log(`Location: ${response.body.results[0].formatted_address}`);
  console.log(`Latitude: ${response.body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${response.body.results[0].geometry.location.lng}`);
}

// calling request
request(options, callback);
