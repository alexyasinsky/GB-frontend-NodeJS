#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';
import path from 'path';
import inquirer from 'inquirer';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));



// const [filePath] = process.argv.slice(2);

// const options = yargs
//   .usage('Usage: -p <path to file>')
//   .options('p', {
//     alias: 'path',
//     describe: 'Path to File',
//     type: 'string',
//     demandOption: true
//   }).argv

// const data = fs.readFileSync(options.p, 'utf-8');

// console.log(data);

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question('Введите путь до файла: ', (filePath) => {
//   rl.question('Введите кодировку файла: ', (encode) => {
//     fs.readFile(filePath, encode, (err, data) => {
//       if (err) {
//         console.log(err);
//       }

//       console.log(data);

//     });
//     rl.close();
//   });
// });


// const question = async (query) =>
//   new Promise((resolve, reject) => rl.question(query, resolve));

// (async () => {
//   const filePath = await question('Введите путь до файла: ');
//   const encode = await question('Введите кодировка файла: ');

//   fs.readFile(path.join(process.cwd(), filePath), encode, (err, data) => {
//     if (err) {
//       console.log(err);
//     }

//     console.log(data);
//   });

//   rl.close();
// })();



const options = yargs
  .usage('Usage: -p <path to directory>')
  .options('p', {
    alias: 'path',
    describe: 'Path to operation directory',
    type: 'string',
    default: ''
  }).argv
  
const executionDir = process.cwd() + "\\" + options.p + "\\";
  
const fileFilter = (fileOrDir) => fs.lstatSync(options.p + '/' + fileOrDir).isFile();
const list = fs.readdirSync(executionDir).filter(fileFilter);

inquirer
  .prompt([
    {
      name: 'fileName',
      type: 'list', // input, number, confirm, list, chackbox, password
      message: 'Выберите файл для чтения',
      choices: list,
    },
  ])
  .then(({ fileName }) => {
    const fullFilePath = path.join(executionDir, fileName);

    fs.readFile(fullFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
    });
  });




