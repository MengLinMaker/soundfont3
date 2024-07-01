import { parseBuffer } from '../parser'
import buffer from './mocks/buffer'

const chunk = parseBuffer(buffer)

describe('ChunkIterator', () => {
  it('should increase the position on reading', () => {
    const iterator = chunk.iterator()
    expect(iterator.getString(4)).toBe('sfbk')
    expect(iterator.currentPosition).toBe(4)
    expect(iterator.getString(4)).toBe('LIST')
    expect(iterator.getUInt32()).toBe(8)
    expect(iterator.currentPosition).toBe(12)
  })
})
