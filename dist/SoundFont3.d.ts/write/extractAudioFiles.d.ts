import { SoundFont3 } from '../soundFont3.js'

/**
 * Extract samples from SoundFont to folder
 * @param {SoundFont3} soundFont - folder to dump samples.
 * @param {string} folderPath - folder to dump samples.
 */
declare const extractAudioFiles: (soundFont: SoundFont3, folderPath: string) => Promise<void>

export { extractAudioFiles }
