'use strict';

var parseError = require('../riff/parseError.js');
var constants = require('../constants.js');

const getSampleHeaders = (chunk) => {
  if (chunk.id !== "shdr") {
    throw new parseError.ParseError("Unexpected chunk ID", `'shdr'`, `'${chunk.id}'`);
  }
  if (chunk.length % constants.SF_SAMPLE_HEADER_SIZE) {
    throw new parseError.ParseError(`Invalid size for the 'shdr' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    return {
      name: iterator.getString(),
      start: iterator.getUInt32(),
      end: iterator.getUInt32(),
      startLoop: iterator.getUInt32(),
      endLoop: iterator.getUInt32(),
      sampleRate: iterator.getUInt32(),
      originalPitch: iterator.getByte(),
      pitchCorrection: iterator.getChar(),
      link: iterator.getInt16(),
      type: iterator.getInt16()
    };
  });
};

exports.getSampleHeaders = getSampleHeaders;
