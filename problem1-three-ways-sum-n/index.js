const n = 10000;

// Faster way to sum numbers from 1 to n with O(1) complexity
// This method uses the formula n * (n + 1) / 2 to calculate the sum
function sum_to_n_a(n) {
  return ((1 + n) * n) / 2;
}

// Slower way to sum numbers from 1 to n with O(n) complexity
// This method uses a loop to iterate through all numbers from 1 to n and sum them
// It is less efficient than the formula method, especially for large n
function sum_to_n_b(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Recursive way to sum numbers from 1 to n with O(n) complexity
// Maximum recursion depth is limited in JavaScript, so this method is not suitable for large n.
function sum_to_n_c(n) {
  if (n === 1) return n;
  return n + sum_to_n_c(n - 1);
}

function check_func_duration(func, n) {
  const start = performance.now();
  const result = func(n);
  const end = performance.now();
  console.log(`Result: ${result}, Duration: ${end - start} ms`);
}

check_func_duration(sum_to_n_a, n);
check_func_duration(sum_to_n_b, n);
check_func_duration(sum_to_n_c, n);
