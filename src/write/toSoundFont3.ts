import { SoundFont3 } from '../soundFont3'
import type { SampleHeader } from '../types/sample'
import type { Sample } from '../types/sample'
import type { SoundFont2Raw } from './utils'
import { writeSoundFont } from './writeSoundFont'
import { pcm16BufferToWav } from './writeWav'

type ToSoundFont3Config =
  | {
      bitrate: 32 | 48 | 64 | 96 | 128 | 192 | 256
      sampleRate: 16000 | 22050 | 24000 | 32000 | 44100 | 48000
      oggCompressionAlgorithm: 'vorbis'
    }
  | {
      bitrate: 32 | 48 | 64 | 96 | 128 | 192 | 256
      sampleRate: 48000
      oggCompressionAlgorithm: 'opus'
    }

/**
 * Convert parsed '.sf2' file to '.sf3'. Only works on Node.js.
 * @param {SoundFont3} _soundFont - SoundFont3 instance '.sf2'.
 * @returns {SoundFont3} SoundFont3 instance '.sf3'.
 */
export const toSoundFont3 = async (
  _soundFont: SoundFont3,
  config: ToSoundFont3Config = {
    bitrate: 32,
    sampleRate: 44100,
    oggCompressionAlgorithm: 'vorbis',
  },
  folderPath = `soundfont-${crypto.randomUUID()}`,
) => {
  if (typeof document !== 'undefined')
    throw Error('WebCodecs not supported yet.')

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

  const soundFont = structuredClone(_soundFont) as never as SoundFont2Raw
  const soundFontVersion = Number(soundFont.metaData.version)

  let audioType = 'wav'
  let sampleToBuffer = (sampleRate: number, data: Int16Array) =>
    pcm16BufferToWav(sampleRate, data)
  if (soundFontVersion >= 3 && soundFontVersion < 4) {
    audioType = 'ogg'
    sampleToBuffer = (_: number, data: Int16Array) => Buffer.from(data)
  }

  const sampleHeaders: SampleHeader[] = []
  let sampleBuffer = Buffer.from('')
  soundFont.samples.map((sample: Sample) => {
    const fileName = `${folderPath}/${sample.header.name}`
    const originalAudioBuffer = sampleToBuffer(
      sample.header.sampleRate,
      new Int16Array(sample.data),
    )
    writeFileSync(`${fileName}.${audioType}`, originalAudioBuffer)
    execSync(
      `ffmpeg -y -i "${fileName}.${audioType}" -ar ${config.sampleRate} -ab ${config.bitrate}k -acodec lib${config.oggCompressionAlgorithm} "${fileName}.ogg"`,
      {
        stdio: 'ignore',
      },
    )
    const oggBuffer = readFileSync(`${fileName}.ogg`)
    unlinkSync(`${fileName}.wav`)
    unlinkSync(`${fileName}.ogg`)

    const padBuffer = Buffer.from(
      new ArrayBuffer(2 - (oggBuffer.byteLength % 2)),
    )
    sample.header.start = sampleBuffer.byteLength
    sample.header.end = sample.header.start + oggBuffer.byteLength
    sample.header.startLoop -= sample.header.start
    sample.header.endLoop -= sample.header.start
    sampleHeaders.push(sample.header)
    sampleBuffer = Buffer.concat([sampleBuffer, oggBuffer, padBuffer])
  })
  rmdirSync(folderPath)

  soundFont.metaData.version = '3.1'
  soundFont.sampleData = new Int16Array(sampleBuffer)
  soundFont.presetData.sampleHeaders = sampleHeaders
  return new SoundFont3(Buffer.from(writeSoundFont(soundFont)))
}
