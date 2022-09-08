import {getPrimeNumbers} from "./numbers.js";
import {colorizeArr, colorizeString} from "./colorizer.js";



const startNumber = +process.argv[2];
const finishNumber = +process.argv[3];
let primes = getPrimeNumbers(startNumber, finishNumber);
if (primes.length !== 0) {
  const palette = ['green', 'yellow', 'red'];
  colorizeArr(primes, palette);
} else {
  colorizeString('There is no primes in your range', 'red');
}




