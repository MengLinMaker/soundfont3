import { SF_SUB_CHUNKS_ID, SF_TOP_CHUNKS_FORMAT, SF_TOP_CHUNKS_ID } from '../constants'

/**
 * Inserts a string into buffer at offset.
 * @param view {DataView} -DataView of a buffer.
 * @param offset {number} - offset in DataView.
 * @param string {string} - string to insert into DataView.
 */
export const dataViewWriteString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

/**
 * Writes a RIFF sub chunk buffer.
 * @param {SF_SUB_CHUNKS_ID} chunkId - 4 character code chunk id.
 * @param {Buffer} contentBuffer - Subchunk buffer.
 * @param {number} paddingMax - Maximum pad for even RIFF byte.
 * @return {Buffer} Chunk buffer
 */
export const writeRiffSubChunk = (
  chunkId: SF_SUB_CHUNKS_ID,
  contentBuffer: Buffer,
  paddingMax: number = 0
) => {
  if (paddingMax % 2 !== 0) throw Error('Max padding must be even number')

  if (paddingMax > 0) {
    const padBuffer = Buffer.from(new ArrayBuffer(paddingMax - (contentBuffer.byteLength % 2)))
    contentBuffer = Buffer.concat([contentBuffer, padBuffer])
  }

  const instView = new DataView(new ArrayBuffer(8))
  dataViewWriteString(instView, 0, chunkId)
  instView.setUint32(4, contentBuffer.byteLength, true)
  return Buffer.concat([Buffer.from(instView.buffer), contentBuffer])
}

/**
 * Writes a RIFF top chunk buffer.
 * @param {SF_TOP_CHUNKS_ID} chunkId - 4 character code chunk id.
 * @param {SF_TOP_CHUNKS_FORMAT} format - 4 character code format.
 * @return {Buffer} Chunk buffer.
 */
export const writeRiffTopChunk = (
  chunkId: SF_TOP_CHUNKS_ID,
  format: SF_TOP_CHUNKS_FORMAT,
  contentBuffer: Buffer
) => {
  const instView = new DataView(new ArrayBuffer(12))
  dataViewWriteString(instView, 0, chunkId)
  instView.setUint32(4, 4 + contentBuffer.byteLength, true)
  dataViewWriteString(instView, 8, format)
  return Buffer.concat([Buffer.from(instView.buffer), contentBuffer])
}
