---
prev:
  text: 2.3. Preset data
  link: /routes/2.%20SF%202.04%20Spec/2.3.%20Preset%20data.html
next:
  text: 4. Development
  link: /routes/4.%20Development/README.html
---

# SoundFont3 Structure

::: tip Purpose
To understand SoundFont3 through [MuseScore/sftools](https://github.com/musescore/sftools) (unmaintained).

This section requires a [basic understanding of SoundFont 2.04](/routes/2.%20SF%202.04%20Spec/README.html).
:::

SoundFont3 was originally created by MuseScore. WAV samples are replaced with OGG VORBIS to achieve up to 10x lossy compression.

Unfortunately their implementation is non-compliant with SoundFont2:
* `phdr` chunk does not end with `EOP`
* `inst` chunk does not end with `EOI`
* `shdr` chunk does not end with `EOS`
* `shdr.startLoop` and `shdr.endLoop` are clearly out of range of `shdr.start` and `shdr.end`

**A fork is created to fix these issues: [sf3tools](https://github.com/musidi-org/sftools).**
