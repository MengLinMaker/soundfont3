import { GeneratorType } from './types/generator.js';
import './types/modulator.js';
import { SF2Chunk } from './chunk.js';
import { ParseError } from './riff/parseError.js';
import { parseBuffer } from './riff/parser.js';
import './chunks/parsers/generators.js';
import { getItemsInZone } from './chunks/parsers/zones.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const memoize = (originalFunction) => {
  const memo = {};
  return (...args) => {
    const serializedArgs = JSON.stringify(args);
    if (serializedArgs in memo) {
      return memo[serializedArgs];
    }
    const output = originalFunction(...args);
    memo[serializedArgs] = output;
    return output;
  };
};
class SoundFont3 {
  /**
   * Load a SoundFont3 file from a `Uint8Array` or a `SF2Chunk`. The recommended way is to use a
   * Uint8Array, loading a SoundFont3 from a `SF2Chunk` only exists for backwards compatibility and
   * will likely be removed in a future version.
   *
   * @param {Uint8Array|SF2Chunk} chunk
   */
  constructor(chunk) {
    /**
     * The raw RIFF chunk data.
     */
    __publicField(this, "chunk");
    /**
     * The meta data.
     */
    __publicField(this, "metaData");
    /**
     * The raw sample data.
     */
    __publicField(this, "sampleData");
    /**
     * The parsed samples.
     */
    __publicField(this, "samples");
    /**
     * The unparsed preset data.
     */
    __publicField(this, "presetData");
    /**
     * The parsed instuments.
     */
    __publicField(this, "instruments");
    /**
     * The parsed presets.
     */
    __publicField(this, "presets");
    /**
     * The parsed banks.
     */
    __publicField(this, "banks");
    if (!(chunk instanceof SF2Chunk)) {
      const parsedBuffer = parseBuffer(chunk);
      chunk = new SF2Chunk(parsedBuffer);
    }
    if (chunk.subChunks.length !== 3) {
      throw new ParseError("Invalid sfbk structure", "3 chunks", `${chunk.subChunks.length} chunks`);
    }
    this.chunk = chunk;
    this.metaData = chunk.subChunks[0].getMetaData();
    this.sampleData = chunk.subChunks[1].getSampleData();
    this.presetData = chunk.subChunks[2].getPresetData();
    this.samples = this.getSamples();
    this.instruments = this.getInstruments();
    this.presets = this.getPresets();
    this.banks = this.getBanks();
  }
  /**
   * Create a new `SoundFont3` instance from a raw input buffer.
   *
   * @param {Uint8Array} buffer
   * @deprecated Replaced with `new SoundFont3(buffer: Uint8Array);`
   */
  static from(buffer) {
    return new SoundFont3(buffer);
  }
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
  getKeyData(memoizedKeyNumber, memoizedBankNumber = 0, memoizedPresetNumber = 0) {
    return memoize((keyNumber, bankNumber, presetNumber) => {
      const bank = this.banks[bankNumber];
      if (bank) {
        const preset = bank.presets[presetNumber];
        if (preset) {
          const presetZone = preset.zones.find((zone) => this.isKeyInRange(zone, keyNumber));
          if (presetZone) {
            const instrument = presetZone.instrument;
            const instrumentZone = instrument.zones.find(
              (zone) => this.isKeyInRange(zone, keyNumber)
            );
            if (instrumentZone) {
              const sample = instrumentZone.sample;
              const generators = { ...presetZone.generators, ...instrumentZone.generators };
              const modulators = { ...presetZone.modulators, ...instrumentZone.modulators };
              return {
                keyNumber,
                preset,
                instrument,
                sample,
                generators,
                modulators
              };
            }
          }
        }
      }
      return null;
    })(memoizedKeyNumber, memoizedBankNumber, memoizedPresetNumber);
  }
  /**
   * Checks if a MIDI key number is in the range of a zone.
   *
   * @param {ZoneItems} zone - The zone to check
   * @param {number} keyNumber - The MIDI key number, must be between 0 and 127
   */
  isKeyInRange(zone, keyNumber) {
    return zone.keyRange === void 0 || zone.keyRange.lo <= keyNumber && zone.keyRange.hi >= keyNumber;
  }
  /**
   * Parse the presets to banks.
   */
  getBanks() {
    return this.presets.reduce((target, preset) => {
      const bankNumber = preset.header.bank;
      if (!target[bankNumber]) {
        target[bankNumber] = {
          presets: []
        };
      }
      target[bankNumber].presets[preset.header.preset] = preset;
      return target;
    }, []);
  }
  /**
   * Parse the raw preset data to presets.
   */
  getPresets() {
    const { presetHeaders, presetZones, presetGenerators, presetModulators } = this.presetData;
    const presets = getItemsInZone(
      presetHeaders,
      presetZones,
      presetModulators,
      presetGenerators,
      this.instruments,
      GeneratorType.Instrument
    );
    return presets.filter((preset) => preset.header.name !== "EOP").map((preset) => {
      return {
        header: preset.header,
        globalZone: preset.globalZone,
        zones: preset.zones.map((zone) => {
          return {
            keyRange: zone.keyRange,
            generators: zone.generators,
            modulators: zone.modulators,
            instrument: zone.reference
          };
        })
      };
    });
  }
  /**
   * Parse the raw instrument data (found in the preset data) to instruments.
   */
  getInstruments() {
    const { instrumentHeaders, instrumentZones, instrumentModulators, instrumentGenerators } = this.presetData;
    const instruments = getItemsInZone(
      instrumentHeaders,
      instrumentZones,
      instrumentModulators,
      instrumentGenerators,
      this.samples,
      GeneratorType.SampleId
    );
    return instruments.filter((instrument) => instrument.header.name !== "EOI").map((instrument) => {
      return {
        header: instrument.header,
        globalZone: instrument.globalZone,
        zones: instrument.zones.map((zone) => {
          return {
            keyRange: zone.keyRange,
            generators: zone.generators,
            modulators: zone.modulators,
            sample: zone.reference
          };
        })
      };
    });
  }
  /**
   * Parse the raw sample data and sample headers to samples.
   */
  getSamples() {
    return this.presetData.sampleHeaders.filter((sample) => sample.name !== "EOS").map((header) => {
      if (header.name !== "EOS" && header.sampleRate <= 0) {
        throw new Error(
          `Illegal sample rate of ${header.sampleRate} hz in sample '${header.name}'`
        );
      }
      if (header.originalPitch >= 128 && header.originalPitch <= 254) {
        header.originalPitch = 60;
      }
      header.startLoop -= header.start;
      header.endLoop -= header.start;
      const soundFontVersion = Number(this.metaData.version);
      if (soundFontVersion >= 3 && soundFontVersion < 4) {
        const data = this.sampleData.subarray(header.start, header.end);
        return {
          header,
          data
        };
      }
      return {
        header,
        data: new Int16Array(
          new Uint8Array(this.sampleData.subarray(header.start * 2, header.end * 2)).buffer
        )
      };
    });
  }
}

export { SoundFont3, memoize };
