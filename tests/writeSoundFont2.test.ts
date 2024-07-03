import { writePresetDataChunk } from './../src/write/writePresetDataChunk'
import { writeMetaDataChunk } from '../src/write/writeMetaDataChunk'
import { join } from 'path'
import { SoundFont3 } from '../src/soundFont3'
import { readFileSync } from 'fs'
import { SF_TOP_CHUNKS_FORMAT, SF_TOP_CHUNKS_ID } from '../src/constants'

const soundFontUrl = join(__dirname, 'fonts/piano.sf2')
const buffer = readFileSync(soundFontUrl)
const soundFont = new SoundFont3(buffer)

describe('Write SoundFont2', () => {
  it('should write metaData', async () => {
    const metaDataBuffer = writeMetaDataChunk(soundFont.metaData)
    const metaDataChunk = soundFont.chunk.subChunks[0]
    const subBuffer = metaDataBuffer.slice(8, metaDataBuffer.length)
    const expectedBuffer = Buffer.from(metaDataChunk.buffer.slice(0, metaDataChunk.length))

    const expectedChunkId: SF_TOP_CHUNKS_ID = 'LIST'
    const chunkId = metaDataBuffer.slice(0, 4).toString()
    expect(chunkId).toBe(expectedChunkId)

    const chunkLength = metaDataBuffer.readUInt32LE(4)
    expect(chunkLength).toBe(metaDataChunk.length)

    const expectedFormat: SF_TOP_CHUNKS_FORMAT = 'INFO'
    const format = subBuffer.slice(0, 4).toString()
    expect(format).toBe(expectedFormat)

    expect(subBuffer).toStrictEqual(expectedBuffer)
  })

  it('should write presetData', async () => {
    const presetDataBuffer = writePresetDataChunk(soundFont.presetData)
    const presetDataChunk = soundFont.chunk.subChunks[2]
    const subBuffer = presetDataBuffer.slice(8, presetDataBuffer.length)
    const expectedBuffer = Buffer.from(presetDataChunk.buffer.slice(0, presetDataChunk.length))

    const expectedChunkId: SF_TOP_CHUNKS_ID = 'LIST'
    const chunkId = presetDataBuffer.slice(0, 4).toString()
    expect(chunkId).toBe(expectedChunkId)

    const chunkLength = presetDataBuffer.readUInt32LE(4)
    expect(chunkLength).toBe(presetDataChunk.length)

    const expectedFormat: SF_TOP_CHUNKS_FORMAT = 'pdta'
    const format = subBuffer.slice(0, 4).toString()
    expect(format).toBe(expectedFormat)

    expect(subBuffer).toStrictEqual(expectedBuffer)
  })
})
