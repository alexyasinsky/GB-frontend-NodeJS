export function getPrimeNumbers (n) {
  const primes = [1];
  if (n === 1) return;
  for (let i = 2; i <= n; i++) {
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