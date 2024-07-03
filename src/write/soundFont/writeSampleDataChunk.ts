import { SampleData } from '../../types'
import { SF_SDTA_CHUNKS_ID } from '../../constants'
import { writeRiffSubChunk, writeRiffTopChunk } from '.'

/**
 * Writes a sample data chunk buffer.
 * @param {SampleData} sampleData - parsed sample data info.
 * @return {Buffer} Chunk buffer.
 */
export const writeSampleDataChunk = (sampleData: SampleData) => {
  // 16 bit wav or ogg file
  const chunkId: SF_SDTA_CHUNKS_ID = 'smpl'
  const chunkBuffer = writeRiffSubChunk(chunkId, Buffer.from(sampleData))
  return writeRiffTopChunk('LIST', 'sdta', chunkBuffer)
}
