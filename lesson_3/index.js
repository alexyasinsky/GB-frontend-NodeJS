import http from 'http';

const server = http.createServer((req, res) => {
  res.write('hello 2');
  res.end();
})

server.listen(5555);