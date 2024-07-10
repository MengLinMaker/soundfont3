import { existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { SampleHeader, SoundFont3, writeSoundFont } from '..'
import { concatBuffer, SoundFont2Raw } from './utils'

export const toSoundFont2 = (
  _soundFont: SoundFont3,
  folderPath = `soundfont-${crypto.randomUUID()}`
) => {
  const soundFont = structuredClone(_soundFont) as never as SoundFont2Raw
  if (typeof document !== 'undefined') throw Error('WebCodecs not supported yet.')
  const soundFontVersion = Number(soundFont.metaData.version)
  if (soundFontVersion < 3) return _soundFont

  if (!existsSync(folderPath)) mkdirSync(folderPath)

  const sampleHeaders: SampleHeader[] = []
  let sampleBuffer = new Int8Array()
  let sampleOffset = 0
  let oggOffset = 0 // Undo OGG offset
  soundFont.samples.map((sample) => {
    const fileName = `${folderPath}/${sample.header.name}`
    const oggBuffer = sample.data.buffer
    writeFileSync(`${fileName}.ogg`, new Int8Array(sample.data))
    execSync(
      `ffmpeg -y -i "${fileName}.ogg" -ar ${sample.header.sampleRate} -ac 1 "${fileName}.wav"`,
      {
        stdio: 'ignore'
      }
    )
    const wavFileBuffer = readFileSync(`${fileName}.wav`)
    // Remove 44 byte header plus 34 byte extra
    const wavBuffer = new Int8Array(wavFileBuffer.slice(44 + 34, wavFileBuffer.byteLength))

    unlinkSync(`${fileName}.wav`)
    unlinkSync(`${fileName}.ogg`)

    const padBuffer = new ArrayBuffer(2 - (wavBuffer.byteLength % 2))
    sample.header.start = sampleOffset
    sample.header.end = sampleOffset + wavBuffer.byteLength / 2
    sample.header.startLoop += oggOffset
    sample.header.endLoop += oggOffset
    sampleBuffer = concatBuffer(concatBuffer(sampleBuffer, wavBuffer), padBuffer)
    sampleOffset += wavBuffer.byteLength / 2 + padBuffer.byteLength
    oggOffset += oggBuffer.byteLength
    sampleHeaders.push(sample.header)
  })
  console.info(`Sample size: ${(sampleBuffer.byteLength / 10 ** 6).toFixed(3)} mb`)
  rmdirSync(folderPath)

  soundFont.metaData.version = '2.04'
  soundFont.sampleData = new Int16Array(sampleBuffer)
  soundFont.presetData.sampleHeaders = sampleHeaders
  return new SoundFont3(new Uint8Array(writeSoundFont(soundFont)))
}
