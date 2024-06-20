---
prev:
  text: 1.3. SF2 structure
  link: /routes/1.%20Guide/1.3.%20SF2%20structure.html
next:
  text: 2.1.1. Key
  link: /routes/2.%20API/2.1.%20SoundFont3/2.1.1.%20Key.html
---

# API Structure

## Overview

* [SoundFont3](#soundfont3)
  * [chunk](#soundfont3-chunk)
  * [metaData](#soundfont3-metadata)
  * [sampleData](#soundfont3-sampledata)
  * [samples](#soundfont3-samples)
  * [presetData](#soundfont3-presetdata)
  * [presets](#soundfont3-presets)
  * [instruments](#soundfont3-instruments)
  * [banks](#soundfont3-banks)
  * [getKeyData](#soundfont3-getkeydata)

## SoundFont3

```TypeScript
const soundFont3 = new SoundFont3(soundFontBuffer)
```

* buffer [&lt;Uint8Array&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - The binary SoundFont3 data to parse.

Create a new instance of of the SoundFont3 class. This may throw a ParseError if the SoundFont3 is invalid.

## SoundFont3.chunk

* [&lt;SF2Chunk&gt;](https://github.com/Mrtenz/SoundFont3/blob/master/src/chunk.ts) - The raw, unparsed chunk data.

The structure follows [RIFF(Resource Interchange File Format)](https://mppolytechnic.ac.in/mp-staff/notes_upload_photo/CS708RIFF.pdf)

## SoundFont3.metaData

* &lt;MetaData&gt; - The parsed meta data.

## SoundFont3.sampleData

* [&lt;Uint8Array&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - The full, unparsed sample data.

This includes all the samples in the SoundFont as a single buffer.

## SoundFont3.samples

* &lt;Sample[]&gt; - An array of all samples with the sample headers.

## SoundFont3.presetData

* &lt;PresetData&gt; - The raw, unparsed preset data.

## SoundFont3.presets

* &lt;Preset[]&gt; - An array of all presets with the preset zones.

## SoundFont3.instruments

* &lt;Instrument[]&gt; - An array of all instruments with the instrument zones.

## SoundFont3.banks

* &lt;Bank[]&gt; - An array of all MIDI banks with the presets.

## SoundFont3.getKeyData

```TypeScript
soundFont3.getKeyData(keyNumber, bankNumber, presetNumber)
```

* keyNumber [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI key number.
* bankNumber [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI bank number.
* presetNumber [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI preset number.
* Returns: &lt;Key&gt;

The result of this function is [memoized](https://en.wikipedia.org/wiki/Memoization).
