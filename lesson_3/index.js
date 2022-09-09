import fs from "fs";
import os from "os";
import express from 'express';
const app = express();
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import cluster from "cluster";

// if (cluster.isMaster) {

//   console.log(`Master ${process.pid} is running...`);

//   for (let i = 0; i < os.cpus().length; i++) {
//     console.log(`Forking process number ${i}`);
//     cluster.fork();
//   }

// } else {

//   console.log(`Worker ${process.pid} is running...`)
//   app.use((req, res, next) => {
//     console.log(new Date().toISOString());
//     next();

//   })

  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({extended: true}));
  //
  // app.use(cookieParser());

  // app.get('/:fileOrDirName', function (req, res) {

  //   const readStream = fs.createReadStream(req.params.fileOrDirName);

  //   console.log(`Send file for ${process.pid}`)

  //   readStream.pipe(res)

  // });

  app.get('/*', (req, res) => {
    const linkArray = req.url.split('/');
    const currentPath = process.cwd() + linkArray.join('\\');
   if (fs.lstatSync(currentPath).isFile()) {
    const readStream = fs.createReadStream(currentPath);
    console.log(`Send file for ${process.pid}`)
    readStream.pipe(res)
   } else {
    const list = fs.readdirSync(currentPath);
    let html = '<ul>';
    if (linkArray[1] !== "") {
      html += '<li><a style="cursor: pointer; text-decoration: underline" onclick="javascript:history.back();">..</a></li>'
    } 
    list.forEach(item => {
      let link = '';
      linkArray.forEach(part => {
        console.log(linkArray);
        if (part) link += part + '/';
      })
      html += `<a href="${'/' + link + item}"><li>${link + item}</li></a>`
    });
    html += '</ul>'
    res.send(html);
    
    }
    
  });

  app.listen(5555, () => console.log('server started on port 5555 at ', new Date().toISOString()));

// }

