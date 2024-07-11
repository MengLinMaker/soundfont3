'use strict';

var utils = require('../utils.js');

function pcm16BufferToWav(sampleRate, pcm16Buffer) {
  const channelCount = 1;
  const headerBuffer = new ArrayBuffer(44);
  const headerView = new DataView(headerBuffer);
  utils.dataViewWriteString(headerView, 0, "RIFF");
  headerView.setUint32(4, 44 + pcm16Buffer.byteLength, true);
  utils.dataViewWriteString(headerView, 8, "WAVE");
  utils.dataViewWriteString(headerView, 12, "fmt ");
  headerView.setUint32(16, 16, true);
  headerView.setUint16(20, 1, true);
  headerView.setUint16(22, channelCount, true);
  headerView.setUint32(24, sampleRate, true);
  headerView.setUint32(28, sampleRate * channelCount * 2, true);
  headerView.setUint16(32, channelCount * 2, true);
  headerView.setUint16(34, 16, true);
  utils.dataViewWriteString(headerView, 36, "data");
  headerView.setUint32(40, 8 + pcm16Buffer.byteLength, true);
  const wavFileBuffer = Buffer.concat([Buffer.from(headerBuffer), Buffer.from(pcm16Buffer)]);
  return wavFileBuffer;
}

exports.pcm16BufferToWav = pcm16BufferToWav;
