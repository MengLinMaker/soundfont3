import { RIFFChunk } from './riff/riffChunk.js'
import { MetaData } from './types/metaData.js'
import { PresetData } from './types/presetData.js'

declare class SF2Chunk extends RIFFChunk {
  /**
   * All sub-chunks of this `SF2Chunk` as `SF2Chunk`.
   */
  readonly subChunks: SF2Chunk[]
  constructor(chunk: RIFFChunk)
  /**
   * Get meta data from the chunk. This assumes the chunk is a LIST chunk, containing INFO
   * sub-chunks.
   */
  private validMetaDataChunkId
  getMetaData(): MetaData
  /**
   * Get the sample data as a unsigned 8-bit buffer from the chunk. This assumes the chunk is a
   * LIST chunk containing a smpl sub-chunk.
   */
  getSampleData(): Uint8Array
  /**
   * Get the preset data from the chunk. This assumes the chunk is a LIST chunk containing the
   * preset data sub-chunks.
   */
  getPresetData(): PresetData
}

export { SF2Chunk }
