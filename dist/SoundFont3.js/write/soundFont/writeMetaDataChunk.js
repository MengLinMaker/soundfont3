'use strict';

var writeRiffChunk = require('./writeRiffChunk.js');
var utils = require('../utils.js');

const writeMetaDataChunk = (metaData) => {
  let metaDataBuffer = new Int8Array();
  const textEncoder = new TextEncoder();
  {
    const chunkId = "ifil";
    const soundFontVersion = metaData.version.split(".");
    const view = new DataView(new ArrayBuffer(4));
    view.setUint16(0, Number(soundFontVersion[0]), true);
    view.setUint16(2, Number(soundFontVersion[1]), true);
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, view.buffer);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "isng";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.soundEngine), 6);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  {
    const chunkId = "INAM";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.name), 2);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.rom) {
    const chunkId = "irom";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.rom), 2);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.romVersion) {
    const chunkId = "iver";
    const romVersion = metaData.romVersion.split(".");
    const iverView = new DataView(new ArrayBuffer(4));
    iverView.setUint16(0, Number(romVersion[0]));
    iverView.setUint16(2, Number(romVersion[1]));
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, iverView.buffer);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.creationDate) {
    const chunkId = "ICRD";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.creationDate), 2);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.author) {
    const chunkId = "IENG";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.author), 2);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.product) {
    const chunkId = "IPRD";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.product), 2);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.copyright) {
    const chunkId = "ICOP";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.copyright), 6);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.comments) {
    const chunkId = "ICMT";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.comments), 2);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  if (metaData.createdBy) {
    const chunkId = "ISFT";
    const chunkBuffer = writeRiffChunk.writeRiffSubChunk(chunkId, textEncoder.encode(metaData.createdBy), 2);
    metaDataBuffer = utils.concatBuffer(metaDataBuffer, chunkBuffer);
  }
  return writeRiffChunk.writeRiffTopChunk("LIST", "INFO", metaDataBuffer);
};

exports.writeMetaDataChunk = writeMetaDataChunk;
