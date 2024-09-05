const express = require('express');

const app = express();

function validateUser(req, res, next) {
  res.locals.validated = true;
  console.log('ValidateUser RAN');
  next();
}

app.use('/admin', validateUser);

app.get('/', (req, res, next) => {
  console.log(res.locals.validated);
  res.send('<h1>Main page</h1>');
});

app.get('/admin', (req, res, next) => {
  console.log(res.locals.validated);
  res.send('<h1>Admin page</h1>');
});

app.listen(5000, () => console.log('App listening on port 5000...'));
