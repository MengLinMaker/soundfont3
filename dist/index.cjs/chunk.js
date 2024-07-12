'use strict';

var parseError = require('./riff/parseError.js');
var riffChunk = require('./riff/riffChunk.js');
var constants = require('./constants.js');
var instruments = require('./chunks/instruments.js');
var presets = require('./chunks/presets.js');
var samples = require('./chunks/samples.js');
var generators = require('./chunks/parsers/generators.js');
var modulators = require('./chunks/parsers/modulators.js');
var zones = require('./chunks/parsers/zones.js');

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class SF2Chunk extends riffChunk.RIFFChunk {
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
      throw new parseError.ParseError("Unexpected chunk ID", `'LIST'`, `'${this.id}'`);
    }
    const info = this.subChunks.reduce((target, chunk) => {
      if (chunk.id === "ifil" || chunk.id === "iver") {
        if (chunk.length !== constants.SF_VERSION_LENGTH) {
          throw new parseError.ParseError(`Invalid size for the '${chunk.id}' sub-chunk`);
        }
        target[chunk.id] = `${chunk.getInt16()}.${chunk.getInt16(2)}`;
      } else {
        target[chunk.id] = chunk.getString();
      }
      return target;
    }, {});
    if (!info.ifil) {
      throw new parseError.ParseError(`Missing required 'ifil' sub-chunk`);
    }
    if (!info.INAM) {
      throw new parseError.ParseError(`Missing required 'INAM' sub-chunk`);
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
      throw new parseError.ParseError("Unexpected chunk ID", `'LIST'`, `'${this.id}'`);
    }
    const sampleChunk = this.subChunks[0];
    if (sampleChunk.id !== "smpl") {
      throw new parseError.ParseError("Invalid chunk signature", `'smpl'`, `'${sampleChunk.id}'`);
    }
    return new Uint8Array(sampleChunk.buffer);
  }
  /**
   * Get the preset data from the chunk. This assumes the chunk is a LIST chunk containing the
   * preset data sub-chunks.
   */
  getPresetData() {
    if (!this.validMetaDataChunkId()) {
      throw new parseError.ParseError("Unexpected chunk ID", `'LIST'`, `'${this.id}'`);
    }
    return {
      presetHeaders: presets.getPresetHeaders(this.subChunks[0]),
      presetZones: zones.getZones(this.subChunks[1], "pbag"),
      presetModulators: modulators.getModulators(this.subChunks[2], "pmod"),
      presetGenerators: generators.getGenerators(this.subChunks[3], "pgen"),
      instrumentHeaders: instruments.getInstrumentHeaders(this.subChunks[4]),
      instrumentZones: zones.getZones(this.subChunks[5], "ibag"),
      instrumentModulators: modulators.getModulators(this.subChunks[6], "imod"),
      instrumentGenerators: generators.getGenerators(this.subChunks[7], "igen"),
      sampleHeaders: samples.getSampleHeaders(this.subChunks[8])
    };
  }
}

exports.SF2Chunk = SF2Chunk;
