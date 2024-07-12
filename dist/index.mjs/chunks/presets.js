import { ParseError } from '../riff/parseError.js';
import { SF_PRESET_HEADER_SIZE } from '../constants.js';

const getPresetHeaders = (chunk) => {
  if (chunk.id !== "phdr") {
    throw new ParseError("Invalid chunk ID", `'phdr'`, `'${chunk.id}'`);
  }
  if (chunk.length % SF_PRESET_HEADER_SIZE) {
    throw new ParseError(`Invalid size for the 'phdr' sub-chunk`);
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

export { getPresetHeaders };
