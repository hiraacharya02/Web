const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3002;

const server = http.createServer((req, res) => {
  console.log(`Received request for: ${req.url}`); // Debugging: Log the requested URL
  
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(path.join(__dirname, 'Combined.html'), (err, data) => {
      if (err) {
        console.error('Error reading file:', err); // Debugging: Log the error
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else {
    console.error('404 Not Found: Requested URL not matched'); // Debugging: Log when URL not found
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
