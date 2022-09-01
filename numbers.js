export function getPrimeNumbers (start, finish) {
  const primes = [];
  for (let i = start; i <= finish; i++) {
    let count = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j === 0) {
        count++;
      }
    }
    if (count === 2) {
      primes.push(i);
    }
  }
  return primes;
}