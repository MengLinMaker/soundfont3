import { ParseError } from '../riff/parseError.js';
import { SF_INSTRUMENT_HEADER_SIZE } from '../constants.js';

const getInstrumentHeaders = (chunk) => {
  if (chunk.id !== "inst") {
    throw new ParseError("Unexpected chunk ID", `'inst'`, `'${chunk.id}'`);
  }
  if (chunk.length % SF_INSTRUMENT_HEADER_SIZE) {
    throw new ParseError(`Invalid size for the 'inst' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    return {
      name: iterator.getString(),
      bagIndex: iterator.getInt16()
    };
  });
};

export { getInstrumentHeaders };
