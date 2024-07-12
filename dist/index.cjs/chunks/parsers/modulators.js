'use strict';

var parseError = require('../../riff/parseError.js');
var constants = require('../../constants.js');

const getModulatorValue = (value) => {
  return {
    type: value >> 10 & 63,
    polarity: value >> 9 & 1,
    direction: value >> 8 & 1,
    palette: value >> 7 & 1,
    index: value & 127
  };
};
const getModulators = (chunk, type) => {
  if (chunk.id !== type) {
    throw new parseError.ParseError("Unexpected chunk ID", `'${type}'`, `'${chunk.id}'`);
  }
  if (chunk.length % constants.SF_MODULATOR_SIZE) {
    throw new parseError.ParseError(`Invalid size for the '${type}' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    return {
      source: getModulatorValue(iterator.getInt16BE()),
      id: iterator.getInt16BE(),
      value: iterator.getInt16BE(),
      valueSource: getModulatorValue(iterator.getInt16BE()),
      transform: iterator.getInt16BE()
    };
  });
};

exports.getModulators = getModulators;
