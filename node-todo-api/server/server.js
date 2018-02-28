// require('./config/config');

const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash');
// const { ObjectID } = require('mongodb');

// mongodb ORM
const { mongoose } = require('./db/config');

// app User Model
var { Users } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

// body-parser
app.use(bodyparser.json());

// POST /users
app.post('/users', (req, res) => {
  // {} from which {document} will be constructed.
  var body = _.pick(req.body, ["email", "password"]);

  // constructing {document} from model 'class'
  var users = new Users(body);
  // console.log(users);

  //users.save().then((userDocument) => {
  users.save().then(() => {  
    return users.generateAuthToken();
    // res.send(userDocument);
  }).then((token) => {
    // res.send(user);
    res.header('x-auth', token).send(users);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});