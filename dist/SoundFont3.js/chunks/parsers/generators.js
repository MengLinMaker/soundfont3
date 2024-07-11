'use strict';

var parseError = require('../../riff/parseError.js');
var generator = require('../../types/generator.js');
require('../../types/modulator.js');
var constants = require('../../constants.js');

const PRESET_TYPES_BLACKLIST = [
  generator.GeneratorType.StartAddrsOffset,
  generator.GeneratorType.EndAddrsOffset,
  generator.GeneratorType.StartLoopAddrsOffset,
  generator.GeneratorType.EndLoopAddrsOffset,
  generator.GeneratorType.StartAddrsCoarseOffset,
  generator.GeneratorType.EndAddrsCoarseOffset,
  generator.GeneratorType.StartLoopAddrsCoarseOffset,
  generator.GeneratorType.KeyNum,
  generator.GeneratorType.Velocity,
  generator.GeneratorType.EndLoopAddrsCoarseOffset,
  generator.GeneratorType.SampleModes,
  generator.GeneratorType.ExclusiveClass,
  generator.GeneratorType.OverridingRootKey
];
const INSTRUMENT_TYPES_BLACKLIST = [
  generator.GeneratorType.Unused1,
  generator.GeneratorType.Unused2,
  generator.GeneratorType.Unused3,
  generator.GeneratorType.Unused4,
  generator.GeneratorType.Reserved1,
  generator.GeneratorType.Reserved2,
  generator.GeneratorType.Reserved3
];
const RANGE_TYPES = [generator.GeneratorType.KeyRange, generator.GeneratorType.VelRange];
const getGenerators = (chunk, type) => {
  if (chunk.id !== type) {
    throw new parseError.ParseError("Unexpected chunk ID", `'${type}'`, `'${chunk.id}'`);
  }
  if (chunk.length % constants.SF_GENERATOR_SIZE) {
    throw new parseError.ParseError(`Invalid size for the '${type}' sub-chunk`);
  }
  return chunk.iterate((iterator) => {
    const id = iterator.getInt16();
    if (!generator.GeneratorType[id]) {
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

exports.getGenerators = getGenerators;
