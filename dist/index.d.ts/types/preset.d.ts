import { ZoneItems } from './zone.js'
import { Instrument } from './instrument.js'

interface PresetHeader {
  /**
   * The name of the preset.
   */
  name: string
  /**
   * The MIDI preset number which to apply to the preset.
   */
  preset: number
  /**
   * The preset bank.
   */
  bank: number
  /**
   * Index in the preset's zone list found in the preset bag sub-chunk.
   */
  bagIndex: number
  /**
   * Reserved for future implementation.
   */
  library: number
  genre: number
  morphology: number
}
interface PresetZone extends ZoneItems {
  /**
   * The instrument for the preset zone.
   */
  instrument: Instrument
}
interface Preset {
  /**
   * The preset header.
   */
  header: PresetHeader
  /**
   * The preset zones.
   */
  zones: PresetZone[]
}

export type { Preset, PresetHeader, PresetZone }
