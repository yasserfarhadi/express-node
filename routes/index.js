const express = require('express');
const db = require('../database/db');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const query = 'SELECT * FROM city_weathers WHERE id > $1';
  const scaryDataFromInternet = 36;

  db.query(query, [scaryDataFromInternet], (err, dbResponse) => {
    console.log(dbResponse);
    res.json(dbResponse);
  });

  // pool.end();
});

router.get('/cities', function (req, res, next) {
  const query = 'SELECT * FROM city_weathers WHERE id <= $1';
  const scaryDataFromInternet = 36;

  db.query(query, [scaryDataFromInternet], (err, dbResponse) => {
    console.log(dbResponse);
    res.json(dbResponse);
  });

  // pool.end();
});

module.exports = router;
