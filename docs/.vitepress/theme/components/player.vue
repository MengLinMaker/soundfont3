<script lang="ts" setup>
// @ts-expect-error File import will not have TypeScript definition.
import soundFontUrl3 from '../../../../tests/fonts/sf3/piano.sf3?url'
import { Soundfont2Sampler } from "smplr"
import { SoundFont3 } from "../../../../src/soundFont3"
import { ref } from 'vue'
import { toSoundFont2Web } from '../../../../src/write/toSoundFont2Web'

let contextStarted = ref(false)
let sampler: Soundfont2Sampler
const startPlayer = async () => {
  console.log('AudioContext started')
  contextStarted.value = true
  const res = await fetch(soundFontUrl3)
  const soundFontBuffer = new Uint8Array(await res.arrayBuffer())
  const soundFont = await toSoundFont2Web(new SoundFont3(soundFontBuffer))

  sampler = new Soundfont2Sampler(new AudioContext(), {
    url: '',
    createSoundfont: () => soundFont as any
  })
  sampler.load.then(() => {
    sampler.loadInstrument(sampler.instrumentNames[0])
  })
}

</script>

<template>
  <div v-if="contextStarted" class="flex gap-3 text-center">
    <div @mousedown="sampler.start({ note: 84, duration: 5 })"
      class="border grow border-red-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3">
      C6
    </div>
    <div @mousedown="sampler.start({ note: 86, duration: 5 })"
      class="border grow border-yellow-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3">
      D6
    </div>
    <div @mousedown="sampler.start({ note: 88, duration: 5 })"
      class="border grow border-green-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3">
      E6
    </div>
    <div @mousedown="sampler.start({ note: 91, duration: 5 })"
      class="border grow border-blue-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3">
      G6
    </div>
    <div @mousedown="sampler.start({ note: 93, duration: 5 })"
      class="border grow border-violet-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3">
      A7
    </div>
  </div>
  <div v-else @click="contextStarted = true; startPlayer()"
    class="border font-bold text-center border-gray-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3">
    Start Example Synth
  </div>
</template>
