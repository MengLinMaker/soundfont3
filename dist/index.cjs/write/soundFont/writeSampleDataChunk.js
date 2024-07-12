'use strict';

var writeRiffChunk = require('./writeRiffChunk.js');

const writeSampleDataChunk = (sampleData) => {
  const chunkId = "smpl";
  const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, sampleData);
  return writeRiffChunk.writeRiffTopChunk("LIST", "sdta", chunkBuffer);
};

exports.writeSampleDataChunk = writeSampleDataChunk;
