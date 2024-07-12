import { writeRiffTopChunk } from './soundFont/writeRiffChunk.js';
import { writeMetaDataChunk } from './soundFont/writeMetaDataChunk.js';
import { writeSampleDataChunk } from './soundFont/writeSampleDataChunk.js';
import { writePresetDataChunk } from './soundFont/writePresetDataChunk.js';
import { concatBuffer } from './utils.js';

const writeSoundFont = (soundFont) => {
  return writeRiffTopChunk(
    "RIFF",
    "sfbk",
    concatBuffer(
      writeMetaDataChunk(soundFont.metaData),
      concatBuffer(
        writeSampleDataChunk(soundFont.sampleData),
        writePresetDataChunk(soundFont.presetData)
      )
    )
  );
};

export { writeSoundFont };
