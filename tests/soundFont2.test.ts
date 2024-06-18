import { join } from 'path'
import { SoundFont3 } from '../src'
import { ParseError } from '../src/riff'
import { readFileSync } from 'fs'

const buffer = readFileSync(join(__dirname, 'fonts/piano.sf2'))
const soundFont = new SoundFont3(buffer)

describe('SoundFont2', () => {
  it('should not parse invalid SoundFonts', async () => {
    const buffer = readFileSync(join(__dirname, 'fonts/invalid.sf2'))
    expect(() => new SoundFont3(buffer)).toThrow(ParseError)
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
      createdBy: 'Polyphone'
    })
  })
})
