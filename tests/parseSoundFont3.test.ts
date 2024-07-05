import { join } from 'path'
import { readFileSync } from 'fs'
import { RIFFFile } from 'riff-file'
import { SoundFont3, extractAudioFiles } from '../src'

const soundFontUrl = join(__dirname, 'fonts/sf3/piano.sf3')
const buffer = readFileSync(soundFontUrl)
const soundFont = new SoundFont3(buffer)

const soundFont2Url = join(__dirname, 'fonts/sf2/piano.sf2')
const buffer2 = readFileSync(soundFont2Url)
const soundFont2 = new SoundFont3(buffer2)

const expectedPresetDataPath = join(__dirname, 'fonts/sf3/piano.sf3.presetData.json')
const expectedPresetData = JSON.parse(readFileSync(expectedPresetDataPath).toString())

describe('Parse SoundFont3', () => {
  it('should parse as a RIFF file', () => {
    const riff = new RIFFFile()
    riff.setSignature(buffer)
    const expectedRiffSignaturePath = join(__dirname, 'fonts/sf3/piano.sf3.riff.signature.json')
    const expectedRiffSignature = JSON.parse(readFileSync(expectedRiffSignaturePath).toString())
    expect(riff.signature).toStrictEqual(expectedRiffSignature)
  })

  it('should parse metadata', () => {
    const metaData = soundFont.metaData
    expect(metaData).toStrictEqual({
      version: '3.1',
      soundEngine: 'EMU8000',
      name: 'Yamaha-Grand-Lite',
      rom: undefined,
      romVersion: undefined,
      creationDate: undefined,
      author: undefined,
      product: undefined,
      copyright: 'Creative Commons',
      comments: undefined,
      createdBy: 'Polyphone'
    })
  })

  it('should parse presetHeaders', () => {
    const presetHeaders = soundFont.presetData.presetHeaders
    expect(presetHeaders).toStrictEqual(expectedPresetData.presetHeaders)
  })

  it('should parse presetZones', () => {
    const presetZones = soundFont.presetData.presetZones
    expect(presetZones).toStrictEqual(expectedPresetData.presetZones)
  })

  it('should parse presetModulators', () => {
    const presetModulators = soundFont.presetData.presetModulators
    expect(presetModulators).toStrictEqual(expectedPresetData.presetModulators)
  })

  it('should parse presetGenerators', () => {
    const presetGenerators = soundFont.presetData.presetGenerators
    expect(presetGenerators).toStrictEqual(expectedPresetData.presetGenerators)
  })

  it('should parse instrumentHeaders', () => {
    const instrumentHeaders = soundFont.presetData.instrumentHeaders
    expect(instrumentHeaders).toStrictEqual(expectedPresetData.instrumentHeaders)
  })

  it('should parse instrumentZones', () => {
    const instrumentZones = soundFont.presetData.instrumentZones
    expect(instrumentZones).toStrictEqual(expectedPresetData.instrumentZones)
  })

  it('should parse instrumentModulators', () => {
    const instrumentModulators = soundFont.presetData.instrumentModulators
    expect(instrumentModulators).toStrictEqual(expectedPresetData.instrumentModulators)
  })

  it('should parse instrumentGenerators', () => {
    const instrumentGenerators = soundFont.presetData.instrumentGenerators
    expect(instrumentGenerators).toStrictEqual(expectedPresetData.instrumentGenerators)
  })

  it('should parse sampleHeaders', () => {
    const sampleHeaders = soundFont.presetData.sampleHeaders
    expect(sampleHeaders).toStrictEqual(expectedPresetData.sampleHeaders)
  })

  it('should not differ from sf3 to sf2', () => {
    const preset = soundFont.presetData
    const preset2 = soundFont2.presetData
    expect(preset.presetHeaders).toStrictEqual(preset2.presetHeaders)
    expect(preset.presetZones).toStrictEqual(preset2.presetZones)
    expect(preset.presetModulators).toStrictEqual(preset2.presetModulators)
    expect(preset.presetGenerators).toStrictEqual(preset2.presetGenerators)
    expect(preset.instrumentHeaders).toStrictEqual(preset2.instrumentHeaders)
    expect(preset.instrumentZones).toStrictEqual(preset2.instrumentZones)
    expect(preset.instrumentModulators).toStrictEqual(preset2.instrumentModulators)
    expect(preset.instrumentGenerators).toStrictEqual(preset2.instrumentGenerators)
  })

  it('should extract audio files', () => {
    extractAudioFiles(soundFont, join(__dirname, 'fonts/sf3/ogg'))
  })

  // it('should load into "smplr"', async () => {
  //   const context = new AudioContext()
  //   const sampler = new Soundfont2Sampler(context, {
  //     url: bufferToDataUrl(buffer),
  //     createSoundfont: (data) => new SoundFont3(data)
  //   })
  //   sampler.load.then(() => {
  //     sampler.loadInstrument(sampler.instrumentNames[0])
  //     expect(sampler.instrumentNames).toStrictEqual([
  //       'Sal-L1',
  //       'Sal-L2',
  //       'Sal-L3',
  //       'Sal-L4',
  //       'Sal-L5',
  //       'Sal-L6',
  //       'Sal-L7'
  //     ])
  //   })
  // })
})
