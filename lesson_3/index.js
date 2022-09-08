// import http from 'http';

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     let data = '';
//     req.on('data', chunk => data += chunk );
//     req.on('end', () => {
//       console.log('data', JSON.parse(data));
//       // res.writeHead(200, 'OK', {
//       //   'Content-Type': 'application/json'
//       // });
//       // res.end(data);
//     })
//   }
//   res.end('default')
// })

// server.listen(5555);

import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

app.use((req, res, next) => {
  console.log(new Date().toISOString());
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.get('/json', (req, res) => {
  res.json({"name": "Ivan"});
});

app.get('/status', (req, res) => {
  res.sendStatus(201);
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: process.cwd()});
});

app.listen(5555, () => console.log('server started on port 5555'));