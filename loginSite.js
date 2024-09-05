const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  res.locals.msg =
    req.query.msg === 'fail'
      ? 'Sorry, This username and password combination does not exist'
      : req.query.msg === 'Unauthorized'
      ? 'Unauthorized, Try login first'
      : req.query.msg || '';
  next();
});

app.get('/', (req, res) => {
  res.send('Sanity check');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/process_login', (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if (password === 'x') {
    res.cookie('username', username);
    res.redirect('/welcome');
  } else {
    res.redirect('/login?msg=fail');
  }
});

app.get('/welcome', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.render('welcome', { username });
  } else {
    res.redirect('/login?msg=Unauthorized');
  }
});

app.get('/logout', (req, res) => {
  // res.cookie('username', '');
  res.clearCookie('username');
  res.redirect('/login');
});

app.param('storyId', (req, res, next, id) => {
  console.log('params:', id);
  next();
});

app.get('/story/:storyId', (req, res) => {
  res.send(`<h1>Story ${req.params.storyId}</h1>`);
});

app.get('/statement', (req, res) => {
  // res.header('Content-Disposition', 'attachment;filename="bbk-statements.png"');
  // res.sendFile(
  //   path.join(__dirname, 'userStatements', 'BankStatementChequing.png')
  // );

  res.download(
    path.join(__dirname, 'userStatements', 'BankStatementChequing.png'),
    'bbk-statement.png',
    (err) => {
      // res.headerSent is a boolean that mean headers already sent: DONT SENT ANYTHING ELSE
      if (!res.headersSent) {
        res.redirect('/download/error');
      }
    }
  );
});

app.listen(5000, () => console.log('Listening on 5000...'));
