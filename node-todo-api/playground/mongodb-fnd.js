const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to Connect to mongodb db');
  }
  console.log('Connected to mongodb db');
  const db = client.db('TodoApp');

  db.collection('Todos')
    .find()
    .toArray().then((docs) => {
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unabel to fetch todos', err);
    })

  client.close();
});
