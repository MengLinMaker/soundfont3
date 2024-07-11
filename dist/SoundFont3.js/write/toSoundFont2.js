'use strict';

var soundFont3 = require('../soundFont3.js');
var writeSoundFont = require('./writeSoundFont.js');
var utils = require('./utils.js');

const toSoundFont2 = async (_soundFont, folderPath = `soundfont-${crypto.randomUUID()}`) => {
  const soundFont = structuredClone(_soundFont);
  if (typeof document !== "undefined") throw Error("WebCodecs not supported yet.");
  const soundFontVersion = Number(soundFont.metaData.version);
  if (soundFontVersion < 3) return _soundFont;
  const { existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } = await import('fs');
  const { execSync } = await import('child_process');
  if (!existsSync(folderPath)) mkdirSync(folderPath);
  const sampleHeaders = [];
  let sampleBuffer = new Int8Array();
  let sampleOffset = 0;
  let oggOffset = 0;
  soundFont.samples.map((sample) => {
    const fileName = `${folderPath}/${sample.header.name}`;
    const oggBuffer = sample.data.buffer;
    writeFileSync(`${fileName}.ogg`, new Int8Array(sample.data));
    execSync(
      `ffmpeg -y -i "${fileName}.ogg" -ar ${sample.header.sampleRate} -ac 1 "${fileName}.wav"`,
      {
        stdio: "ignore"
      }
    );
    const wavFileBuffer = readFileSync(`${fileName}.wav`);
    const wavBuffer = new Int8Array(wavFileBuffer.slice(44 + 34, wavFileBuffer.byteLength));
    unlinkSync(`${fileName}.wav`);
    unlinkSync(`${fileName}.ogg`);
    const padBuffer = new ArrayBuffer(2 - wavBuffer.byteLength % 2);
    sample.header.start = sampleOffset;
    sample.header.end = sampleOffset + wavBuffer.byteLength / 2;
    sample.header.startLoop += oggOffset;
    sample.header.endLoop += oggOffset;
    sampleBuffer = utils.concatBuffer(utils.concatBuffer(sampleBuffer, wavBuffer), padBuffer);
    sampleOffset += wavBuffer.byteLength / 2 + padBuffer.byteLength;
    oggOffset += oggBuffer.byteLength;
    sampleHeaders.push(sample.header);
  });
  console.info(`Sample size: ${(sampleBuffer.byteLength / 10 ** 6).toFixed(3)} mb`);
  rmdirSync(folderPath);
  soundFont.metaData.version = "2.04";
  soundFont.sampleData = new Int16Array(sampleBuffer);
  soundFont.presetData.sampleHeaders = sampleHeaders;
  return new soundFont3.SoundFont3(new Uint8Array(writeSoundFont.writeSoundFont(soundFont)));
};

exports.toSoundFont2 = toSoundFont2;
