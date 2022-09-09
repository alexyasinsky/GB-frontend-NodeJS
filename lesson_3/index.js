import fs from "fs";
import os from "os";
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cluster from "cluster";

if (cluster.isMaster) {

  console.log(`Master ${process.pid} is running...`);

  for (let i = 0; i < os.cpus().length; i++) {
    console.log(`Forking process number ${i}`);
    cluster.fork();
  }

} else {

  console.log(`Worker ${process.pid} is running...`)
  app.use((req, res, next) => {
    console.log(new Date().toISOString());
    next();

  })

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(cookieParser());

  app.get('/', (req, res) => {
    const readStream = fs.createReadStream('index.html')

    res.writeHead(200, "OK", {
      "Content-Type": "text/html",
    });
    console.log(`Send file for ${process.pid}`)

    readStream.pipe(res)
  });

  app.listen(5555, () => console.log('server started on port 5555 at ', new Date().toISOString()));

}