'use strict';

var soundFont3 = require('../soundFont3.js');
var writeSoundFont = require('./writeSoundFont.js');
var writeWav = require('./convert/writeWav.js');

const toSoundFont3 = async (_soundFont, config = {
  bitrate: 32,
  sampleRate: 44100,
  oggCompressionAlgorithm: "vorbis"
}, folderPath = `soundfont-${crypto.randomUUID()}`) => {
  if (typeof document !== "undefined") throw Error("WebCodecs not supported yet.");
  const { existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } = await import('fs');
  const { execSync } = await import('child_process');
  if (!existsSync(folderPath)) mkdirSync(folderPath);
  const soundFont = structuredClone(_soundFont);
  const soundFontVersion = Number(soundFont.metaData.version);
  let audioType = "wav";
  let sampleToBuffer = (sampleRate, data) => writeWav.pcm16BufferToWav(sampleRate, data);
  if (soundFontVersion >= 3 && soundFontVersion < 4) {
    audioType = "ogg";
    sampleToBuffer = (_, data) => Buffer.from(data);
  }
  const sampleHeaders = [];
  let sampleBuffer = Buffer.from("");
  soundFont.samples.map((sample) => {
    const fileName = `${folderPath}/${sample.header.name}`;
    const originalAudioBuffer = sampleToBuffer(
      sample.header.sampleRate,
      new Int16Array(sample.data)
    );
    writeFileSync(`${fileName}.${audioType}`, originalAudioBuffer);
    execSync(
      `ffmpeg -y -i "${fileName}.${audioType}" -ar ${config.sampleRate} -ab ${config.bitrate}k -acodec lib${config.oggCompressionAlgorithm} "${fileName}.ogg"`,
      {
        stdio: "ignore"
      }
    );
    const oggBuffer = readFileSync(`${fileName}.ogg`);
    unlinkSync(`${fileName}.wav`);
    unlinkSync(`${fileName}.ogg`);
    const padBuffer = Buffer.from(new ArrayBuffer(2 - oggBuffer.byteLength % 2));
    sample.header.start = sampleBuffer.byteLength;
    sample.header.end = sample.header.start + oggBuffer.byteLength;
    sample.header.startLoop -= sample.header.start;
    sample.header.endLoop -= sample.header.start;
    sampleHeaders.push(sample.header);
    sampleBuffer = Buffer.concat([sampleBuffer, oggBuffer, padBuffer]);
  });
  rmdirSync(folderPath);
  soundFont.metaData.version = "3.1";
  soundFont.sampleData = new Int16Array(sampleBuffer);
  soundFont.presetData.sampleHeaders = sampleHeaders;
  return new soundFont3.SoundFont3(Buffer.from(writeSoundFont.writeSoundFont(soundFont)));
};

exports.toSoundFont3 = toSoundFont3;
