import type {
  SF_SUB_CHUNKS_ID,
  SF_TOP_CHUNKS_FORMAT,
  SF_TOP_CHUNKS_ID,
} from '../../constants'
import { concatBuffer, dataViewWriteString } from '../utils'

/**
 * Writes a RIFF sub chunk buffer.
 * @param {SF_SUB_CHUNKS_ID} chunkId - 4 character code chunk id.
 * @param {ArrayBuffer} contentBuffer - Subchunk buffer.
 * @param {number} paddingMax - Maximum pad for even RIFF byte.
 * @return {Int8Array} Chunk buffer
 */
export const writeRiffSubChunk = (
  chunkId: SF_SUB_CHUNKS_ID,
  contentBuffer: ArrayBuffer,
  paddingMax = 0,
) => {
  if (paddingMax % 2 !== 0) throw Error('Max padding must be even number')

  if (paddingMax > 0) {
    const padBuffer = new ArrayBuffer(
      paddingMax - (contentBuffer.byteLength % 2),
    )
    contentBuffer = concatBuffer(contentBuffer, padBuffer)
  }

  const instView = new DataView(new ArrayBuffer(8))
  dataViewWriteString(instView, 0, chunkId)
  instView.setUint32(4, contentBuffer.byteLength, true)
  return concatBuffer(instView.buffer, contentBuffer)
}

/**
 * Writes a RIFF top chunk buffer.
 * @param {SF_TOP_CHUNKS_ID} chunkId - 4 character code chunk id.
 * @param {SF_TOP_CHUNKS_FORMAT} format - 4 character code format.
 * @param {ArrayBuffer} Chunk - Content buffer.
 * @return {Int8Array}
 */
export const writeRiffTopChunk = (
  chunkId: SF_TOP_CHUNKS_ID,
  format: SF_TOP_CHUNKS_FORMAT,
  contentBuffer: ArrayBuffer,
) => {
  const instView = new DataView(new ArrayBuffer(12))
  dataViewWriteString(instView, 0, chunkId)
  instView.setUint32(4, 4 + contentBuffer.byteLength, true)
  dataViewWriteString(instView, 8, format)
  return concatBuffer(instView.buffer, contentBuffer)
}
