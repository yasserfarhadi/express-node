const express = require('express');
const router = express.Router();
const passport = require('passport');

// const apiKey = 'API KEY FROM TMDB';
const apiKey = 'f7fcd22700b0a38c5343dd3cb662d2d4';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.get('/', async function (req, res, next) {
  console.log(req.user);
  try {
    const response = await fetch(nowPlayingUrl, {
      method: 'GET',
    });
    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Unexpected content-type: ${contentType}`);
    }
    const data = await response.json();
    res.render('index', { data: data.results });
  } catch (err) {
    console.log(err);
    res.render('error', { message: err.message });
  }
});

router.get('/movie/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const movieUrl = `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
    if (!id) throw new Error('No id provided');
    const response = await fetch(movieUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Unexpected content-type');
    }
    const data = await response.json();
    res.render('single-movie', { data });
  } catch (err) {
    res.render('error', { message: err?.message || 'Unexpected Error' });
  }
});

router.get('/login', passport.authenticate('github'));

router.get(
  '/auth',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/loginFailure',
  })
);

router.post('/search', async (req, res) => {
  try {
    const searchTerm = encodeURI(req.body.movieSearch);
    const category = req.body.cat;
    if (!searchTerm || !category) {
      res.redirect('/');
      return;
    }

    console.log(searchTerm, category);
    const searchUrl = `${apiBaseUrl}/search/${category}?query=${searchTerm}&api_key=${apiKey}`;

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Unexpected content-type');
    }

    const data = await response.json();

    let results = data.results;
    if (category === 'person') {
      results = [];
      data.results.forEach((result) => {
        result.known_for.forEach((item) => results.push(item));
      });
    }

    res.render('index', {
      data: results,
    });
  } catch (err) {
    res.render('error', err?.message || 'Server Error');
  }
});

module.exports = router;
