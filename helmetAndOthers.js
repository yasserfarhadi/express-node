const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          // "'unsafe-inline'",
          "'sha256-TrBCeJXTEgJl6ExIGdkUSJbG/RBVYrdIW4JJoPdCeg8='",
        ],
      },
    },
  })
);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/ajax', (req, res) => {
  console.log(req.ip);
  // res.send(JSON.stringify({ message: 'Hello' }));
  res.json('hello');
});

app.listen(5000, () => console.log('listening on 5000...'));
