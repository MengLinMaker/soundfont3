# SoundFont3

## Table of Contents

* [`new SoundFont3(buffer)`](#new-SoundFont3buffer)
  * [`SoundFont3.chunk`](#SoundFont3chunk)
  * [`SoundFont3.metaData`](#SoundFont3metadata)
  * [`SoundFont3.sampleData`](#SoundFont3sampledata)
  * [`SoundFont3.samples`](#SoundFont3samples)
  * [`SoundFont3.presetData`](#SoundFont3presetdata)
  * [`SoundFont3.presets`](#SoundFont3presets)
  * [`SoundFont3.instruments`](#SoundFont3instruments)
  * [`SoundFont3.banks`](#SoundFont3banks)
  * [`SoundFont3.getKeyData(keyNumber, bankNumber, presetNumber)`](#SoundFont3getkeydatakeynumber-banknumber-presetnumber)

## `new SoundFont3(buffer)`

* `buffer` [&lt;Uint8Array&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - The binary SoundFont3 data to parse.

Create a new instance of of the `SoundFont3` class. This may throw a `ParseError` if the SoundFont3 is invalid.

### `SoundFont3.chunk`

* [&lt;SF2Chunk&gt;](https://github.com/Mrtenz/SoundFont3/blob/master/src/chunk.ts) - The raw, unparsed chunk data.

### `SoundFont3.metaData`

* [&lt;MetaData&gt;](meta-data.md) - The parsed meta data.

### `SoundFont3.sampleData`

* [&lt;Uint8Array&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) - The full, unparsed sample data.

This includes all the samples in the SoundFont as a single buffer.

### `SoundFont3.samples`

* [&lt;Sample[]&gt;](sample/README.md) - An array of all samples with the sample headers.

### `SoundFont3.presetData`

* [&lt;PresetData&gt;](preset-data.md) - The raw, unparsed preset data.

### `SoundFont3.presets`

* [&lt;Preset[]&gt;](preset.md) - An array of all presets with the preset zones.

### `SoundFont3.instruments`

* [&lt;Instrument[]&gt;](instrument.md) - An array of all instruments with the instrument zones.

### `SoundFont3.banks`

* [&lt;Bank[]&gt;](bank.md) - An array of all MIDI banks with the presets.

### `SoundFont3.getKeyData(keyNumber, bankNumber, presetNumber)`

* `keyNumber` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI key number.
* `bankNumber` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI bank number.
* `presetNumber` [&lt;number&gt;](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) - The MIDI preset number.
* Returns: [&lt;Key&gt;](key.md)

The result of this function is [memoized](https://en.wikipedia.org/wiki/Memoization).
