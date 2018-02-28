const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, 'salt');

var verify = jwt.verify(token, 'salt');

console.log(token);
console.log(verify);