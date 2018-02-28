// mongodb ORM
const mongoose = require('mongoose');

// Setting mongoose.Promise to NodeJs.Global.Promise
// mongoose.Promise = global.Promise;

// const url = "mongodb://localhost:27017/TodoApp";
const url = "mongodb://aakash:1234@ds251598.mlab.com:51598/todo-app"
const callback = (err, client) => {
  if(err) {
    return console.log(err);
  }
  console.log('Connected');
};

mongoose.connect(url, {keepAlive: 15000, useMongoClient: true}, callback);

module.exports = {
  mongoose
};
