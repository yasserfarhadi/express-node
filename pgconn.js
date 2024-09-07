const express = require('express');

const PoolClass = require('pg').Pool;
const app = express();

const pool = new PoolClass({
  user: 'postgres',
  host: 'localhost',
  database: 'weatherTiler_development',
  port: 5432,
  password: '',
});

app.get('/', (req, res) => {
  const query = 'SELECT * FROM city_weathers WHERE id > $1';
  const scaryDataFromInternet = 36;

  pool.query(query, [scaryDataFromInternet], (err, dbResponse) => {
    console.log(dbResponse);
    res.json(dbResponse);
  });

  pool.end();
});

app.listen(3000, () => console.log('Listening on 3000...'));
