const express = require('express');
const router = express.Router();
const movieDetails = require('../data/movieDetails');

function requireJSON(req, res, next) {
  // const contentType = req.headers.get('content-type'); OR
  // const contentType = req.get('content-type');
  // if (!contentType || !contentType.includes('application/json')) { OR
  if (!req.is('application/json')) {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Unexpected content-type');
    return;
  }

  next();
}

router.param('movieId', (req, res, next) => {
  // if only certain apikeys are allowed to hit movieId
  // update the db with analytics data
  console.log('Someone hit a route that used the movieId wildcard');
  next();
});

router.get('/top_rated', (req, res, next) => {
  const page = req.query.page || 1;
  try {
    const sortedMovies = movieDetails.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    res.json(sortedMovies.slice((page - 1) * 20, page * 20));
  } catch (err) {
    res.status(500);
    res.set('Content-Type', 'text/plain');
    res.send('Server Error');
  }
});

router.get('/:movieId', function (req, res, next) {
  const id = +req.params.movieId;

  if (!id) {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('No Id provided');
    return;
  }

  const result = movieDetails.find((movie) => +movie.id === id);

  if (result) {
    res.json({
      ...result,
      production_companies: result.production_companies || [],
    });
  } else {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Movie not found');
  }
});

router.post('/:movieId/rating', requireJSON, (req, res) => {
  const id = +req.params.movieId;

  if (!id) {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('No Id provided');
    return;
  }

  const rating = +req.body.value;
  if (!rating) {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('No rating value provided');
    return;
  }

  if (rating < 0.5 || rating > 10) {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Rating must be between .5 and 10');
    return;
  }
  res.status(200);
  res.json({ msg: 'Thank you for submitting your rating.', status_code: 200 });
});

router.delete('/:movieId/rating', (req, res) => {
  res.status(201);
  res.json({ msg: 'Rating deleted!' });
});

module.exports = router;
