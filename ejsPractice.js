const path = require('node:path');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'sha256-wYeib0H2Bbk7sB7A9wKtgGgIi3XpDVKpmH88FiY1uPY='"],
      },
    },
  })
);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function validateUser(req, res, next) {
  res.locals.validated = true;
  next();
}
app.use(validateUser);

app.get('/', (req, res, next) => {
  res.render('index', {
    msg: 'Success',
    html: '<div><img src="/images/1.jpg" /></div>',
  });
});

app.listen(5000, () => console.log('Listening on 5000...'));
