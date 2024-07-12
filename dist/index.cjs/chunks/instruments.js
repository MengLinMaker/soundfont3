'use strict';

var parseError = require('../riff/parseError.js');
var constants = require('../constants.js');

const getInstrumentHeaders = (chunk) => {
  if (chunk.id !== "inst") {
    throw new parseError.ParseError("Unexpected chunk ID", `'inst'`, `'${chunk.id}'`);
  }
  if (chunk.length % constants.SF_INSTRUMENT_HEADER_SIZE) {
    throw new parseError.ParseError(`Invalid size for the 'inst' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    return {
      name: iterator.getString(),
      bagIndex: iterator.getInt16()
    };
  });
};

exports.getInstrumentHeaders = getInstrumentHeaders;
