import { SoundFont3 } from '../soundFont3.js'
import { SoundFont2Raw } from './utils.js'

/**
 * Writes a sample data chunk buffer.
 * @param {soundFont} SoundFont3 - parsed SoundFont3 object.
 * @return {Buffer} SoundFont file buffer.
 */
declare const writeSoundFont: (soundFont: SoundFont3 | SoundFont2Raw) => Int8Array

export { writeSoundFont }
