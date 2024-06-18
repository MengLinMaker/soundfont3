import { TextDecoder } from 'util'
// @ts-expect-error TextDecoder not included directly in Node.js
global.TextDecoder = TextDecoder
