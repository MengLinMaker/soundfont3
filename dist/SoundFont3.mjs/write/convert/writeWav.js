import { dataViewWriteString } from '../utils.js';

function pcm16BufferToWav(sampleRate, pcm16Buffer) {
  const channelCount = 1;
  const headerBuffer = new ArrayBuffer(44);
  const headerView = new DataView(headerBuffer);
  dataViewWriteString(headerView, 0, "RIFF");
  headerView.setUint32(4, 44 + pcm16Buffer.byteLength, true);
  dataViewWriteString(headerView, 8, "WAVE");
  dataViewWriteString(headerView, 12, "fmt ");
  headerView.setUint32(16, 16, true);
  headerView.setUint16(20, 1, true);
  headerView.setUint16(22, channelCount, true);
  headerView.setUint32(24, sampleRate, true);
  headerView.setUint32(28, sampleRate * channelCount * 2, true);
  headerView.setUint16(32, channelCount * 2, true);
  headerView.setUint16(34, 16, true);
  dataViewWriteString(headerView, 36, "data");
  headerView.setUint32(40, 8 + pcm16Buffer.byteLength, true);
  const wavFileBuffer = Buffer.concat([Buffer.from(headerBuffer), Buffer.from(pcm16Buffer)]);
  return wavFileBuffer;
}

export { pcm16BufferToWav };
