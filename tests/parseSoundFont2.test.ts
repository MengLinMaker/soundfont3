import { readFileSync } from 'fs'
import { join } from 'path'
import { RIFFFile } from 'riff-file'
import { SoundFont3 } from '../src'
import { extractAudioFiles, toSoundFont3, writeSoundFont } from '../src/write'
import { ParseError } from '../src/riff'

const soundFontUrl = join(__dirname, 'fonts/sf2/piano.sf2')
const buffer = readFileSync(soundFontUrl)
const soundFont = new SoundFont3(buffer)

const expectedPresetDataPath = join(
  __dirname,
  'fonts/sf2/piano.sf2.presetData.json',
)
const expectedPresetData = JSON.parse(
  readFileSync(expectedPresetDataPath).toString(),
)

describe('Parse SoundFont2', () => {
  it('should not parse invalid SoundFonts', async () => {
    const buffer = readFileSync(join(__dirname, 'fonts/invalid.sf2'))
    expect(() => new SoundFont3(buffer)).toThrow(ParseError)
  })

  it('should parse as a RIFF file', () => {
    const riff = new RIFFFile()
    riff.setSignature(buffer)
    const expectedRiffSignaturePath = join(
      __dirname,
      'fonts/sf2/piano.sf2.riff.signature.json',
    )
    const expectedRiffSignature = JSON.parse(
      readFileSync(expectedRiffSignaturePath).toString(),
    )
    expect(riff.signature).toStrictEqual(expectedRiffSignature)
  })

  it('should parse metadata', () => {
    const metaData = soundFont.metaData
    expect(metaData).toStrictEqual({
      version: '2.1',
      soundEngine: 'EMU8000',
      name: 'Yamaha-Grand-Lite',
      rom: undefined,
      romVersion: undefined,
      creationDate: undefined,
      author: undefined,
      product: undefined,
      copyright: 'Creative Commons',
      comments: undefined,
      createdBy: 'Polyphone',
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
    expect(instrumentHeaders).toStrictEqual(
      expectedPresetData.instrumentHeaders,
    )
  })

  it('should parse instrumentZones', () => {
    const instrumentZones = soundFont.presetData.instrumentZones
    expect(instrumentZones).toStrictEqual(expectedPresetData.instrumentZones)
  })

  it('should parse instrumentModulators', () => {
    const instrumentModulators = soundFont.presetData.instrumentModulators
    expect(instrumentModulators).toStrictEqual(
      expectedPresetData.instrumentModulators,
    )
  })

  it('should parse instrumentGenerators', () => {
    const instrumentGenerators = soundFont.presetData.instrumentGenerators
    expect(instrumentGenerators).toStrictEqual(
      expectedPresetData.instrumentGenerators,
    )
  })

  it('should parse sampleHeaders', () => {
    const sampleHeaders = soundFont.presetData.sampleHeaders
    expect(sampleHeaders).toStrictEqual(expectedPresetData.sampleHeaders)
  })

  it('should extract audio files', () => {
    extractAudioFiles(soundFont, join(__dirname, 'fonts/sf2/wav'))
  })

  it('should convert to SoundFont3', async () => {
    const soundFont3 = await toSoundFont3(soundFont)
    writeSoundFont(soundFont3)
  })
})
