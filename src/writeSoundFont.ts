import { SoundFont3 } from '.'
import { writeMetaDataChunk } from './write/writeMetaDataChunk'
import { writeRiffTopChunk } from './write/utils'
import { writeSampleDataChunk } from './write/writeSampleDataChunk'
import { writePresetDataChunk } from './write/writePresetDataChunk'

/**
 * Writes a sample data chunk buffer.
 * @param {soundFont} SoundFont3 - parsed SoundFont3 object.
 * @return {Buffer} SoundFont file buffer.
 */
export const writeSoundFont = (soundFont: SoundFont3) => {
  return writeRiffTopChunk(
    'RIFF',
    'sfbk',
    Buffer.concat([
      writeMetaDataChunk(soundFont.metaData),
      writeSampleDataChunk(soundFont.sampleData),
      writePresetDataChunk(soundFont.presetData)
    ])
  )
}
