import { PresetHeader } from './preset.js'
import { Zone } from './zone.js'
import { Modulator } from './modulator.js'
import { Generator } from './generator.js'
import { InstrumentHeader } from './instrument.js'
import { SampleHeader } from './sample.js'

/**
 * All the data found in the `pdta` sub-chunk.
 */
interface PresetData {
  /**
   * The preset headers, found in the `PHDR' sub-chunk.
   */
  presetHeaders: PresetHeader[]
  /**
   * The preset zones, found in the `PBAG` sub-chunk.
   */
  presetZones: Zone[]
  /**
   * The preset modulators, found in the `PMOD` sub-chunk.
   */
  presetModulators: Modulator[]
  /**
   * The preset generators, found in the `PGEN` sub-chunk.
   */
  presetGenerators: Generator[]
  /**
   * The instrument headers, found in the `INST` sub-chunk.
   */
  instrumentHeaders: InstrumentHeader[]
  /**
   * The instrument zones, found in the `IBAG` sub-chunk.
   */
  instrumentZones: Zone[]
  /**
   * The instrument modulators, found in the `IMOD` sub-chunk.
   */
  instrumentModulators: Modulator[]
  /**
   * The instrument generators, found in the `IGEN` sub-chunk.
   */
  instrumentGenerators: Generator[]
  /**
   * The sample headers, found in the `SHDR` sub-chunk.
   */
  sampleHeaders: SampleHeader[]
}

export type { PresetData }
