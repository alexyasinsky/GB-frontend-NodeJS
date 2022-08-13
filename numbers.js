import colors from "colors";

const palette = ['green', 'yellow', 'red'];

export function getPrimeNumbers (n) {
  let color = 1;
  console.log(colors[palette[color-1]](1));
  color === palette.length ? color = 1 : color++;
  if (n === 1) return;
  for (let i = 2; i <= n; i++) {
    let count = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) {
        count++;
      }
    }
    if (count === 2) {
      console.log(colors[palette[color-1]](i));
      color === palette.length ? color = 1 : color++;
    }
  }
}