/**
 * Converts buffer to mimeless base64 data url
 * @param {Buffer} buffer - the data buffer
 * @return {string}
 */
export const bufferToDataUrl = (buffer: Buffer) => {
  return `data:;base64,${buffer.toString('base64')}`
}
