import http from 'http';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => data += chunk );
    req.on('end', () => {
      console.log('data', JSON.parse(data));
      // res.writeHead(200, 'OK', {
      //   'Content-Type': 'application/json'
      // });
      // res.end(data);
    })
  }
  res.end('default')
})

server.listen(5555);