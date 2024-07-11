'use strict';

var writeRiffChunk = require('./soundFont/writeRiffChunk.js');
var writeMetaDataChunk = require('./soundFont/writeMetaDataChunk.js');
var writeSampleDataChunk = require('./soundFont/writeSampleDataChunk.js');
var writePresetDataChunk = require('./soundFont/writePresetDataChunk.js');
var utils = require('./utils.js');

const writeSoundFont = (soundFont) => {
  return writeRiffChunk.writeRiffTopChunk(
    "RIFF",
    "sfbk",
    utils.concatBuffer(
      writeMetaDataChunk.writeMetaDataChunk(soundFont.metaData),
      utils.concatBuffer(
        writeSampleDataChunk.writeSampleDataChunk(soundFont.sampleData),
        writePresetDataChunk.writePresetDataChunk(soundFont.presetData)
      )
    )
  );
};

exports.writeSoundFont = writeSoundFont;
