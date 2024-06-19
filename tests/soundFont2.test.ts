import { join } from 'path'
import { SoundFont3 } from '../src'
import { ParseError } from '../src/riff'
import { readFileSync } from 'fs'
import { Soundfont2Sampler } from 'smplr'
import { bufferToDataUrl } from './bufferToDataUrl'
import { RIFFFile } from 'riff-file'

const soundFontUrl = join(__dirname, 'fonts/piano.sf2')
const buffer = readFileSync(soundFontUrl)

describe('SoundFont2', () => {
  it('should not parse invalid SoundFonts', async () => {
    const buffer = readFileSync(join(__dirname, 'fonts/invalid.sf2'))
    expect(() => new SoundFont3(buffer)).toThrow(ParseError)
  })

  it('should parse as a RIFF file', () => {
    const riff = new RIFFFile()
    riff.setSignature(buffer)
    const expectedRiffSignaturePath = join(__dirname, 'fonts/piano.sf2.riff.signature.json')
    const expectedRiffSignature = readFileSync(expectedRiffSignaturePath).toString()
    const riffSignature = JSON.stringify(riff.signature, null, 2)
    expect(riffSignature).toStrictEqual(expectedRiffSignature)
  })

  it('should parse metadata', () => {
    const soundFont = new SoundFont3(buffer)
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
      createdBy: 'Polyphone'
    })
  })

  it('should load into "smplr"', async () => {
    const context = new AudioContext()

    const sampler = new Soundfont2Sampler(context, {
      url: bufferToDataUrl(buffer),
      createSoundfont: (data) => new SoundFont3(data)
    })
    sampler.load.then(() => {
      sampler.loadInstrument(sampler.instrumentNames[0])
      expect(sampler.instrumentNames).toStrictEqual([
        'Sal-L1',
        'Sal-L2',
        'Sal-L3',
        'Sal-L4',
        'Sal-L5',
        'Sal-L6',
        'Sal-L7'
      ])
    })
  })
})
