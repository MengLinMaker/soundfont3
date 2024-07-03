import { MetaData } from '../src/types/metaData'
import { writePresetDataChunk } from '../src/write/writePresetDataChunk'
import { writeMetaDataChunk } from '../src/write/writeMetaDataChunk'
import { join } from 'path'
import { SoundFont3 } from '../src/soundFont3'
import { readFileSync } from 'fs'
import { SF_TOP_CHUNKS_FORMAT, SF_TOP_CHUNKS_ID } from '../src/constants'
import { writeSampleDataChunk } from '../src/write/writeSampleDataChunk'
import { writeSoundFont } from '../src/writeSoundFont'
import { writeRiffSubChunk } from '../src/write'

const soundFontUrl = join(__dirname, 'fonts/piano.sf2')
const buffer = readFileSync(soundFontUrl)
const soundFont = new SoundFont3(buffer)

describe('Write SoundFont2', () => {
  it('Only accept even padding', async () => {
    const someBuffer = Buffer.from('')
    expect(() => writeRiffSubChunk('ICMT', someBuffer, 1)).toThrow(Error)
  })

  it('should write all metaData info', async () => {
    const metaData: MetaData = {
      version: '2.10',
      soundEngine: 'a',
      name: 'b',
      rom: 'c',
      romVersion: '1.1',
      creationDate: 'd',
      author: 'e',
      product: 'f',
      copyright: 'g',
      comments: 'h',
      createdBy: 'i'
    }
    const expectedBuffer = Buffer.from(
      new Int8Array([
        76,
        73,
        83,
        84, // 'LIST'
        126,
        0,
        0,
        0, // 126 byte
        73,
        78,
        70,
        79, // 'INFO'

        105,
        102,
        105,
        108, // 'ifil'
        4,
        0,
        0,
        0, // 4 byte
        2,
        0, // Version major 2
        10,
        0, // Version minor 10

        105,
        115,
        110,
        103, // 'isng'
        6,
        0,
        0,
        0, // 6 byte
        97,
        0,
        0,
        0,
        0,
        0, // "a" with 5 byte pad

        73,
        78,
        65,
        77, // 'INAM'
        2,
        0,
        0,
        0, // 2 byte
        98,
        0, // "b" with 1 byte pad

        105,
        114,
        111,
        109, // 'irom'
        2,
        0,
        0,
        0, // 2 byte
        99,
        0, // "c" with 1 byte pad

        105,
        118,
        101,
        114, // 'iver'
        4,
        0,
        0,
        0, // 4 byte
        0,
        1, // Version major 1
        0,
        1, // Version minor 1

        73,
        67,
        82,
        68, // 'ICRD'
        2,
        0,
        0,
        0, // 2 byte
        100,
        0, // "d" with 1 byte pad

        73,
        69,
        78,
        71, // 'IENG'
        2,
        0,
        0,
        0, // 2 byte
        101,
        0, // "e" with 1 byte pad

        73,
        80,
        82,
        68, // 'IPDR'
        2,
        0,
        0,
        0, // 2 byte
        102,
        0, // "f" with 1 byte pad

        73,
        67,
        79,
        80, // 'ICOP'
        6,
        0,
        0,
        0, // 6 byte
        103,
        0,
        0,
        0,
        0,
        0, // "g" with 5 byte pad

        73,
        67,
        77,
        84, // 'ICMT'
        2,
        0,
        0,
        0, // 2 byte
        104,
        0, // "h" with 1 byte pad

        73,
        83,
        70,
        84, // 'ISFT'
        2,
        0,
        0,
        0, // 2 byte
        105,
        0 // "i" with 1 byte pad
      ])
    )
    const metaDataBuffer = writeMetaDataChunk(metaData)
    expect(metaDataBuffer).toStrictEqual(expectedBuffer)
  })

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

  it('should write sampleData', async () => {
    const sampleDataBuffer = writeSampleDataChunk(soundFont.sampleData)
    const expectedBuffer = Buffer.from(soundFont.chunk.subChunks[1].subChunks[0].buffer)
    // Slice 12 bytes from 'sdta', then slice 8 bytes from 'smpl'
    const subBuffer = sampleDataBuffer.slice(20, sampleDataBuffer.length)

    const expectedChunkId: SF_TOP_CHUNKS_ID = 'LIST'
    const chunkId = sampleDataBuffer.slice(0, 4).toString()
    expect(chunkId).toBe(expectedChunkId)

    const chunkLength = sampleDataBuffer.readUInt32LE(16)
    expect(chunkLength).toBe(expectedBuffer.length)
    expect(chunkLength).toBe(subBuffer.length)

    const expectedFormat: SF_TOP_CHUNKS_FORMAT = 'sdta'
    const format = sampleDataBuffer.slice(8, 12).toString()
    expect(format).toBe(expectedFormat)

    expect(subBuffer.equals(expectedBuffer)).toBe(true)
  })

  it('should write presetData', async () => {
    const presetDataBuffer = writePresetDataChunk(soundFont.presetData)
    const expectedBuffer = soundFont.chunk.subChunks[2].buffer
    const subBuffer = presetDataBuffer.slice(8, presetDataBuffer.length)

    const expectedChunkId: SF_TOP_CHUNKS_ID = 'LIST'
    const chunkId = presetDataBuffer.slice(0, 4).toString()
    expect(chunkId).toBe(expectedChunkId)

    const chunkLength = presetDataBuffer.readUInt32LE(4)
    expect(chunkLength).toBe(expectedBuffer.byteLength)
    expect(chunkLength).toBe(subBuffer.byteLength)

    const expectedFormat: SF_TOP_CHUNKS_FORMAT = 'pdta'
    const format = subBuffer.slice(0, 4).toString()
    expect(format).toBe(expectedFormat)

    expect(subBuffer).toStrictEqual(expectedBuffer)
  })

  it('should write same parsable SoundFont', async () => {
    const newSoundFontBuffer = writeSoundFont(soundFont)
    const newSoundFont = new SoundFont3(newSoundFontBuffer)

    expect(newSoundFont.metaData).toStrictEqual(soundFont.metaData)
    expect(newSoundFont.presetData).toStrictEqual(soundFont.presetData)
  })
})
