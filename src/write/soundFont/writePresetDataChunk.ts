import { SF_PDTA_CHUNKS_ID } from '../../constants'
import { PresetData } from '../../types'
import { writeRiffSubChunk, writeRiffTopChunk } from '.'

/**
 * Writes a preset data chunk buffer.
 * @param {string} string - raw string.
 * @param {number} desiredByte - parsed presetData info.
 * @return {Buffer} Elongated string buffer.
 */
const extendStringBuffer = (string: string, desiredByte: number) => {
  const stringBuffer = Buffer.from(string)
  const padLength = desiredByte - stringBuffer.byteLength
  if (padLength < 0) return stringBuffer.slice(0, desiredByte)
  return Buffer.concat([stringBuffer, Buffer.from(new ArrayBuffer(padLength))])
}

/**
 * Writes a preset data chunk buffer.
 * @param {PresetData} presetData - parsed presetData info.
 * @return {Buffer} Chunk buffer.
 */
export const writePresetDataChunk = (presetData: PresetData) => {
  let presetDataBuffer = Buffer.from('')

  // Presets
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'phdr'
    let loopBuffer = Buffer.from('')
    presetData.presetHeaders.map((e) => {
      const nameBuffer = extendStringBuffer(e.name, 20)
      const view = new DataView(new ArrayBuffer(18))
      view.setUint16(0, e.preset, true)
      view.setUint16(2, e.bank, true)
      view.setUint16(4, e.bagIndex, true)
      view.setUint32(6, e.library, true)
      view.setUint32(10, e.genre, true)
      view.setUint32(14, e.morphology, true)
      loopBuffer = Buffer.concat([loopBuffer, nameBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'pbag'
    let loopBuffer = Buffer.from('')
    presetData.presetZones.map((e) => {
      const view = new DataView(new ArrayBuffer(4))
      view.setInt16(0, e.generatorIndex, true)
      view.setInt16(2, e.modulatorIndex, true)
      loopBuffer = Buffer.concat([loopBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'pmod'
    let loopBuffer = Buffer.from('')
    presetData.presetModulators.map((e) => {
      const view = new DataView(new ArrayBuffer(10))
      view.setUint16(0, e.source.index, true)
      view.setUint16(0, e.id, true)
      view.setInt16(0, e.value, true)
      view.setUint16(0, e.valueSource.index, true)
      view.setUint16(0, e.transform, true)
      loopBuffer = Buffer.concat([loopBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'pgen'
    let loopBuffer = Buffer.from('')
    presetData.presetGenerators.map((e) => {
      const view = new DataView(new ArrayBuffer(4))
      view.setUint16(0, e.id, true)
      const rangeDefined = typeof e.range !== 'undefined'
      const valueDefined = typeof e.value !== 'undefined'
      if (rangeDefined && valueDefined)
        throw Error(
          'Both "range" and "value" are defined in "pgen" when only one should be defined.'
        )
      else if (!rangeDefined && !valueDefined)
        Error('Neither "range" nor "value" are defined in "pgen" when only one should be defined.')
      else if (typeof e.range !== 'undefined') {
        view.setUint8(2, e.range.lo)
        view.setUint8(3, e.range.hi)
      } else if (typeof e.value !== 'undefined') {
        view.setUint16(2, e.value, true)
      }
      loopBuffer = Buffer.concat([loopBuffer, Buffer.from(view.buffer)])
    })
    loopBuffer = Buffer.concat([loopBuffer, Buffer.from(new ArrayBuffer(4))])
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }

  // Instruments
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'inst'
    let loopBuffer = Buffer.from('')
    presetData.instrumentHeaders.map((e) => {
      const nameBuffer = extendStringBuffer(e.name, 20)
      const view = new DataView(new ArrayBuffer(2))
      view.setUint16(0, e.bagIndex, true)
      loopBuffer = Buffer.concat([loopBuffer, nameBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'ibag'
    let loopBuffer = Buffer.from('')
    presetData.instrumentZones.map((e) => {
      const view = new DataView(new ArrayBuffer(4))
      view.setInt16(0, e.generatorIndex, true)
      view.setInt16(2, e.modulatorIndex, true)
      loopBuffer = Buffer.concat([loopBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'imod'
    let loopBuffer = Buffer.from('')
    presetData.instrumentModulators.map((e) => {
      const view = new DataView(new ArrayBuffer(10))
      view.setUint16(0, e.source.index, true)
      view.setUint16(0, e.id, true)
      view.setInt16(0, e.value, true)
      view.setUint16(0, e.valueSource.index, true)
      view.setUint16(0, e.transform, true)
      loopBuffer = Buffer.concat([loopBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'igen'
    let loopBuffer = Buffer.from('')
    presetData.instrumentGenerators.map((e) => {
      const view = new DataView(new ArrayBuffer(4))
      view.setUint16(0, e.id, true)
      const rangeDefined = typeof e.range !== 'undefined'
      const valueDefined = typeof e.value !== 'undefined'
      if (rangeDefined && valueDefined)
        throw Error(
          'Both "range" and "value" are defined in "pgen" when only one should be defined.'
        )
      else if (!rangeDefined && !valueDefined)
        Error('Neither "range" nor "value" are defined in "pgen" when only one should be defined.')
      else if (typeof e.range !== 'undefined') {
        view.setUint8(2, e.range.lo)
        view.setUint8(3, e.range.hi)
      } else if (typeof e.value !== 'undefined') {
        view.setUint16(2, e.value, true)
      }
      loopBuffer = Buffer.concat([loopBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }

  // Samples
  {
    const chunkId: SF_PDTA_CHUNKS_ID = 'shdr'
    let loopBuffer = Buffer.from('')
    presetData.sampleHeaders.map((e) => {
      const nameBuffer = extendStringBuffer(e.name, 20)
      const view = new DataView(new ArrayBuffer(26))
      view.setUint32(0, e.start, true)
      view.setUint32(4, e.end, true)
      view.setUint32(8, e.start + e.startLoop, true)
      view.setUint32(12, e.start + e.endLoop, true)
      view.setUint32(16, e.sampleRate, true)
      view.setUint8(20, e.originalPitch)
      view.setInt8(21, e.pitchCorrection)
      view.setUint16(22, e.link, true)
      view.setUint16(24, e.type, true)
      loopBuffer = Buffer.concat([loopBuffer, nameBuffer, Buffer.from(view.buffer)])
    })
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer)
    presetDataBuffer = Buffer.concat([presetDataBuffer, chunkBuffer])
  }

  return writeRiffTopChunk('LIST', 'pdta', presetDataBuffer)
}
