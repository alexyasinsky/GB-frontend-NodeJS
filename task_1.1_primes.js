import {getPrimeNumbers} from "./numbers.js";
import {colorizeArr} from "./colorizer.js";
import inquirer from "inquirer";


inquirer
  .prompt([
    {
      name: 'number',
      message: 'Enter number from 1 to infinity to get primes: '
    },
  ])
  .then(answers => {
    const primes = getPrimeNumbers(answers.number);
    const palette = ['green', 'yellow', 'red'];
    colorizeArr(primes, palette);
  });



