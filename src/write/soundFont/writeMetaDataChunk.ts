import type { SF_INFO_CHUNKS_ID } from '../../constants'
import type { MetaData } from '../../types'
import { concatBuffer } from '../utils'
import { writeRiffSubChunk, writeRiffTopChunk } from './writeRiffChunk'

/**
 * Writes a metadata chunk buffer.
 * @param {MetaData} metaData - parsed metadata info.
 * @return {Buffer} Chunk buffer.
 */
export const writeMetaDataChunk = (metaData: MetaData) => {
  let metaDataBuffer = new Int8Array()
  const textEncoder = new TextEncoder()
  {
    // Scope variables to prevent leakage
    const chunkId: SF_INFO_CHUNKS_ID = 'ifil'
    const soundFontVersion = metaData.version.split('.')
    const view = new DataView(new ArrayBuffer(4))
    view.setUint16(0, Number(soundFontVersion[0]), true)
    view.setUint16(2, Number(soundFontVersion[1]), true)
    const chunkBuffer = writeRiffSubChunk(chunkId, view.buffer)
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_INFO_CHUNKS_ID = 'isng'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.soundEngine),
      6,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_INFO_CHUNKS_ID = 'INAM'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.name),
      2,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }

  // 8 non-essential metadata
  if (metaData.rom) {
    const chunkId: SF_INFO_CHUNKS_ID = 'irom'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.rom),
      2,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  if (metaData.romVersion) {
    const chunkId: SF_INFO_CHUNKS_ID = 'iver'
    const romVersion = metaData.romVersion.split('.')
    const iverView = new DataView(new ArrayBuffer(4))
    iverView.setUint16(0, Number(romVersion[0]))
    iverView.setUint16(2, Number(romVersion[1]))
    const chunkBuffer = writeRiffSubChunk(chunkId, iverView.buffer)
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  if (metaData.creationDate) {
    const chunkId: SF_INFO_CHUNKS_ID = 'ICRD'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.creationDate),
      2,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  if (metaData.author) {
    const chunkId: SF_INFO_CHUNKS_ID = 'IENG'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.author),
      2,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  if (metaData.product) {
    const chunkId: SF_INFO_CHUNKS_ID = 'IPRD'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.product),
      2,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  if (metaData.copyright) {
    const chunkId: SF_INFO_CHUNKS_ID = 'ICOP'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.copyright),
      6,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  if (metaData.comments) {
    const chunkId: SF_INFO_CHUNKS_ID = 'ICMT'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.comments),
      2,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  if (metaData.createdBy) {
    const chunkId: SF_INFO_CHUNKS_ID = 'ISFT'
    const chunkBuffer = writeRiffSubChunk(
      chunkId,
      textEncoder.encode(metaData.createdBy),
      2,
    )
    metaDataBuffer = concatBuffer([metaDataBuffer, chunkBuffer])
  }
  return writeRiffTopChunk('LIST', 'INFO', metaDataBuffer)
}
