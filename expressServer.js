const path = require('node:path');
const express = require('express');

const PORT = 5000;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  // res.send(`<h1>This isthe home page!</h1>`);
  res.sendFile(path.join(process.cwd(), 'public', 'node.html'));
});

app.all('*', (req, res) =>
  res.send('<h1>Sorry, this page does not exist</h1>')
);

app.listen(PORT, () => console.log('Server listening on port: ', PORT));
