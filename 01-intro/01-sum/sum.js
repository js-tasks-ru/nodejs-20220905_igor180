function sum(a, b) {
  if (typeof a !== 'number') {
    throw new TypeError('Expected number but got: ${typeof a}');
  }
  if (typeof b !== 'number') {
    throw new TypeError('Expected number but got: ${typeof b}');
  }
  return a+b
}

module.exports = sum;
