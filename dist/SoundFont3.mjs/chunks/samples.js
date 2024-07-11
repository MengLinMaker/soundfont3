import { ParseError } from '../riff/parseError.js';
import { SF_SAMPLE_HEADER_SIZE } from '../constants.js';

const getSampleHeaders = (chunk) => {
  if (chunk.id !== "shdr") {
    throw new ParseError("Unexpected chunk ID", `'shdr'`, `'${chunk.id}'`);
  }
  if (chunk.length % SF_SAMPLE_HEADER_SIZE) {
    throw new ParseError(`Invalid size for the 'shdr' sub-chunk`);
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

export { getSampleHeaders };
