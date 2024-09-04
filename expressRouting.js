const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  res.send('<h1>Welcome to the home GET page!</h1>');
});
app.post('/', (req, res) => {
  console.log(req);
  res.send('<h1>Welcome to the home POST page!</h1>');
});

app.listen(5000, () => console.log('Server listening on port: ', 5000));
