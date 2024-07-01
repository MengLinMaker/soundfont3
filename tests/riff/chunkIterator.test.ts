import { ParseError } from '../../src/riff'
import { parseBuffer } from '../../src/riff'
import buffer from './buffer.mock'

describe('ChunkIterator', () => {
  it('should increase the position on reading', () => {
    const chunk = parseBuffer(buffer)
    const iterator = chunk.iterator()
    expect(iterator.getString(4)).toBe('sfbk')
    expect(iterator.currentPosition).toBe(4)
    expect(iterator.getString(4)).toBe('LIST')
    expect(iterator.getUInt32()).toBe(8)
    expect(iterator.currentPosition).toBe(12)
  })

  it('should not parse invalid chunk ID', () => {
    const invalidBuffer = Buffer.from(buffer)
    invalidBuffer[0] = 0x0
    try {
      parseBuffer(invalidBuffer)
    } catch (e) {
      expect(e).toStrictEqual(new ParseError('Invalid file format'))
    }
  })
})
