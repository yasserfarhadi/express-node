var express = require('express');
var router = express.Router();
const db = require('../database/db');

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
/* GET users listing. */

module.exports = router;
