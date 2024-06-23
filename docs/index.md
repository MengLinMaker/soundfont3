---
layout: home

hero:
  name: 'SoundFont3'
  tagline: Parser for Node.js and Web
  actions:
    - theme: brand
      text: Get Started
      link: /routes/1.%20Guide/README.html

features:
  - title: Reduce bandwidth
    details: Over 10x lossy compression from SF2 to SF3.
  - title: Composable
    details: Unix philosophy - focus only on parsing SF3
---

&nbsp;

## Purpose

::: warning Problem
Large SoundFont2 files use bandwidth and loads slowly, especially quality ones like [salamander.sf2](https://musical-artifacts.com/artifacts/483)
:::

::: tip Solution
[SoundFont3](https://github.com/musescore/sftools), by [MuseScore](https://musescore.org/en), can achieve over 10x compression with [OGG VORBIS](https://xiph.org/vorbis/).

Now you can reduce egress costs and improve user experience with speedy SoundFont download speeds.

If only we had JavaScript/TypeSscript SoundFont3 parser...
:::

## Disclaimer

The original parser, created by [Mrtenz](https://github.com/Mrtenz), adheres to the [SoundFont 2.01](http://www.synthfont.com/SFSPEC21.PDF) specification, with the goal of achieving compliance with [SoundFont 2.04](http://www.synthfont.com/sfspec24.pdf). This [fork](https://github.com/musidi-org/soundfont3) is focuses on a different goal - parsing SoundFont3.

This library is not production ready, hence the version 0.x.x. Some SoundFonts may be parsed incorrectly and the API may have breaking changes in the future. The first production release 1.0.0 and beyond will follow semantic versioning.
