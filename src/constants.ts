export const SF_VERSION_LENGTH = 4
export const SF_PRESET_HEADER_SIZE = 38
export const SF_BAG_SIZE = 4
export const SF_MODULATOR_SIZE = 10
export const SF_GENERATOR_SIZE = 4
export const SF_INSTRUMENT_HEADER_SIZE = 22
export const SF_SAMPLE_HEADER_SIZE = 46

export const DEFAULT_SAMPLE_RATE = 22050

export type SF_TOP_CHUNKS_ID = 'RIFF' | 'LIST'

export type SF_TOP_CHUNKS_FORMAT = 'sfbk' | 'INFO' | 'sdta' | 'pdta'

export type SF_INFO_CHUNKS_ID =
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

export type SF_SDTA_CHUNKS_ID = 'smpl'

export type SF_PDTA_CHUNKS_ID =
  | 'phdr'
  | 'pbag'
  | 'pmod'
  | 'pgen'
  | 'inst'
  | 'ibag'
  | 'imod'
  | 'igen'
  | 'shdr'

export type SF_SUB_CHUNKS_ID = SF_INFO_CHUNKS_ID | SF_SDTA_CHUNKS_ID | SF_PDTA_CHUNKS_ID
