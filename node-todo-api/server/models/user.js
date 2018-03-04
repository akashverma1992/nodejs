const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const jsjoda = require('js-joda');
const bcrypt = require('bcrypt');

// Schema
var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// toJson Overload
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// METHODS on UserSchema
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var jwtPayLoad = {
    _id: user._id.toHexString,
    iss: 'express',
    access
  };
  var token = jwt
    .sign(jwtPayLoad, 'salt')
    .toString();

  user
    .tokens
    .push({access, token});

  return user
    .save()
    .then(() => {
      return token;
    });
};

// find user by token static methods exist directly on model
UserSchema.statics.findByToken = function (token) {
  var User = this;
  console.log(User);
  var decoded;
  try {
    decoded = jwt.verify(token, 'salt');
    // console.log(decoded);
  } catch (exp) {
    return Promise.reject();
  }
  return User.findOne({
    // '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

// MIDDELWARE: hashing passwords
UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt
      .genSalt(10)
      .then((salt) => {
        bcrypt
          .hash(user.password, salt)
          .then((hash) => {
            user.password = hash;
            next();
          });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    next();
  }
});

// Model: 'Class used to construct documents' compiling schema into model
var Users = mongoose.model('Users', UserSchema);

module.exports = {
  Users
};
