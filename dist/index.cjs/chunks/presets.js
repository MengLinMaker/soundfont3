'use strict';

var parseError = require('../riff/parseError.js');
var constants = require('../constants.js');

const getPresetHeaders = (chunk) => {
  if (chunk.id !== "phdr") {
    throw new parseError.ParseError("Invalid chunk ID", `'phdr'`, `'${chunk.id}'`);
  }
  if (chunk.length % constants.SF_PRESET_HEADER_SIZE) {
    throw new parseError.ParseError(`Invalid size for the 'phdr' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    return {
      name: iterator.getString(),
      preset: iterator.getInt16(),
      bank: iterator.getInt16(),
      bagIndex: iterator.getInt16(),
      library: iterator.getUInt32(),
      genre: iterator.getUInt32(),
      morphology: iterator.getUInt32()
    };
  });
};

exports.getPresetHeaders = getPresetHeaders;
