import { writeRiffSubChunk, writeRiffTopChunk } from './writeRiffChunk.js';

const writeSampleDataChunk = (sampleData) => {
  const chunkId = "smpl";
  const chunkBuffer = writeRiffSubChunk(chunkId, sampleData);
  return writeRiffTopChunk("LIST", "sdta", chunkBuffer);
};

export { writeSampleDataChunk };
