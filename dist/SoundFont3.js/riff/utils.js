'use strict';

const getStringFromBuffer = (buffer) => {
  const decoded = new TextDecoder("utf8").decode(buffer);
  return decoded.split(/\0/)[0].trim();
};

exports.getStringFromBuffer = getStringFromBuffer;
