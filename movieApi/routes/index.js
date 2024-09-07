const express = require('express');
const router = express.Router();

const movies = require('../data/movies');

// router.get('/', function (req, res, next) {
//   res.json('index', { title: 'Express' });
// });

router.get('/most_popular', (req, res) => {
  const page = +req.query.page || 1;

  const results = movies.filter((movie) => movie.most_popular);
  res.json({ results: results.slice((page - 1) * 10, page * 10), page });
});

module.exports = router;
