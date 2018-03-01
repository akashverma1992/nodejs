var {Users} = require('./../models/user');

// Middelware: Authenticate
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  // console.log(req.headers);
  // console.log(token);
  Users.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {
  authenticate
};