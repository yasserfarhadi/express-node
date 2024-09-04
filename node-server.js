const http = require('node:http');
const fs = require('node:fs');
const url = require('node:url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl.pathname);
  if (parsedUrl.pathname === '/') {
    const file = fs.readFileSync('./node.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write(file);
    res.end();
  } else if (parsedUrl.pathname.startsWith('/images')) {
    const file = fs.readFileSync(`.${parsedUrl.pathname}`);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.write(file);
    res.end();
  } else if (parsedUrl.pathname.startsWith('/styles.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    const file = fs.readFileSync(`.${parsedUrl.pathname}`);
    res.write(file);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>Page not found!</h1>');
    res.end();
  }
});

server.listen(5000);
