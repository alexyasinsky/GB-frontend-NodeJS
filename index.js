// import fs from 'fs';
//
//
// fs.readFile('index.html', (err, data) => {
//   if (err) {
//     return console.log(err);
//   } else {
//     return console.log(data.toString('utf-8'));
//   }
// })


import {getPrimeNumbers} from "./numbers.js";
import colorizeArr from "./colorizer.js";

const primes = getPrimeNumbers(19);
const palette = ['green', 'yellow', 'red'];
colorizeArr(primes, palette);