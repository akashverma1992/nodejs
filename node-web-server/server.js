const express = require('express');

// hbs helpers
const helpers = require('./helpers/helpers');

// handlebars {{}}
const hbs = require('hbs');

// handlebars partials
hbs.registerPartials(__dirname + '/views/partials/');

const app = express();


const fs = require('fs');
// middleware function
var myLogger = (req, res, next) => {
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
  fs.readFile('logs.json', 'UTF-8', (err, data) => {
    if (err) throw err;
    var lastIndexOfSqrBkt = data.lastIndexOf('}');
    console.log(lastIndexOfSqrBkt-1);
    /* fs.appendFile('logs.json', ',' + logObj, {del: ']'}, 'UTF-8', (err) => {
      if (err) throw err;
    }) */
  });
// console.log(fileData);
/* fs.appendFile('logs.json', '\n' + data, 'UTF-8', (err) => {
  if(err) throw err;
}) */
next();
};

// calling logger function
app.use(myLogger);

app.set('view engine', 'hbs');

// middleware for routing
app.use(express.static(__dirname + '/public'));

// GET method route to respond with 'hello world'
app.get('/', (req, res, next) => {
  // header
  res.setHeader('Access-Control-Allow-Origin', '*')
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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});