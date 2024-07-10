import { MetaData, PresetData, Sample, SampleData } from 'soundfont2'

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
export const dataViewWriteString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i))
  }
}

/**
 * Concats 2 ArrayBuffers
 * @param {ArrayBuffer} buffer1
 * @param {ArrayBuffer} buffer2
 * @return {Int8Array}
 */
export const concatBuffer = (buffer1: ArrayBuffer, buffer2: ArrayBuffer) => {
  const tmp = new Int8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Int8Array(buffer1), 0)
  tmp.set(new Int8Array(buffer2), buffer1.byteLength)
  return new Int8Array(tmp.buffer)
}
