import { Bank } from './types/bank.js'
import { Instrument } from './types/instrument.js'
import { Key } from './types/key.js'
import { MetaData } from './types/metaData.js'
import { Preset } from './types/preset.js'
import { PresetData } from './types/presetData.js'
import { Sample } from './types/sample.js'
import { SF2Chunk } from './chunk.js'

/**
 * Returns a memoized function for the original function. Function arguments are serialized as a
 * JSON string and stored in an in-memory object.
 *
 * @template T
 * @template U
 * @param {(...originalArgs: T[]) => U} originalFunction
 */
declare const memoize: <T, U>(originalFunction: (...originalArgs: T[]) => U) => (...args: T[]) => U
declare class SoundFont3 {
  /**
   * Create a new `SoundFont3` instance from a raw input buffer.
   *
   * @param {Uint8Array} buffer
   * @deprecated Replaced with `new SoundFont3(buffer: Uint8Array);`
   */
  static from(buffer: Uint8Array): SoundFont3
  /**
   * The raw RIFF chunk data.
   */
  readonly chunk: SF2Chunk
  /**
   * The meta data.
   */
  readonly metaData: MetaData
  /**
   * The raw sample data.
   */
  readonly sampleData: Uint8Array
  /**
   * The parsed samples.
   */
  readonly samples: Sample[]
  /**
   * The unparsed preset data.
   */
  readonly presetData: PresetData
  /**
   * The parsed instuments.
   */
  readonly instruments: Instrument[]
  /**
   * The parsed presets.
   */
  readonly presets: Preset[]
  /**
   * The parsed banks.
   */
  readonly banks: Bank[]
  /**
   * Load a SoundFont3 file from a `Uint8Array` or a `SF2Chunk`. The recommended way is to use a
   * Uint8Array, loading a SoundFont3 from a `SF2Chunk` only exists for backwards compatibility and
   * will likely be removed in a future version.
   *
   * @param {Uint8Array|SF2Chunk} chunk
   */
  constructor(chunk: Uint8Array | SF2Chunk)
  /**
   * Get the key data by MIDI bank, preset and key number. May return null if no instrument was
   * found for the given inputs. Note that this does not process any of the generators that are
   * specific to the key number.
   *
   * The result is memoized based on all arguments, to prevent having to check all presets,
   * instruments etc. every time.
   *
   * @param {number} memoizedKeyNumber - The MIDI key number
   * @param {number} [memoizedBankNumber] - The bank index number, defaults to 0
   * @param {number} [memoizedPresetNumber] - The preset number, defaults to 0
   */
  getKeyData(
    memoizedKeyNumber: number,
    memoizedBankNumber?: number,
    memoizedPresetNumber?: number
  ): Key | null
  /**
   * Checks if a MIDI key number is in the range of a zone.
   *
   * @param {ZoneItems} zone - The zone to check
   * @param {number} keyNumber - The MIDI key number, must be between 0 and 127
   */
  private isKeyInRange
  /**
   * Parse the presets to banks.
   */
  private getBanks
  /**
   * Parse the raw preset data to presets.
   */
  private getPresets
  /**
   * Parse the raw instrument data (found in the preset data) to instruments.
   */
  private getInstruments
  /**
   * Parse the raw sample data and sample headers to samples.
   */
  private getSamples
}

export { SoundFont3, memoize }
