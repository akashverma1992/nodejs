// packages
const yargs = require('yargs');
const axios = require('axios');

console.log(`Starting app.`);

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// axios
const status = ['OVER_QUERY_LIMIT', 'ZERO_RESULTS', 'ENOTFOUND'];
axios.get(geocodeUrl).then((response) => {
  if (response.data.status === status[0] || response.data.status === status[1]) {
    // console.log('Retry');
    throw new Error(status[status.indexOf(response.data.status)]);
  } else if (response.data.status === 'OK') {
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/b1f9c761a21d3fd7d9cf430b49aba3fb/${latitude},${longitude}`
    // console.log(`Success: `, response.data);
    console.log(`Success: ${response.data.results[0].formatted_address}`);
    // promise chianing
    return axios.get(weatherUrl)
  }
}).then((response) => {
  console.log(`Temperature: ${response.data.currently.temperature}`);
  console.log(`Apparent Temperature: ${response.data.currently.apparentTemperature}`);
}).catch((error) => {
  if (error.code === status[2]) {
    console.log('Unable to connect to Google Servers.');
  }
  console.log(`${error}`);
});
