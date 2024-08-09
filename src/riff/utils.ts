/**
 * Convert a UTF-8 encoded buffer into a string. This will read the full buffer as UTF-8 encoded
 * string and return anything before the first NULL character. The output text is trimmed of any
 * preceding or following spaces.
 *
 * @param {Buffer} buffer - The input buffer
 */
export const getStringFromBuffer = (buffer: Uint8Array): string => {
  let decoded = ''
  for (let i = 0; i < buffer.byteLength; i++) {
    const decodedSub = new TextDecoder('utf8').decode(buffer.slice(i, i + 1))
    if (decodedSub.match(/\0/)) break
    decoded += decodedSub
  }
  return decoded
}
