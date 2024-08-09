<h1 align="center">soundfont3.js</h1>

<div flex align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/menglinmaker/soundfont3">
<img src="https://img.shields.io/github/actions/workflow/status/menglinmaker/soundfont3/CI.yml">
<a href="https://badge.fury.io/js/@menglinmaker%2Fsoundfont3"><img src="https://badge.fury.io/js/@menglinmaker%2Fsoundfont3.svg" alt="npm version"></a>
<a href="https://npm-stat.com/charts.html?package=soundfont3"><img src="https://img.shields.io/npm/dm/soundfont3.svg" alt="npm version"></a>
</div>

<h4 align="center">Parse and write SoundFont3 and SoundFont2.</h4>

```bash
pnpm i @menglinmaker/soundfont3
```
For examples and API details, visit the [documentation website](https://soundfont3.pages.dev/).

&nbsp;

## What does this solve?
**Reduce CDN bandwidth up to 25x**

SoundFont2 files contain audio samples in WAV format. [SoundFont3](https://github.com/musescore/sftools) uses OGG VORBIS compression - at the cost of audio quality (if you can hear the difference).

## Standard compliance

The parser and writer complies with [SoundFont 2.01 specification](http://www.synthfont.com/SFSPEC21.PDF).

However, this also means the SoundFont3 implementation deviates from the unofficial standard set by [MuseScore](https://musescore.org/en). Nevertheless, editors like [Polyphone](https://github.com/davy7125/polyphone) can read this SoundFont3 file.

Note: [MuseScore](https://musescore.org/en) SoundFont3 breaks the [RIFF file](https://en.wikipedia.org/wiki/Resource_Interchange_File_Format) standard. This is the main reason for compatability issues.

## Caveats

Besides the potential compliance issues, There are a few limitations:
* SoundFont3 converter requires [Node.js](https://nodejs.org) and [FFMPEG](https://ffmpeg.org/).
* The web SoundFont2 converter is UI blocking - AudioContext cannot initialise on a separate process (Web Worker).

Note: Try [caching](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) the processed file as memiosation.
