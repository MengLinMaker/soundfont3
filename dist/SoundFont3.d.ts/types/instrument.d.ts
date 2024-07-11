import { ZoneItems } from './zone.js'
import { Sample } from './sample.js'

interface InstrumentHeader {
  /**
   * The name of the instrument.
   */
  name: string
  /**
   * Index in the instrument's zone list found in the instrument bag sub-chunk.
   */
  bagIndex: number
}
interface InstrumentZone extends ZoneItems {
  /**
   * The sample for the instrument zone.
   */
  sample: Sample
}
interface Instrument {
  /**
   * The instrument header.
   */
  header: InstrumentHeader
  /**
   * The instrument zones.
   */
  zones: InstrumentZone[]
}

export type { Instrument, InstrumentHeader, InstrumentZone }
