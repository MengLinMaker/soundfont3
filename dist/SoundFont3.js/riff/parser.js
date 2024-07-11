'use strict';

var parseError = require('./parseError.js');
var utils = require('./utils.js');
var riffChunk = require('./riffChunk.js');

const parseBuffer = (buffer) => {
  const id = getChunkId(buffer);
  if (id !== "RIFF") {
    throw new parseError.ParseError("Invalid file format", "RIFF", id);
  }
  const signature = getChunkId(buffer, 8);
  if (signature !== "sfbk") {
    throw new parseError.ParseError("Invalid signature", "sfbk", signature);
  }
  const newBuffer = buffer.subarray(8);
  const subChunks = getSubChunks(newBuffer.subarray(4));
  return new riffChunk.RIFFChunk(id, newBuffer.length, newBuffer, subChunks);
};
const getChunk = (buffer, start) => {
  const id = getChunkId(buffer, start);
  const length = getChunkLength(buffer, start + 4);
  let subChunks = [];
  if (id === "RIFF" || id === "LIST") {
    subChunks = getSubChunks(buffer.subarray(start + 12));
  }
  return new riffChunk.RIFFChunk(id, length, buffer.subarray(start + 8), subChunks);
};
const getChunkLength = (buffer, start) => {
  buffer = buffer.subarray(start, start + 4);
  return (buffer[0] | buffer[1] << 8 | buffer[2] << 16 | buffer[3] << 24) >>> 0;
};
const getSubChunks = (buffer) => {
  const chunks = [];
  let index = 0;
  while (index <= buffer.length - 8) {
    const subChunk = getChunk(buffer, index);
    chunks.push(subChunk);
    index += 8 + subChunk.length;
    index = index % 2 ? index + 1 : index;
  }
  return chunks;
};
const getChunkId = (buffer, start = 0) => {
  return utils.getStringFromBuffer(buffer.subarray(start, start + 4));
};

exports.getChunk = getChunk;
exports.getChunkId = getChunkId;
exports.getChunkLength = getChunkLength;
exports.getSubChunks = getSubChunks;
exports.parseBuffer = parseBuffer;
