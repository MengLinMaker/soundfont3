import { ParseError } from '../../riff/parseError.js';
import { SF_MODULATOR_SIZE } from '../../constants.js';

const getModulatorValue = (value) => {
  return {
    type: value >> 10 & 63,
    polarity: value >> 9 & 1,
    direction: value >> 8 & 1,
    palette: value >> 7 & 1,
    index: value & 127
  };
};
const getModulators = (chunk, type) => {
  if (chunk.id !== type) {
    throw new ParseError("Unexpected chunk ID", `'${type}'`, `'${chunk.id}'`);
  }
  if (chunk.length % SF_MODULATOR_SIZE) {
    throw new ParseError(`Invalid size for the '${type}' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    return {
      source: getModulatorValue(iterator.getInt16BE()),
      id: iterator.getInt16BE(),
      value: iterator.getInt16BE(),
      valueSource: getModulatorValue(iterator.getInt16BE()),
      transform: iterator.getInt16BE()
    };
  });
};

export { getModulators };
