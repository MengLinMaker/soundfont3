'use strict';

var parseError = require('../../riff/parseError.js');
var constants = require('../../constants.js');
var generator = require('../../types/generator.js');
require('../../types/modulator.js');

const getZones = (chunk, type) => {
  if (chunk.id !== type) {
    throw new parseError.ParseError("Unexpected chunk ID", `'${type}'`, `'${chunk.id}'`);
  }
  if (chunk.length % constants.SF_BAG_SIZE) {
    throw new parseError.ParseError(`Invalid size for the '${type}' sub-chunk`);
  }
  return chunk.iterate((iterator) => ({
    generatorIndex: iterator.getInt16(),
    modulatorIndex: iterator.getInt16()
  }));
};
const getItemsInZone = (headers, zones, itemModulators, itemGenerators, references, referenceType) => {
  const items = [];
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const next = headers[i + 1];
    const start = header.bagIndex;
    const end = next ? next.bagIndex : zones.length;
    const zoneItems = [];
    let globalZone;
    for (let j = start; j < end; j++) {
      const modulators = getModulators(j, zones, itemModulators);
      const generators = getGenerators(j, zones, itemGenerators);
      const keyRange = generators[generator.GeneratorType.KeyRange] && generators[generator.GeneratorType.KeyRange].range;
      const referenceId = generators[referenceType];
      if (!referenceId) {
        if (j - start === 0) {
          globalZone = {
            keyRange,
            modulators,
            generators
          };
        }
        continue;
      }
      const reference = references[referenceId.value];
      if (!reference) {
        continue;
      }
      zoneItems.push({
        keyRange,
        modulators,
        generators,
        reference
      });
    }
    items.push({
      header,
      globalZone,
      zones: zoneItems
    });
  }
  return items;
};
const getModulators = (index, zones, modulators) => {
  const zone = zones[index];
  const next = zones[index + 1];
  const start = zone.modulatorIndex;
  const end = next ? next.modulatorIndex : zones.length;
  return getZone(start, end, modulators);
};
const getGenerators = (index, zones, generators) => {
  const zone = zones[index];
  const next = zones[index + 1];
  const start = zone.generatorIndex;
  const end = next ? next.generatorIndex : zones.length;
  return getZone(start, end, generators);
};
const getZone = (start, end, items) => {
  const itemsObject = {};
  for (let i = start; i < end; i++) {
    const item = items[i];
    if (item) {
      itemsObject[item.id] = item;
    }
  }
  return itemsObject;
};

exports.getItemsInZone = getItemsInZone;
exports.getZones = getZones;
