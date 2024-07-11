import { ParseError } from './riff/parseError.js';
import { RIFFChunk } from './riff/riffChunk.js';
import { SF_VERSION_LENGTH } from './constants.js';
import { getInstrumentHeaders } from './chunks/instruments.js';
import { getPresetHeaders } from './chunks/presets.js';
import { getSampleHeaders } from './chunks/samples.js';
import { getGenerators } from './chunks/parsers/generators.js';
import { getModulators } from './chunks/parsers/modulators.js';
import { getZones } from './chunks/parsers/zones.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class SF2Chunk extends RIFFChunk {
  constructor(chunk) {
    super(chunk.id, chunk.length, chunk.buffer, chunk.subChunks);
    /**
     * All sub-chunks of this `SF2Chunk` as `SF2Chunk`.
     */
    __publicField(this, "subChunks");
    this.subChunks = chunk.subChunks.map((subChunk) => new SF2Chunk(subChunk));
  }
  /**
   * Get meta data from the chunk. This assumes the chunk is a LIST chunk, containing INFO
   * sub-chunks.
   */
  validMetaDataChunkId() {
    return this.id === "LIST";
  }
  getMetaData() {
    if (!this.validMetaDataChunkId()) {
      throw new ParseError("Unexpected chunk ID", `'LIST'`, `'${this.id}'`);
    }
    const info = this.subChunks.reduce((target, chunk) => {
      if (chunk.id === "ifil" || chunk.id === "iver") {
        if (chunk.length !== SF_VERSION_LENGTH) {
          throw new ParseError(`Invalid size for the '${chunk.id}' sub-chunk`);
        }
        target[chunk.id] = `${chunk.getInt16()}.${chunk.getInt16(2)}`;
      } else {
        target[chunk.id] = chunk.getString();
      }
      return target;
    }, {});
    if (!info.ifil) {
      throw new ParseError(`Missing required 'ifil' sub-chunk`);
    }
    if (!info.INAM) {
      throw new ParseError(`Missing required 'INAM' sub-chunk`);
    }
    return {
      version: info.ifil,
      soundEngine: info.isng || "EMU8000",
      name: info.INAM,
      rom: info.irom,
      romVersion: info.iver,
      creationDate: info.ICRD,
      author: info.IENG,
      product: info.IPRD,
      copyright: info.ICOP,
      comments: info.ICMT,
      createdBy: info.ISFT
    };
  }
  /**
   * Get the sample data as a unsigned 8-bit buffer from the chunk. This assumes the chunk is a
   * LIST chunk containing a smpl sub-chunk.
   */
  getSampleData() {
    if (!this.validMetaDataChunkId()) {
      throw new ParseError("Unexpected chunk ID", `'LIST'`, `'${this.id}'`);
    }
    const sampleChunk = this.subChunks[0];
    if (sampleChunk.id !== "smpl") {
      throw new ParseError("Invalid chunk signature", `'smpl'`, `'${sampleChunk.id}'`);
    }
    return new Uint8Array(sampleChunk.buffer);
  }
  /**
   * Get the preset data from the chunk. This assumes the chunk is a LIST chunk containing the
   * preset data sub-chunks.
   */
  getPresetData() {
    if (!this.validMetaDataChunkId()) {
      throw new ParseError("Unexpected chunk ID", `'LIST'`, `'${this.id}'`);
    }
    return {
      presetHeaders: getPresetHeaders(this.subChunks[0]),
      presetZones: getZones(this.subChunks[1], "pbag"),
      presetModulators: getModulators(this.subChunks[2], "pmod"),
      presetGenerators: getGenerators(this.subChunks[3], "pgen"),
      instrumentHeaders: getInstrumentHeaders(this.subChunks[4]),
      instrumentZones: getZones(this.subChunks[5], "ibag"),
      instrumentModulators: getModulators(this.subChunks[6], "imod"),
      instrumentGenerators: getGenerators(this.subChunks[7], "igen"),
      sampleHeaders: getSampleHeaders(this.subChunks[8])
    };
  }
}

export { SF2Chunk };
