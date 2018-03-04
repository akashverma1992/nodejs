const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash');
const bcrypt = require('bcrypt');

// local modules mongodb ORM
const {mongoose} = require('./db/config');

// app User Model
var {Users} = require('./models/user');

// Middelware: Authenticate
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

// body-parser
app.use(bodyparser.json());

// GET '/'
app.get('/', (req, res, next) => {
  // console.log(req);
  res
    .status(200)
    .send();
  next();
});

// POST /users
app.post('/users', (req, res) => {
  // {} from which {document} will be constructed.
  var body = _.pick(req.body, ["email", "password"]);

  // constructing {document} from model 'class'
  var users = new Users(body);
  // console.log(users);

  users
    .save()
    .then(() => {
      return users.generateAuthToken();
    })
    .then((token) => {
      res
        .header('x-auth', token)
        .send(users);
    })
    .catch((err) => {
      res
        .status(400)
        .send(err);
    });
});

// Grabbing Token
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login body: {email, password}
app.post('/users/login', (req, res, next) => {
  var body = _.pick(req.body, ['email', 'password']);
  Users
    .findByCredentials(body.email, body.password)
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res
        .status(400)
        .send();
    });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
