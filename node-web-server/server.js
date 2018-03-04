// heroku env.port number
const port = process.env.PORT || 3000;

const express = require('express');

// hbs helpers
const helpers = require('./helpers/helpers');

// handlebars {{}}
const hbs = require('hbs');

// handlebars partials
hbs.registerPartials(__dirname + '/views/partials/');

const app = express();


const fs = require('fs');

// GET method route to respond with 'maintenance page'
/* app.use((req, res, next) => {
  res.render('maintenance.hbs');
}); */

// middleware logger function
app.use((req, res, next) => {
  var now = new Date().toString();
  var logObj = JSON.stringify({
    time: now,
    method: req.method,
    url: req.url
  });
  console.log(logObj);
  /* fs.readFile('logs.json', 'UTF-8', (err, data) => {
    if (err) throw err;
    var lastIndexOfSqrBkt = data.lastIndexOf(']');
    var i = 0;
    while (i) {
      if (data.charAt(i) === lastIndexOfSqrBkt) {
        fs.appendFile('logs.json', ',' + logObj, 'UTF-8', (err) => {
          if (err) throw err;
        })
      }
      i++;
    }
  }); */
next();
});

// app custom view engine
app.set('view engine', 'hbs');

// middleware for routing
app.use(express.static(__dirname + '/public'));

// GET method route to respond with 'hello world'
app.get('/', (req, res, next) => {
  // header
  res.setHeader('Access-Control-Allow-Origin', '*');
  // body
  // res.send('<h1>Hello World!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page'
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res, next) => {
  // header
  res.setHeader('Access-Control-Allow-Origin', '*')
  // body
  res.render('about.hbs', {
    pageTitle: 'About Page'
    // currentYear: new Date().getFullYear()
  });
});

// bad request
app.get('/bad', (req, res, next) => {
  // res.sendStatus(400);
  res.send({ errorMessage: 'bad request', code: 400 });
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});