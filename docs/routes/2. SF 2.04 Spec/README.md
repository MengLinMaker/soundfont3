---
prev:
  text: 1.2. Play SoundFont
  link: /routes/1.%20Guide/1.2.%20Play%20SoundFont.html
next:
  text: 2.1. SF 2.04 Spec
  link: /routes/2.%20SF%202.04%20Spec/2.1.%20Metadata.html
---

# SoundFont 2.04 Specification
::: tip Purpose
To understand the library API according to [SoundFont 2.04](http://www.synthfont.com/sfspec24.pdf) specification.

This section will alternate between specification summary and API documentation.
:::

SoundFonts are [RIFF](https://johnloomis.org/cpe102/asgn/asgn1/riff.html) files. They contain metadata. The main data is arranged in the following format:

<div style="background:WhiteSmoke;padding:1em;border-radius:0.5em;">

![General Structure](https://i.imgur.com/c2Gud3u.png)
</div>

 Multiple `preset zones` can reference one `instrument`.

 Likewise, multiple `instrument zones` can reference one `sample`.

## What is RIFF
RIFF is like JSON but binary - store nested binaries. It is a standard for other file formats like [WAV](https://en.wikipedia.org/wiki/WAV).

Data is stored in chunks with metadata:

```C
char[4]            chunkId =      "RIFF"; // 4 byte
uint32_t           chunkBytes =   21772728; // 4 byte
char[4]            format         "sfbk"; // 4 byte if subchunk exists
byte[chunkBytes]   chunkData =    <anotherChunk>;
```

* `chunkId` is a [four-character code (FourCC)](https://en.wikipedia.org/wiki/FourCC) totalling 4 bytes.
  * Only trunk chunks with id `RIFF` and `LIST` can have subchunks, hence 12 byte metadata.
  * Leaf chunks have 8 byte metadata since format is not required.
* `chunkBytes` is the amount of bytes in a chunk.
* `format` specifies format type since `chunkId` is already used for tracking subchunks.
* `chunkData` could be a a subchunk or contain data.

## SoundFont RIFF structure
Every SoundFont2 contain three nested top chunks:

ChunkId `RIFF`, format `sfbk` - RIFF file declaration

* ChunkId `LIST`
* Format `INFO`
* Contains ***`SoundFont3.metadata`*** and:
  * ChunkId `LIST`
  * Format `sdta`
  * Contains ***`SoundFont3.sampleData`*** and:
    * ChunkId `LIST`
    * Format `pdta`
    * Contains ***`SoundFont3.presetData`***

## Metadata
Accessible thorugh `SoundFont3.metaData`

* `ifil` - SoundFont version - `SoundFont3.metaData.version`

* `isng` - Sound engine - `SoundFont3.metaData.soundEngine`

* `INAM` - SoundFont bank - `SoundFont3.metaData.name`

  ***The other leaf chunks are optional***

* `irom` - Sound ROM samples reference - `SoundFont3.metaData.rom`

* `iver` - Sound ROM revision - `SoundFont3.metaData.romVersion`

* `ICRD` - Creation mm/dd/yy - `SoundFont3.metaData.creationDate`

* `IENG` - SoundFont author - `SoundFont3.metaData.author`

* `IPDR` - For this product - `SoundFont3.metaData.product`

* `ICOP` - Copyright - `SoundFont3.metaData.copyright`

* `ICMT` - Comments - `SoundFont3.metaData.comments`

* `ISFT` - Tool created SoundFont - `SoundFont3.metaData.createdBy`

## Sample data

* `smpl` - 16-bit WAV - `SoundFont3.sampleData`

* `sm24` - Plus 8-bit WAV

## Preset data
Available through `SoundFont3.presetData`

**Preset metadata:**

* `phdr` - Headers - `SoundFont3.presetData.presetHeaders`

* `pbag` - Zone indices - `SoundFont3.presetData.presetZones`

* `pmod` - Modulators - `SoundFont3.presetData.presetModulators`

* `pgen` - Generators - `SoundFont3.presetData.presetGenerators`

**Instrument metadata:**

* `inst` - Headers - `SoundFont3.presetData.instrumentHeaders`

* `ibag` - Zone indices - `SoundFont3.presetData.instrumentZones`

* `imod` -  Modulators - `SoundFont3.presetData.instrumentModulators`

* `igen` - Generators - `SoundFont3.presetData.instrumentGenerators`

**Sample metadata:**

* `shdr` - Headers - `SoundFont3.presetData.sampleHeaders`
