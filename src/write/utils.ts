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
 * Writes a RIFF header buffer
 * @param {string} fourCC - 4 character code
 * @param {Buffer} contentBuffer - Subchunk buffer
 * @param {number} paddingMax - Maximum pad for even RIFF byte
 *
 */
export const writeRiffChunk = (fourCC: string, contentBuffer: Buffer, paddingMax: number = 0) => {
  if (fourCC.length !== 4) throw Error('ChunkId must be 4 characters: FourCC.')
  if (paddingMax % 2 !== 0) throw Error('Max padding must be even number')

  if (paddingMax > 0) {
    const padBuffer = Buffer.from(new ArrayBuffer(paddingMax - (contentBuffer.byteLength % 2)))
    contentBuffer = Buffer.concat([contentBuffer, padBuffer])
  }

  const instView = new DataView(new ArrayBuffer(8))
  dataViewWriteString(instView, 0, fourCC)
  instView.setUint32(4, 8 + contentBuffer.byteLength)
  return Buffer.concat([Buffer.from(instView.buffer), contentBuffer])
}
