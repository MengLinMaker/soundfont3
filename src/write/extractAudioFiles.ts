import { SoundFont3 } from '../soundFont3'
import { pcm16BufferToWav } from './convert'

/**
 * Extract samples from SoundFont to folder
 * @param {SoundFont3} soundFont - folder to dump samples.
 * @param {string} folderPath - folder to dump samples.
 */
export const extractAudioFiles = async (soundFont: SoundFont3, folderPath: string) => {
  const { existsSync, mkdirSync, writeFileSync } = await import('fs')

  const soundFontVersion = Number(soundFont.metaData.version)
  if (!existsSync(folderPath)) mkdirSync(folderPath)
  if (soundFontVersion >= 2 && soundFontVersion < 3) {
    for (const header of soundFont.presetData.sampleHeaders) {
      if (header.name === 'EOS') break
      const data = soundFont.sampleData.slice(2 * header.start, 2 * header.end)
      const wavFile = pcm16BufferToWav(header.sampleRate, data)
      writeFileSync(`${folderPath}/${header.name}.wav`, wavFile)
    }
  } else if (soundFontVersion >= 3 && soundFontVersion < 4) {
    soundFont.samples.forEach((sample) => {
      writeFileSync(`${folderPath}/${sample.header.name}.ogg`, Buffer.from(sample.data))
    })
  }
  return
}
