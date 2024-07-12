import { Preset } from './preset.js'

/**
 * Describes a MIDI bank.
 */
interface Bank {
  /**
   * The presets in the bank.
   */
  presets: Preset[]
}

export type { Bank }
