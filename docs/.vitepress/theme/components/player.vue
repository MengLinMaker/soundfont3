<script lang="ts" setup>
import { Soundfont2Sampler } from 'smplr'
import { onMounted, ref } from 'vue'
// @ts-expect-error File import will not have TypeScript definition.
import soundFontUrl3 from './piano.sf3?url'

// Library is linked
import { SoundFont3, toSoundFont2Web } from '.'

const contextStarted = ref(0)
let sampler: Soundfont2Sampler
let soundFont: SoundFont3

onMounted(async () => {
  const res = await fetch(soundFontUrl3)
  const soundFontBuffer = new Uint8Array(await res.arrayBuffer())
  soundFont = await toSoundFont2Web(new SoundFont3(soundFontBuffer))
  contextStarted.value = 1
})

const startPlayer = async () => {
  contextStarted.value = 2
  console.log('AudioContext started')
  sampler = new Soundfont2Sampler(new AudioContext(), {
    url: '',
    // @ts-ignore SoundFont3 is different type
    createSoundfont: () => soundFont,
  })
  sampler.load.then(() => {
    sampler.loadInstrument(sampler.instrumentNames[0])
  })
}
</script>

<template>
  <div
    v-if="contextStarted.valueOf() === 0"
    class="border font-bold text-center border-gray-600 rounded-lg p-3 animate-pulse"
  >
    Loading synth...
  </div>
  <div
    v-else-if="contextStarted.valueOf() === 1"
    @mousedown="startPlayer()"
    class="border font-bold text-center border-gray-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
  >
    Start synth
  </div>
  <div v-else class="flex gap-3 text-center">
    <div
      @mousedown="sampler.start({ note: 84, duration: 5 })"
      class="border grow border-red-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
    >
      C6
    </div>
    <div
      @mousedown="sampler.start({ note: 86, duration: 5 })"
      class="border grow border-yellow-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
    >
      D6
    </div>
    <div
      @mousedown="sampler.start({ note: 88, duration: 5 })"
      class="border grow border-green-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
    >
      E6
    </div>
    <div
      @mousedown="sampler.start({ note: 91, duration: 5 })"
      class="border grow border-blue-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
    >
      G6
    </div>
    <div
      @mousedown="sampler.start({ note: 93, duration: 5 })"
      class="border grow border-violet-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
    >
      A7
    </div>
  </div>
</template>
