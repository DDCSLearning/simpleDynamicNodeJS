const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  homeRoute(req,res);
});

function homeRoute (req, res) {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Set Home Route\n');
  }
}

server.listen(port, () => {
  console.log(`Server running at http://:${port}/`);
});