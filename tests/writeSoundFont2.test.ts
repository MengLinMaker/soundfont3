import { writeMetaDataChunk } from '../src/write/writeMetaDataChunk'
import { join } from 'path'
import { SoundFont3 } from '../src/soundFont3'
import { readFileSync } from 'fs'

const soundFontUrl = join(__dirname, 'fonts/piano.sf2')
const buffer = readFileSync(soundFontUrl)
const soundFont = new SoundFont3(buffer)

describe('Write SoundFont2', () => {
  it('should write metaData', async () => {
    const metaDataBuffer = writeMetaDataChunk(soundFont.metaData)
    const metaDataChunk = soundFont.chunk.subChunks[0]

    const chunkId = metaDataBuffer.slice(0, 4).toString()
    expect(chunkId).toBe(metaDataChunk.id)

    const subBuffer = metaDataBuffer.slice(8, metaDataBuffer.length)
    const expectedBuffer = Buffer.from(
      soundFont.chunk.subChunks[0].buffer.slice(0, metaDataChunk.length)
    )

    const chunkLength = metaDataBuffer.readUInt32LE(4)
    expect(chunkLength).toBe(metaDataChunk.length)

    expect(subBuffer).toStrictEqual(expectedBuffer)
  })
})
