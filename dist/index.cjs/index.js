'use strict';

var soundFont3 = require('./soundFont3.js');
var writeSoundFont = require('./write/writeSoundFont.js');
var extractAudioFiles = require('./write/extractAudioFiles.js');
var toSoundFont3 = require('./write/toSoundFont3.js');
var toSoundFont2 = require('./write/toSoundFont2.js');
var toSoundFont2Web = require('./write/toSoundFont2Web.js');



exports.SoundFont3 = soundFont3.SoundFont3;
exports.memoize = soundFont3.memoize;
exports.writeSoundFont = writeSoundFont.writeSoundFont;
exports.extractAudioFiles = extractAudioFiles.extractAudioFiles;
exports.toSoundFont3 = toSoundFont3.toSoundFont3;
exports.toSoundFont2 = toSoundFont2.toSoundFont2;
exports.toSoundFont2Web = toSoundFont2Web.toSoundFont2Web;
