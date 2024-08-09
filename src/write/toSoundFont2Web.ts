import { SoundFont3 } from '../soundFont3'
import type { SampleHeader } from '../types'
import { type SoundFont2Raw, concatBuffer } from './utils'
import { writeSoundFont } from './writeSoundFont'

function floatTo16BitPcm(input: Float32Array) {
  const view = new DataView(new ArrayBuffer(input.length * 2))
  for (let i = 0; i < input.length; i++) {
    const s = input[i]
    const val = s < 0 ? s * 0x8000 : s * 0x7fff
    const offset = i * 2
    view.setInt16(offset, val, true)
  }
  return view.buffer
}

/**
 * Convert parsed '.sf3' file to '.sf2'.
 * @param {SoundFont3} _soundFont - SoundFont3 instance '.sf3'.
 * @returns {SoundFont3} SoundFont3 instance '.sf2'.
 */
export const toSoundFont2Web = async (_soundFont: SoundFont3) => {
  const soundFont = structuredClone(_soundFont) as never as SoundFont2Raw
  const soundFontVersion = Number(soundFont.metaData.version)
  if (soundFontVersion < 3) return _soundFont

  const audioContext = new AudioContext()

  const sampleHeaders: SampleHeader[] = []
  const sampleBuffer: ArrayBuffer[] = []
  let sampleOffset = 0
  for (const sample of soundFont.samples) {
    // Decoding audio on main thread may block UI.
    // Unfortunately, AudioContext is undefined in Web Workers.
    const audioBuffer = await audioContext.decodeAudioData(
      new Int8Array(sample.data).buffer,
    )
    const wavBuffer = floatTo16BitPcm(audioBuffer.getChannelData(0))
    const padBuffer = new ArrayBuffer(2 - (wavBuffer.byteLength % 2))

    sample.header.start = sampleOffset
    sample.header.end = sampleOffset + wavBuffer.byteLength / 2
    const sampleLen = sample.header.end - sample.header.start
    const loopLen = sample.header.endLoop - sample.header.startLoop
    sample.header.endLoop = sampleLen - 128
    sample.header.startLoop = sampleLen - loopLen - 128

    sampleBuffer.push(wavBuffer)
    sampleBuffer.push(padBuffer)
    sampleOffset += wavBuffer.byteLength / 2 + padBuffer.byteLength
    sampleHeaders.push(sample.header)
  }

  await audioContext.close()

  const totalSampleBuffer = concatBuffer(sampleBuffer)
  console.info(
    `Sample size: ${(totalSampleBuffer.byteLength / 10 ** 6).toFixed(3)} mb`,
  )

  soundFont.metaData.version = '2.04'
  soundFont.sampleData = new Int16Array(totalSampleBuffer)
  soundFont.presetData.sampleHeaders = sampleHeaders
  return new SoundFont3(new Uint8Array(writeSoundFont(soundFont)))
}
