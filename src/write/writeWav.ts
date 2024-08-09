import type { SampleData } from '../types'
import { dataViewWriteString } from './utils'

/**
 * Converts a pcm int16 audio data to WAV file as a buffer.
 * @param sampleRate {number} - sample rate in Hertz - eg: 44100 Hz.
 * @param pcm16Buffer {Uint8Array} - pcm int16 audio data.
 * @returns wavFileBuffer - WAV RIFF file as binary.
 */
export function pcm16BufferToWav(sampleRate: number, pcm16Buffer: SampleData) {
  const channelCount = 1

  const headerBuffer = new ArrayBuffer(44)
  const headerView = new DataView(headerBuffer)

  /* RIFF identifier */
  dataViewWriteString(headerView, 0, 'RIFF')
  /* RIFF chunk length */
  headerView.setUint32(4, 44 + pcm16Buffer.byteLength, true)
  /* RIFF type */
  dataViewWriteString(headerView, 8, 'WAVE')
  /* format chunk identifier */
  dataViewWriteString(headerView, 12, 'fmt ')
  /* format chunk length */
  headerView.setUint32(16, 16, true)
  /* sample format (raw) */
  headerView.setUint16(20, 1, true)
  /* channel count */
  headerView.setUint16(22, channelCount, true)
  /* sample rate */
  headerView.setUint32(24, sampleRate, true)
  /* byte rate (sample rate * block align) */
  headerView.setUint32(28, sampleRate * channelCount * 2, true)
  /* block align (channel count * bytes per sample) */
  headerView.setUint16(32, channelCount * 2, true)
  /* bits per sample */
  headerView.setUint16(34, 16, true)
  /* data chunk identifier */
  dataViewWriteString(headerView, 36, 'data')
  /* data chunk length */
  headerView.setUint32(40, 8 + pcm16Buffer.byteLength, true)

  // Append pcm16 data
  const wavFileBuffer = Buffer.concat([
    Buffer.from(headerBuffer),
    Buffer.from(pcm16Buffer),
  ])
  return wavFileBuffer
}
