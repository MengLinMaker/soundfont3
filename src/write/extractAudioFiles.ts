import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { SoundFont3 } from '..'
import { pcm16BufferToWav } from './convert'

/**
 * Extract samples from SoundFont to folder
 * @param {SoundFont3} soundFont - folder to dump samples.
 * @param {string} folderPath - folder to dump samples.
 */
export const extractAudioFiles = (soundFont: SoundFont3, folderPath: string) => {
  const soundFontVersion = Number(soundFont.metaData.version)
  if (!existsSync(folderPath)) mkdirSync(folderPath)
  if (soundFontVersion >= 2 && soundFontVersion < 3) {
    soundFont.samples.forEach((sample) => {
      const wavFile = pcm16BufferToWav(sample.header.sampleRate, sample.data)
      writeFileSync(`${folderPath}/${sample.header.name}.wav`, wavFile)
    })
  } else if (soundFontVersion >= 3 && soundFontVersion < 4) {
    soundFont.samples.forEach((sample) => {
      writeFileSync(`${folderPath}/${sample.header.name}.ogg`, Buffer.from(sample.data))
    })
  }
  return
}
