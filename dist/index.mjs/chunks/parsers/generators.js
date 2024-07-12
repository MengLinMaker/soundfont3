import { ParseError } from '../../riff/parseError.js';
import { GeneratorType } from '../../types/generator.js';
import '../../types/modulator.js';
import { SF_GENERATOR_SIZE } from '../../constants.js';

const PRESET_TYPES_BLACKLIST = [
  GeneratorType.StartAddrsOffset,
  GeneratorType.EndAddrsOffset,
  GeneratorType.StartLoopAddrsOffset,
  GeneratorType.EndLoopAddrsOffset,
  GeneratorType.StartAddrsCoarseOffset,
  GeneratorType.EndAddrsCoarseOffset,
  GeneratorType.StartLoopAddrsCoarseOffset,
  GeneratorType.KeyNum,
  GeneratorType.Velocity,
  GeneratorType.EndLoopAddrsCoarseOffset,
  GeneratorType.SampleModes,
  GeneratorType.ExclusiveClass,
  GeneratorType.OverridingRootKey
];
const INSTRUMENT_TYPES_BLACKLIST = [
  GeneratorType.Unused1,
  GeneratorType.Unused2,
  GeneratorType.Unused3,
  GeneratorType.Unused4,
  GeneratorType.Reserved1,
  GeneratorType.Reserved2,
  GeneratorType.Reserved3
];
const RANGE_TYPES = [GeneratorType.KeyRange, GeneratorType.VelRange];
const getGenerators = (chunk, type) => {
  if (chunk.id !== type) {
    throw new ParseError("Unexpected chunk ID", `'${type}'`, `'${chunk.id}'`);
  }
  if (chunk.length % SF_GENERATOR_SIZE) {
    throw new ParseError(`Invalid size for the '${type}' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    const id = iterator.getInt16();
    if (!GeneratorType[id]) {
      return null;
    }
    if (type === "pgen" && PRESET_TYPES_BLACKLIST.includes(id)) {
      return null;
    }
    if (type === "igen" && INSTRUMENT_TYPES_BLACKLIST.includes(id)) {
      return null;
    }
    if (RANGE_TYPES.includes(id)) {
      return {
        id,
        range: {
          lo: iterator.getByte(),
          hi: iterator.getByte()
        }
      };
    }
    return {
      id,
      value: iterator.getInt16BE()
    };
  });
};

export { getGenerators };
