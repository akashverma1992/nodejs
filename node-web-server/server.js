const express = require('express');

var app = express();

// GET method route to respond with 'hello world'
app.get('/', (req, res) => {
  res.send('Hello World!');
});
