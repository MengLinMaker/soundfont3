import { SoundFont3 } from '../soundFont3.js'

type ToSoundFont3Config =
  | {
      bitrate: 32 | 48 | 64 | 96 | 128 | 192 | 256
      sampleRate: 16000 | 22050 | 24000 | 32000 | 44100 | 48000
      oggCompressionAlgorithm: 'vorbis'
    }
  | {
      bitrate: 32 | 48 | 64 | 96 | 128 | 192 | 256
      sampleRate: 48000
      oggCompressionAlgorithm: 'opus'
    }
/**
 * Convert samples to SF3
 */
declare const toSoundFont3: (
  _soundFont: SoundFont3,
  config?: ToSoundFont3Config,
  folderPath?: string
) => Promise<SoundFont3>

export { toSoundFont3 }
