'use strict';

class ParseError extends Error {
  constructor(message, expected, received) {
    super(`${message}${expected && received ? `, expected ${expected}, received ${received}` : ``}`);
  }
}

exports.ParseError = ParseError;
