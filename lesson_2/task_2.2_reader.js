#!/usr/bin/env node

import fs from 'fs';
import readline from 'readline';
import path from 'path';
import inquirer from 'inquirer';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));

const options = yargs
  .usage('Usage: -p <path to directory>')
  .options('p', {
    alias: 'path',
    describe: 'Path to operation directory',
    type: 'string',
    default: ''
  }).argv
  
const executionDir = process.cwd() + "\\" + options.p;
  

browseDirectory(executionDir);

function browseDirectory(directory) {

  const list = fs.readdirSync(directory);

  inquirer
  .prompt([
    {
      name: 'fileOrDirName',
      type: 'list', // input, number, confirm, list, chackbox, password
      message: 'Выберите файл для чтения',
      choices: list,
    },
  ])
  .then(({ fileOrDirName }) => {
    if (fs.lstatSync(directory + '/' + fileOrDirName).isFile()) {
      const fullFilePath = path.join(directory, fileOrDirName);
      const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

      const question = async (query) =>
        new Promise((resolve, reject) => rl.question(query, resolve));

      (async () => {
        const queryString = await question('Введите строку для поиска: ');
        const regexp = new RegExp(queryString, 'i');
        
        fs.readFile(fullFilePath, 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
          }
          
          if (regexp.test(data)) {
            console.log(`файл содержит искомую строку: ${queryString}`);
          } else {
            console.log(`файл не содержит искомой строки: ${queryString}`);
            browseDirectory(directory);
          }
          
        });

        rl.close();
      })();

    } else {
      browseDirectory(directory + '/' + fileOrDirName);
    }   
  });
}






