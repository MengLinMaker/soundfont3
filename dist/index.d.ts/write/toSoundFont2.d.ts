import { SoundFont3 } from '../soundFont3.js'

declare const toSoundFont2: (_soundFont: SoundFont3, folderPath?: string) => Promise<SoundFont3>

export { toSoundFont2 }
