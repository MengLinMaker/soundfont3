declare const SF_VERSION_LENGTH = 4
declare const SF_PRESET_HEADER_SIZE = 38
declare const SF_BAG_SIZE = 4
declare const SF_MODULATOR_SIZE = 10
declare const SF_GENERATOR_SIZE = 4
declare const SF_INSTRUMENT_HEADER_SIZE = 22
declare const SF_SAMPLE_HEADER_SIZE = 46
declare const DEFAULT_SAMPLE_RATE = 22050
type SF_TOP_CHUNKS_ID = 'RIFF' | 'LIST'
type SF_TOP_CHUNKS_FORMAT = 'sfbk' | 'INFO' | 'sdta' | 'pdta'
type SF_INFO_CHUNKS_ID =
  | 'ifil'
  | 'isng'
  | 'INAM'
  | 'irom'
  | 'iver'
  | 'ICRD'
  | 'IENG'
  | 'IPRD'
  | 'ICOP'
  | 'ICMT'
  | 'ISFT'
type SF_SDTA_CHUNKS_ID = 'smpl'
type SF_PDTA_CHUNKS_ID =
  | 'phdr'
  | 'pbag'
  | 'pmod'
  | 'pgen'
  | 'inst'
  | 'ibag'
  | 'imod'
  | 'igen'
  | 'shdr'
type SF_SUB_CHUNKS_ID = SF_INFO_CHUNKS_ID | SF_SDTA_CHUNKS_ID | SF_PDTA_CHUNKS_ID

export {
  DEFAULT_SAMPLE_RATE,
  SF_BAG_SIZE,
  SF_GENERATOR_SIZE,
  type SF_INFO_CHUNKS_ID,
  SF_INSTRUMENT_HEADER_SIZE,
  SF_MODULATOR_SIZE,
  type SF_PDTA_CHUNKS_ID,
  SF_PRESET_HEADER_SIZE,
  SF_SAMPLE_HEADER_SIZE,
  type SF_SDTA_CHUNKS_ID,
  type SF_SUB_CHUNKS_ID,
  type SF_TOP_CHUNKS_FORMAT,
  type SF_TOP_CHUNKS_ID,
  SF_VERSION_LENGTH
}
