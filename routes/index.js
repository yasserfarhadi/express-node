const express = require('express');
const mysqldb = require('../db/mysqlConn');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const dataFromTheScaryIntenet = 3;
  mysqldb.query(
    'SELECT * FROM tasks WHERE id > ?',
    [dataFromTheScaryIntenet],
    function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
      res.json(results[0].solution);
    }
  );
});

router.get('/cities', function (req, res, next) {
  mysqldb.query('SELECT 4 + 4 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    res.json(results[0].solution);
  });
});

module.exports = router;
