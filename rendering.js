const path = require('node:path');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.listen(5000, () => console.log('Listening on 5000...'));
