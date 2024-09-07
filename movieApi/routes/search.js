const express = require('express');
const router = express.Router();
const movies = require('../data/movies');
const people = require('../data/people');

function queryRequired(req, res, next) {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.status(400);
    res.json({ msg: 'Query is required.' });
  }
  next();
}

router.use(queryRequired);

router.get('/movie', (req, res) => {
  const searchTerm = req.query.query;

  const results = movies.filter((movie) => {
    return (
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm)
    );
  });

  res.json({ results });
});

router.get('/person', (req, res) => {
  const searchTerm = req.query.query;

  const results = people.filter((person) => {
    return person.name.includes(searchTerm);
  });

  res.json({ results });
});

module.exports = router;
