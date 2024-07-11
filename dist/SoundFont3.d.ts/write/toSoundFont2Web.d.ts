import { SoundFont3 } from '../soundFont3.js'

declare const toSoundFont2Web: (_soundFont: SoundFont3) => Promise<SoundFont3>

export { toSoundFont2Web }
