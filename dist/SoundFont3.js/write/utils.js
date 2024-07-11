'use strict';

const dataViewWriteString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};
const concatBuffer = (buffer1, buffer2) => {
  const tmp = new Int8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Int8Array(buffer1), 0);
  tmp.set(new Int8Array(buffer2), buffer1.byteLength);
  return new Int8Array(tmp.buffer);
};

exports.concatBuffer = concatBuffer;
exports.dataViewWriteString = dataViewWriteString;
