import type { SoundFont3 } from '../soundFont3'
import {
  writeMetaDataChunk,
  writePresetDataChunk,
  writeRiffTopChunk,
  writeSampleDataChunk,
} from './soundFont'
import { type SoundFont2Raw, concatBuffer } from './utils'

/**
 * Writes a sample data chunk buffer.
 * @param {soundFont} SoundFont3 - parsed SoundFont3 object.
 * @return {Buffer} SoundFont file buffer.
 */
export const writeSoundFont = (soundFont: SoundFont3 | SoundFont2Raw) => {
  return writeRiffTopChunk(
    'RIFF',
    'sfbk',
    concatBuffer(
      writeMetaDataChunk(soundFont.metaData),
      concatBuffer(
        writeSampleDataChunk(soundFont.sampleData),
        writePresetDataChunk(soundFont.presetData),
      ),
    ),
  )
}
