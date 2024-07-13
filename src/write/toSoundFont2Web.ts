import { SoundFont3 } from '../soundFont3'
import { SampleHeader } from '../types'
import { writeSoundFont } from './writeSoundFont'
import { SoundFont2Raw, concatBuffer } from './utils'

function floatTo16BitPCM(input: Float32Array) {
  const view = new DataView(new ArrayBuffer(input.length * 2))
  let offset = 0
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]))
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  return view.buffer
}

export const toSoundFont2Web = async (_soundFont: SoundFont3) => {
  const soundFont = structuredClone(_soundFont) as never as SoundFont2Raw
  const soundFontVersion = Number(soundFont.metaData.version)
  if (soundFontVersion < 3) return _soundFont

  const sampleHeaders: SampleHeader[] = []
  let sampleBuffer = new Int8Array()
  let sampleOffset = 0
  const decode = await import('audio-decode')
  for (const sample of soundFont.samples) {
    const audioBuffer = await decode.default(new Int8Array(sample.data).buffer)
    const wavBuffer = floatTo16BitPCM(audioBuffer.getChannelData(0))
    const padBuffer = new ArrayBuffer(2 - (wavBuffer.byteLength % 2))

    sample.header.start = sampleOffset
    sample.header.end = sampleOffset + wavBuffer.byteLength / 2
    const sampleLen = sample.header.end - sample.header.start
    const loopLen = sample.header.endLoop - sample.header.startLoop
    sample.header.endLoop = sampleLen - 128
    sample.header.startLoop = sampleLen - loopLen - 128

    sampleBuffer = concatBuffer(
      concatBuffer(sampleBuffer, wavBuffer),
      padBuffer,
    )
    sampleOffset += wavBuffer.byteLength / 2 + padBuffer.byteLength
    sampleHeaders.push(sample.header)
  }
  console.info(
    `Sample size: ${(sampleBuffer.byteLength / 10 ** 6).toFixed(3)} mb`,
  )

  soundFont.metaData.version = '2.04'
  soundFont.sampleData = new Int16Array(sampleBuffer)
  soundFont.presetData.sampleHeaders = sampleHeaders
  return new SoundFont3(new Uint8Array(writeSoundFont(soundFont)))
}
