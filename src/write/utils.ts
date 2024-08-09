import type { MetaData } from '../types/metaData'
import type { PresetData } from '../types/presetData'
import type { Sample, SampleData } from '../types/sample'

export type SoundFont2Raw = {
  metaData: MetaData
  sampleData: SampleData
  presetData: PresetData
  samples: Sample[]
}

/**
 * Inserts a string into buffer at offset.
 * @param {DataView} view -DataView of a buffer.
 * @param {number} offset - offset in DataView.
 * @param {string} string - string to insert into DataView.
 */
export const dataViewWriteString = (
  view: DataView,
  offset: number,
  string: string,
) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

/**
 * Concats ArrayBuffers
 * @param {ArrayBuffer[]} buffers
 * @return {Uint8Array}
 */
export const concatBuffer = (buffers: ArrayBuffer[]) => {
  const lengths = buffers.map((buffer) => buffer.byteLength)
  const totalLength = lengths.reduce(
    (partialLength, length) => partialLength + length,
    0,
  )
  const tmp = new Uint8Array(totalLength)

  let offset = 0
  buffers.map((buffer, i) => {
    tmp.set(new Uint8Array(buffer), offset)
    offset += lengths[i]
  })
  return new Uint8Array(tmp.buffer)
}
