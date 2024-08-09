import { SoundFont3 } from '../soundFont3'
import type { SampleHeader } from '../types/sample'
import { type SoundFont2Raw, concatBuffer } from './utils'
import { writeSoundFont } from './writeSoundFont'

/**
 * Convert parsed '.sf3' file to '.sf2'. Only works on Node.js.
 * @param {SoundFont3} _soundFont - SoundFont3 instance '.sf3'.
 * @returns {SoundFont3} SoundFont3 instance '.sf2'.
 */
export const toSoundFont2 = async (
  _soundFont: SoundFont3,
  folderPath = `soundfont-${crypto.randomUUID()}`,
) => {
  const soundFont = structuredClone(_soundFont) as never as SoundFont2Raw
  if (typeof document !== 'undefined')
    throw Error('WebCodecs not supported yet.')
  const soundFontVersion = Number(soundFont.metaData.version)
  if (soundFontVersion < 3) return _soundFont

  const {
    existsSync,
    mkdirSync,
    readFileSync,
    rmdirSync,
    unlinkSync,
    writeFileSync,
  } = await import('fs')
  const { execSync } = await import('child_process')
  if (!existsSync(folderPath)) mkdirSync(folderPath)

  const sampleHeaders: SampleHeader[] = []
  let sampleBuffer = new Uint8Array()
  let sampleOffset = 0
  let oggOffset = 0 // Undo OGG offset
  soundFont.samples.map((sample) => {
    const fileName = `${folderPath}/${sample.header.name}`
    const oggBuffer = sample.data.buffer
    writeFileSync(`${fileName}.ogg`, new Uint8Array(sample.data))
    execSync(
      `ffmpeg -y -i "${fileName}.ogg" -ar ${sample.header.sampleRate} -ac 1 "${fileName}.wav"`,
      {
        stdio: 'ignore',
      },
    )
    const wavFileBuffer = readFileSync(`${fileName}.wav`)
    // Remove 44 byte header plus 34 byte extra
    const wavBuffer = new Uint8Array(
      wavFileBuffer.slice(44 + 34, wavFileBuffer.byteLength),
    )

    unlinkSync(`${fileName}.wav`)
    unlinkSync(`${fileName}.ogg`)

    const padBuffer = new ArrayBuffer(2 - (wavBuffer.byteLength % 2))
    sample.header.start = sampleOffset
    sample.header.end = sampleOffset + wavBuffer.byteLength / 2
    sample.header.startLoop += oggOffset
    sample.header.endLoop += oggOffset
    sampleBuffer = concatBuffer([sampleBuffer, wavBuffer, padBuffer])
    sampleOffset += wavBuffer.byteLength / 2 + padBuffer.byteLength
    oggOffset += oggBuffer.byteLength
    sampleHeaders.push(sample.header)
  })
  console.info(
    `Sample size: ${(sampleBuffer.byteLength / 10 ** 6).toFixed(3)} mb`,
  )
  rmdirSync(folderPath)

  soundFont.metaData.version = '2.04'
  soundFont.sampleData = new Uint8Array(sampleBuffer)
  soundFont.presetData.sampleHeaders = sampleHeaders
  return new SoundFont3(new Uint8Array(writeSoundFont(soundFont)))
}
