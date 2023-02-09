function sanitize(unsafe) {
  return unsafe.replace(/</g, '&lt;');
}

module.exports = { sanitize };
