const express = require('express');

const app = express();

const { MongoClient } = require('mongodb');

const mongoUrl = 'mongo://localhost:27017';

let db;

MongoClient.connect(mongoUrl, (err, databaseConn) => {
  db = databaseConn.db('electricOrNot');
});

app.get('/', (req, res) => {
  db.collection('cars')
    .find({})
    .toArray((queryError, carResults) => {
      console.log(carResults);
      res.json(carResults);
    });
});

app.listen(3000, () => console.log('Listening to 3000...'));
