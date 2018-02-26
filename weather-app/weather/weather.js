const request = require('request');

var forecastWeather = (latitude, longitude, callback) => {
  var options = {
    url: `https://api.darksky.net/forecast/b1f9c761a21d3fd7d9cf430b49aba3fb/${latitude},${longitude}`,
    json: true
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports = {
  forecastWeather
};

// forecast api template
// key: b1f9c761a21d3fd7d9cf430b49aba3fb
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]

/* const fs = require('fs');

const forecastData = JSON.parse(fs.readFileSync('./geocode/forecast.json', 'UTF-8', (err, data) => {
  if (err) throw err;
  return data;
}));

console.log(`Forecast.temperature: ${forecastData.currently.temperature}`); */
