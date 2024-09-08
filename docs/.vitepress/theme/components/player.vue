<script lang="ts" setup>
import { Soundfont2Sampler } from 'smplr'
import { onMounted, ref } from 'vue'
// @ts-expect-error File import will not have TypeScript definition.
import soundFontUrl3 from './sample.sf3?url'

// Library is linked
import { SoundFont3, toSoundFont2Web } from '.'
import { a } from 'vitest/dist/suite-BWgaIsVn.js'

const contextStarted = ref(0)
let sampler: Soundfont2Sampler
let soundFont: SoundFont3
let instrumentName = ref('')
let loadInstrument: (e: Event) => void

onMounted(async () => {
  const res = await fetch(soundFontUrl3)
  const soundFontBuffer = new Uint8Array(await res.arrayBuffer())
  soundFont = await toSoundFont2Web(new SoundFont3(soundFontBuffer))
  contextStarted.value = 1
})

const startPlayer = async () => {
  console.log('AudioContext started')
  sampler = new Soundfont2Sampler(new AudioContext(), {
    url: '',
    // @ts-ignore SoundFont3 is different type
    createSoundfont: () => soundFont,
  })
  sampler.load.then(() => {
    instrumentName.value = sampler.instrumentNames[0]
    sampler.loadInstrument(instrumentName.value)
    loadInstrument = () =>
      setTimeout(() => sampler.loadInstrument(instrumentName.value))
    contextStarted.value = 2
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
  <div v-else class="space-y-3">
    <div class="space-y-1.5">
      <div>Choose an instrument:</div>
      <select @change="loadInstrument" v-model="instrumentName" class="ring-1 w-full ring-black ring-foreground rounded-lg p-3">
        <option v-for="name in sampler.instrumentNames.sort((a: string, b: string) => ('' + a).localeCompare(b))">
          {{ name }}
        </option>
      </select>
    </div>
    <div class="flex gap-3 text-center">
      <div
        @mousedown="sampler.start({ note: 60, duration: 5 })"
        class="border grow border-red-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
      >
        C4
      </div>
      <div
        @mousedown="sampler.start({ note: 62, duration: 5 })"
        class="border grow border-yellow-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
      >
        D4
      </div>
      <div
        @mousedown="sampler.start({ note: 64, duration: 5 })"
        class="border grow border-green-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
      >
        E4
      </div>
      <div
        @mousedown="sampler.start({ note: 67, duration: 5 })"
        class="border grow border-blue-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
      >
        G4
      </div>
      <div
        @mousedown="sampler.start({ note: 69, duration: 5 })"
        class="border grow border-violet-600 hover:opacity-80 active:!opacity-50 rounded-lg p-3"
      >
        A4
      </div>
    </div>
  </div>
</template>
