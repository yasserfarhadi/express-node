var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'hello from users' });

  // pool.end();
});
/* GET users listing. */

module.exports = router;
