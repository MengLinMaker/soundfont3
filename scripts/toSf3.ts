import { readFileSync, writeFileSync } from 'fs'
import { SoundFont3, toSoundFont3 } from '../src'
import { writeSoundFont } from './../src/write/writeSoundFont'

const sf2 = new SoundFont3(readFileSync('./scripts/sample.sf2'))
const sf3 = await toSoundFont3(sf2)
writeFileSync('./scripts/sample.sf3', new Int8Array(writeSoundFont(sf3)))
