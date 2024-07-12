import { GeneratorType } from './generator.js';

[
  // MIDI note-on velocity to initial attenuation
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: 1 /* Concave */,
      polarity: 0 /* Unipolar */,
      direction: 1 /* Decreasing */,
      palette: 0 /* GeneralController */,
      index: 2 /* NoteOnVelocity */
    },
    value: 960,
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI note-on velocity to filter cutoff
  {
    id: GeneratorType.InitialFilterFc,
    source: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 1 /* Decreasing */,
      palette: 0 /* GeneralController */,
      index: 2 /* NoteOnVelocity */
    },
    value: -2400,
    // cents
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI channel pressure to vibrato LFO pitch depth
  {
    id: GeneratorType.VibLFOToPitch,
    source: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 13 /* ChannelPressure */
    },
    value: 50,
    // cents / max excursion
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI continuous controller 1 to vibrato LFO pitch depth
  {
    id: GeneratorType.VibLFOToPitch,
    source: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 1 /* MidiController */,
      index: 1
    },
    value: 50,
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI continuous controller 7 to initial attenuation
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: 1 /* Concave */,
      polarity: 0 /* Unipolar */,
      direction: 1 /* Decreasing */,
      palette: 1 /* MidiController */,
      index: 7
    },
    value: 960,
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI continuous controller 10 to pan position
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: 0 /* Linear */,
      polarity: 1 /* Bipolar */,
      direction: 0 /* Increasing */,
      palette: 1 /* MidiController */,
      index: 10
    },
    value: 1e3,
    // tenths of a percent
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI continuous controller 11 to initial attenuation
  {
    id: GeneratorType.InitialAttenuation,
    source: {
      type: 1 /* Concave */,
      polarity: 0 /* Unipolar */,
      direction: 1 /* Decreasing */,
      palette: 1 /* MidiController */,
      index: 11
    },
    value: 960,
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI continuous controller 91 to reverb effects send
  {
    id: GeneratorType.ReverbEffectsSend,
    source: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 1 /* MidiController */,
      index: 91
    },
    value: 200,
    // tenths of a percent
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI continuous controller 93 to chorus effects send
  {
    id: GeneratorType.ChorusEffectsSend,
    source: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 1 /* MidiController */,
      index: 93
    },
    value: 200,
    // tenths of a percent
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 0 /* NoController */
    },
    transform: 0 /* Linear */
  },
  // MIDI pitch wheel to initial pitch controlled by MIDI pitch wheel sensitivity
  {
    id: GeneratorType.CoarseTune,
    source: {
      type: 0 /* Linear */,
      polarity: 1 /* Bipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 14 /* PitchWheel */
    },
    value: 12700,
    // cents
    valueSource: {
      type: 0 /* Linear */,
      polarity: 0 /* Unipolar */,
      direction: 0 /* Increasing */,
      palette: 0 /* GeneralController */,
      index: 16 /* PitchWheelSensitivity */
    },
    transform: 0 /* Linear */
  }
];
