'use strict';

var utils = require('./utils.js');

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class ChunkIterator {
  constructor(chunk, start = 0) {
    __publicField(this, "target", []);
    __publicField(this, "chunk");
    __publicField(this, "position", 0);
    this.chunk = chunk;
    this.position = start;
  }
  /**
   * Get the position from the iterator.
   */
  get currentPosition() {
    return this.position;
  }
  /**
   * Iterate over the chunk.
   *
   * @param {Function} callback - The callback that is called every iteration
   */
  iterate(callback) {
    while (this.position < this.chunk.length) {
      const object = callback(this);
      if (object) {
        this.target.push(object);
      }
    }
  }
  /**
   * Get a string from the buffer.
   *
   * @param {number} length - The length of the string. If no length is specified, a default of 20
   *   is assumed
   */
  getString(length = 20) {
    const text = utils.getStringFromBuffer(this.getBuffer(this.position, length));
    this.position += length;
    return text;
  }
  /**
   * Get a signed 16-bit integer from the chunk.
   */
  getInt16() {
    return this.chunk.buffer[this.position++] | this.chunk.buffer[this.position++] << 8;
  }
  /**
   * Get a signed 16-bit integer from the chunk in the big-endian format.
   */
  getInt16BE() {
    return this.getInt16() << 16 >> 16;
  }
  /**
   * Get an unsigned 32-bit integer from the chunk.
   */
  getUInt32() {
    return (this.chunk.buffer[this.position++] | this.chunk.buffer[this.position++] << 8 | this.chunk.buffer[this.position++] << 16 | this.chunk.buffer[this.position++] << 24) >>> 0;
  }
  /**
   * Get a single byte from the chunk.
   */
  getByte() {
    return this.chunk.buffer[this.position++];
  }
  /**
   * Get a signed char from the chunk.
   */
  getChar() {
    return this.chunk.buffer[this.position++] << 24 >> 24;
  }
  /**
   * Skip ahead in the buffer.
   *
   * @param {number} length
   */
  skip(length) {
    this.position += length;
  }
  /**
   * Get a part of the buffer from start to start + length.
   *
   * @param {number} start
   * @param {number} length
   */
  getBuffer(start, length) {
    return this.chunk.buffer.subarray(start, start + length);
  }
}

exports.ChunkIterator = ChunkIterator;
