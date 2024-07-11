import { dataViewWriteString, concatBuffer } from '../utils.js';

const writeRiffSubChunk = (chunkId, contentBuffer, paddingMax = 0) => {
  if (paddingMax % 2 !== 0) throw Error("Max padding must be even number");
  if (paddingMax > 0) {
    const padBuffer = new ArrayBuffer(paddingMax - contentBuffer.byteLength % 2);
    contentBuffer = concatBuffer(contentBuffer, padBuffer);
  }
  const instView = new DataView(new ArrayBuffer(8));
  dataViewWriteString(instView, 0, chunkId);
  instView.setUint32(4, contentBuffer.byteLength, true);
  return concatBuffer(instView.buffer, contentBuffer);
};
const writeRiffTopChunk = (chunkId, format, contentBuffer) => {
  const instView = new DataView(new ArrayBuffer(12));
  dataViewWriteString(instView, 0, chunkId);
  instView.setUint32(4, 4 + contentBuffer.byteLength, true);
  dataViewWriteString(instView, 8, format);
  return concatBuffer(instView.buffer, contentBuffer);
};

export { writeRiffSubChunk, writeRiffTopChunk };
