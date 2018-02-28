const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// METHODS on UserSchema
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'salt').toString();

  user.tokens.push({access, token});

  user.save()
      .then(() => {
        return token;
      });
};

// Model: 'Class used to construct documents'
// compiling schema into model
var Users = mongoose.model('Users', UserSchema);

module.exports = {
  Users
};