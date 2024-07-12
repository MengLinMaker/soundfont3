'use strict';

var utils = require('../utils.js');

const writeRiffSubChunk = (chunkId, contentBuffer, paddingMax = 0) => {
  if (paddingMax % 2 !== 0) throw Error("Max padding must be even number");
  if (paddingMax > 0) {
    const padBuffer = new ArrayBuffer(paddingMax - contentBuffer.byteLength % 2);
    contentBuffer = utils.concatBuffer(contentBuffer, padBuffer);
  }
  const instView = new DataView(new ArrayBuffer(8));
  utils.dataViewWriteString(instView, 0, chunkId);
  instView.setUint32(4, contentBuffer.byteLength, true);
  return utils.concatBuffer(instView.buffer, contentBuffer);
};
const writeRiffTopChunk = (chunkId, format, contentBuffer) => {
  const instView = new DataView(new ArrayBuffer(12));
  utils.dataViewWriteString(instView, 0, chunkId);
  instView.setUint32(4, 4 + contentBuffer.byteLength, true);
  utils.dataViewWriteString(instView, 8, format);
  return utils.concatBuffer(instView.buffer, contentBuffer);
};

exports.writeRiffSubChunk = writeRiffSubChunk;
exports.writeRiffTopChunk = writeRiffTopChunk;
