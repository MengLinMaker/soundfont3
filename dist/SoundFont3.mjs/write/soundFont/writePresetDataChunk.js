import { writeRiffSubChunk, writeRiffTopChunk } from './writeRiffChunk.js';
import { concatBuffer } from '../utils.js';

const extendStringBuffer = (string, desiredByte) => {
  const textEncoder = new TextEncoder();
  const stringBuffer = textEncoder.encode(string);
  const padLength = desiredByte - stringBuffer.byteLength;
  if (padLength < 0) return stringBuffer.slice(0, desiredByte);
  return concatBuffer(stringBuffer, new ArrayBuffer(padLength));
};
const writePresetDataChunk = (presetData) => {
  let presetDataBuffer = new Int8Array();
  {
    const chunkId = "phdr";
    let loopBuffer = new Int8Array();
    presetData.presetHeaders.map((e) => {
      const nameBuffer = extendStringBuffer(e.name, 20);
      const view = new DataView(new ArrayBuffer(18));
      view.setUint16(0, e.preset, true);
      view.setUint16(2, e.bank, true);
      view.setUint16(4, e.bagIndex, true);
      view.setUint32(6, e.library, true);
      view.setUint32(10, e.genre, true);
      view.setUint32(14, e.morphology, true);
      loopBuffer = concatBuffer(loopBuffer, concatBuffer(nameBuffer, view.buffer));
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "pbag";
    let loopBuffer = new Int8Array();
    presetData.presetZones.map((e) => {
      const view = new DataView(new ArrayBuffer(4));
      view.setInt16(0, e.generatorIndex, true);
      view.setInt16(2, e.modulatorIndex, true);
      loopBuffer = concatBuffer(loopBuffer, view.buffer);
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "pmod";
    let loopBuffer = new Int8Array();
    presetData.presetModulators.map((e) => {
      const view = new DataView(new ArrayBuffer(10));
      view.setUint16(0, e.source.index, true);
      view.setUint16(0, e.id, true);
      view.setInt16(0, e.value, true);
      view.setUint16(0, e.valueSource.index, true);
      view.setUint16(0, e.transform, true);
      loopBuffer = concatBuffer(loopBuffer, view.buffer);
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "pgen";
    let loopBuffer = new Int8Array();
    presetData.presetGenerators.map((e) => {
      const view = new DataView(new ArrayBuffer(4));
      view.setUint16(0, e.id, true);
      const rangeDefined = typeof e.range !== "undefined";
      const valueDefined = typeof e.value !== "undefined";
      if (rangeDefined && valueDefined)
        throw Error(
          'Both "range" and "value" are defined in "pgen" when only one should be defined.'
        );
      else if (!rangeDefined && !valueDefined)
        ;
      else if (typeof e.range !== "undefined") {
        view.setUint8(2, e.range.lo);
        view.setUint8(3, e.range.hi);
      } else if (typeof e.value !== "undefined") {
        view.setUint16(2, e.value, true);
      }
      loopBuffer = concatBuffer(loopBuffer, view.buffer);
    });
    loopBuffer = concatBuffer(loopBuffer, new ArrayBuffer(4));
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "inst";
    let loopBuffer = new Int8Array();
    presetData.instrumentHeaders.map((e) => {
      const nameBuffer = extendStringBuffer(e.name, 20);
      const view = new DataView(new ArrayBuffer(2));
      view.setUint16(0, e.bagIndex, true);
      loopBuffer = concatBuffer(loopBuffer, concatBuffer(nameBuffer, view.buffer));
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "ibag";
    let loopBuffer = new Int8Array();
    presetData.instrumentZones.map((e) => {
      const view = new DataView(new ArrayBuffer(4));
      view.setInt16(0, e.generatorIndex, true);
      view.setInt16(2, e.modulatorIndex, true);
      loopBuffer = concatBuffer(loopBuffer, view.buffer);
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "imod";
    let loopBuffer = new Int8Array();
    presetData.instrumentModulators.map((e) => {
      const view = new DataView(new ArrayBuffer(10));
      view.setUint16(0, e.source.index, true);
      view.setUint16(0, e.id, true);
      view.setInt16(0, e.value, true);
      view.setUint16(0, e.valueSource.index, true);
      view.setUint16(0, e.transform, true);
      loopBuffer = concatBuffer(loopBuffer, view.buffer);
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "igen";
    let loopBuffer = new Int8Array();
    presetData.instrumentGenerators.map((e) => {
      const view = new DataView(new ArrayBuffer(4));
      view.setUint16(0, e.id, true);
      const rangeDefined = typeof e.range !== "undefined";
      const valueDefined = typeof e.value !== "undefined";
      if (rangeDefined && valueDefined)
        throw Error(
          'Both "range" and "value" are defined in "pgen" when only one should be defined.'
        );
      else if (!rangeDefined && !valueDefined)
        ;
      else if (typeof e.range !== "undefined") {
        view.setUint8(2, e.range.lo);
        view.setUint8(3, e.range.hi);
      } else if (typeof e.value !== "undefined") {
        view.setUint16(2, e.value, true);
      }
      loopBuffer = concatBuffer(loopBuffer, view.buffer);
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "shdr";
    let loopBuffer = new Int8Array();
    presetData.sampleHeaders.map((e) => {
      const nameBuffer = extendStringBuffer(e.name, 20);
      const view = new DataView(new ArrayBuffer(26));
      view.setUint32(0, e.start, true);
      view.setUint32(4, e.end, true);
      view.setUint32(8, e.start + e.startLoop, true);
      view.setUint32(12, e.start + e.endLoop, true);
      view.setUint32(16, e.sampleRate, true);
      view.setUint8(20, e.originalPitch);
      view.setInt8(21, e.pitchCorrection);
      view.setUint16(22, e.link, true);
      view.setUint16(24, e.type, true);
      loopBuffer = concatBuffer(loopBuffer, concatBuffer(nameBuffer, view.buffer));
    });
    const chunkBuffer = writeRiffSubChunk(chunkId, loopBuffer);
    presetDataBuffer = concatBuffer(presetDataBuffer, chunkBuffer);
  }
  return writeRiffTopChunk("LIST", "pdta", presetDataBuffer);
};

export { writePresetDataChunk };
