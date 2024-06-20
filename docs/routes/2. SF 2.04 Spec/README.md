---
prev:
  text: 1.2. Play SoundFont
  link: /routes/1.%20Guide/1.2.%20Play%20SoundFont.html
next:
  text: 3. SF 3 Spec
  link: /routes/3.%20SF%203%20Spec/README.html
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

RIFF files consists of nested chunks of data - like JSON but binary:

```C
char[4]            chunkId =      "RIFF";
uint32             chunkBytes =   21772728;
byte[chunkBytes]   chunkData =    <anotherChunk>;

// 4 bytes
// 4 bytes
// 'chunkBytes' bytes
```

Only chunks with `chunkId` `RIFF` and `LIST` can have subchunks.

## SoundFont minimal RIFF
Every SoundFont2 have these three chunks:
* `INFO` chunk containing metadata.
* `sdta` chunk containing Wave Audio (WAV).
* `pdta` header containing the preset, instrument and sample headers.

All the raw (unparsed) data is available in the `SoundFont3` class, as `metaData`, `sampleData` and `presetData`.

![SoundFont2 RIFF chunks](https://i.imgur.com/BL8FvcC.png)

## SoundFont RIFF structure
**Structure with corresponding api:**

`sfbk` - Top level RIFF file format - `SoundFont3`

&nbsp;

  * ***`INFO` - Metadata - `SoundFont3.metaData`***

    * `ifil` - SoundFont version - `SoundFont3.metaData.version`

    * `isng` - Sound engine - `SoundFont3.metaData.soundEngine`

    * `INAM` - SoundFont name - `SoundFont3.metaData.name`

      *The other sub-chunks are optional*

    * `irom` - Sound ROM samples reference - `SoundFont3.metaData.rom`
  
    * `iver` - Sound ROM revision - `SoundFont3.metaData.romVersion`

    * `ICRD` - Creation mm/dd/yy - `SoundFont3.metaData.creationDate`
  
    * `IENG` - SoundFont author - `SoundFont3.metaData.author`
  
    * `IPDR` - For this product - `SoundFont3.metaData.product`
  
    * `ICOP` - Copyright - `SoundFont3.metaData.copyright`
  
    * `ICMT` - Comments - `SoundFont3.metaData.comments`
  
    * `ISFT` - Tool created SoundFont - `SoundFont3.metaData.createdBy`
  
&nbsp;

  * ***`sdta` - sample data.***

    * `smpl` - 16-bit WAV - `SoundFont3.sampleData`
  
    * `sm24` - Plus 8-bit WAV
    
&nbsp;

  * ***`pdta` - Preset tree - `SoundFont3.presetData`***

    *Preset data*

    * `phdr` - Headers - `SoundFont3.presetData.presetHeaders`
  
    * `pbag` - Zone indices - `SoundFont3.presetData.presetZones`
  
    * `pmod` - Modulators - `SoundFont3.presetData.presetModulators`
  
    * `pgen` - Generators - `SoundFont3.presetData.presetGenerators`

    *Instrument data*

    * `inst` - Headers - `SoundFont3.presetData.instrumentHeaders`
      
    * `ibag` - Zone indices - `SoundFont3.presetData.instrumentZones`
      
    * `imod` -  Modulators - `SoundFont3.presetData.instrumentModulators`
      
    * `igen` - Generators - `SoundFont3.presetData.instrumentGenerators`

    *Sample data*

    * `shdr` - Headers - `SoundFont3.presetData.sampleHeaders`
