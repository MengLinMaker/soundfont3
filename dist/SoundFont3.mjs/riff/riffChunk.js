import { ChunkIterator } from './chunkIterator.js';
import { getStringFromBuffer } from './utils.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class RIFFChunk {
  constructor(id, length, buffer, subChunks) {
    /**
     * The chunk ID (fourCC).
     */
    __publicField(this, "id");
    /**
     * The length of the chunk.
     */
    __publicField(this, "length");
    /**
     * The raw buffer of the chunk.
     */
    __publicField(this, "buffer");
    /**
     * The sub-chunks of the chunk. If the chunk is not a RIFF or LIST chunk, this will be an empty
     * array.
     */
    __publicField(this, "subChunks");
    this.id = id;
    this.length = length;
    this.buffer = buffer;
    this.subChunks = subChunks;
  }
  /**
   * Get a string from the buffer. If no position and no length is specified, it returns the whole
   * buffer as a string.
   *
   * @param {number} [position]
   * @param {number} [length]
   */
  getString(position = 0, length) {
    return getStringFromBuffer(this.getBuffer(position, length || this.length - position));
  }
  /**
   * Get a signed 16-bit integer from the buffer.
   *
   * @param {number} [position]
   */
  getInt16(position = 0) {
    return this.buffer[position++] | this.buffer[position] << 8;
  }
  /**
   * Get an unsigned 32-bit integer from the buffer.
   *
   * @param {number} [position]
   */
  getUInt32(position = 0) {
    return (this.buffer[position++] | this.buffer[position++] << 8 | this.buffer[position++] << 16 | this.buffer[position] << 24) >>> 0;
  }
  /**
   * Get a byte from the buffer.
   *
   * @param {number} [position]
   */
  getByte(position = 0) {
    return this.buffer[position];
  }
  /**
   * Get a char from the buffer.
   *
   * @param {number} [position]
   */
  getChar(position = 0) {
    return this.buffer[position] << 24 >> 24;
  }
  /**
   * Get a chunk iterator for the chunk.
   *
   * @param {number} [start] - The position where to start iterating. Defaults to 0.
   */
  iterator(start = 0) {
    return new ChunkIterator(this, start);
  }
  /**
   * Utility function to quickly iterate over a function.
   *
   * @template T
   * @param {(iterator: ChunkIterator): T} callback - The callback that returns an instance of the
   *   specified return type
   * @param {number} [start] - The optional index where to start iterating over the chunk
   */
  iterate(callback, start = 0) {
    const iterator = new ChunkIterator(this, start);
    iterator.iterate(callback);
    return iterator.target;
  }
  /**
   * Get a buffer from `start` to `start` + `length`. The buffer is not copied (e.g. when using
   * .slice()), so any modifications to the buffer are done to the original buffer too.
   *
   * @param {number} start
   * @param {number} length
   */
  getBuffer(start, length) {
    return this.buffer.subarray(start, start + length);
  }
}

export { RIFFChunk };
