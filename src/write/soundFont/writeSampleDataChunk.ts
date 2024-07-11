import { SampleData } from '../../types'
import { SF_SDTA_CHUNKS_ID } from '../../constants'
import { writeRiffSubChunk, writeRiffTopChunk } from './writeRiffChunk'

/**
 * Writes a sample data chunk buffer.
 * @param {SampleData} sampleData - parsed sample data info.
 * @return {Buffer} Chunk buffer.
 */
export const writeSampleDataChunk = (sampleData: SampleData | Uint8Array) => {
  // 16 bit wav or ogg file
  const chunkId: SF_SDTA_CHUNKS_ID = 'smpl'
  const chunkBuffer = writeRiffSubChunk(chunkId, sampleData)
  return writeRiffTopChunk('LIST', 'sdta', chunkBuffer)
}
