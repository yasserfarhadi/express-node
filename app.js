const fs = require('node:fs');
const https = require('node:https');
const express = require('express');

const app = express();

const key = fs.readFileSync('./cert/cert.key');
const cert = fs.readFileSync('./cert/cert.crt');

const secureExpressServer = https.createServer(
  {
    key,
    cert,
  },
  app
);

app.get('/test', (req, res) => {
  res.json({ msg: 'Hello' });
});

secureExpressServer.listen(3000, () => console.log('Listening on 3000...'));
