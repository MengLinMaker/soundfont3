import { MetaData } from '../types/metaData.js'
import { PresetData } from '../types/presetData.js'
import { SampleData, Sample } from '../types/sample.js'

type SoundFont2Raw = {
  metaData: MetaData
  sampleData: SampleData
  presetData: PresetData
  samples: Sample[]
}

export type { SoundFont2Raw }
