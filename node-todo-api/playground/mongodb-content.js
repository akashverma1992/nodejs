// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to Connect to mongodb db');
  }
  console.log('Connected to mongodb db');
  const db = client.db('TodoApp');

  // insert data into TodoApp
  /* db.collection('Todos').insertOne(
    {
      text: 'something to do',
      completed: false
    },
    (err, result) => {
      if (err) {
        return console.log('unable to insert todo', err);
      }
      console.log(JSON.stringify(result.ops, undefined, 2));
    }); */

    //insert a new doc into users
    db.collection('Users').insertOne(
      {
        name: 'aakash',
        age: '25',
        location: 'india'
      },
      (err, result) => {
        if (err) {
          return console.log('unable to insert into todo', err);
        } 
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
      });

  client.close();
});
