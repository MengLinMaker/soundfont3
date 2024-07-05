import { existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { SampleHeader, SoundFont3, writeSoundFont } from '..'

export const toSoundFont2 = (
  _soundFont: SoundFont3,
  sampleRate: 16000 | 22050 | 24000 | 32000 | 44100 | 48000 = 44100,
  folderPath = `soundfont-${crypto.randomUUID()}`
) => {
  const soundFont = structuredClone(_soundFont)
  if (typeof document !== 'undefined') throw Error('WebCodecs not supported yet.')
  const soundFontVersion = Number(soundFont.metaData.version)
  if (soundFontVersion < 3) return _soundFont

  if (!existsSync(folderPath)) mkdirSync(folderPath)

  const sampleHeaders: SampleHeader[] = []
  let sampleBuffer = Buffer.from('')
  let sampleOffset = 0
  let oggOffset = 0 // Undo OGG offset
  soundFont.samples.map((sample) => {
    const fileName = `${folderPath}/${sample.header.name}`
    const oggBuffer = Buffer.from(sample.data)
    writeFileSync(`${fileName}.ogg`, oggBuffer)
    execSync(`ffmpeg -y -i "${fileName}.ogg" -ar ${sampleRate} -ac 1 "${fileName}.wav"`, {
      stdio: 'ignore'
    })
    const wavFileBuffer = readFileSync(`${fileName}.wav`)
    // Remove 44 byte header plus 34 byte extra
    const wavBuffer = wavFileBuffer.slice(44 + 34, wavFileBuffer.byteLength)

    unlinkSync(`${fileName}.wav`)
    unlinkSync(`${fileName}.ogg`)

    const padBuffer = Buffer.from(new ArrayBuffer(2 - (wavBuffer.byteLength % 2)))
    sample.header.start = sampleOffset
    sample.header.end = sampleOffset + wavBuffer.byteLength / 2
    sample.header.startLoop += oggOffset
    sample.header.endLoop += oggOffset
    sampleBuffer = Buffer.concat([sampleBuffer, wavBuffer, padBuffer])
    sampleOffset += wavBuffer.byteLength / 2 + padBuffer.byteLength
    oggOffset += oggBuffer.byteLength
    sampleHeaders.push(sample.header)
  })
  console.info(`Sample size: ${(sampleBuffer.byteLength / 10 ** 6).toFixed(3)} mb`)
  rmdirSync(folderPath)

  soundFont.metaData.version = '2.04'
  soundFont.sampleData = new Int16Array(sampleBuffer)
  soundFont.presetData.sampleHeaders = sampleHeaders
  return new SoundFont3(writeSoundFont(soundFont))
}
