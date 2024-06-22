---
prev:
  text: Home
  link: /
next:
  text: 1.1. Parse SoundFont
  link: /routes/1.%20Guide/1.1.%20Parse%20SoundFont.html
---

# Guide
::: tip Purpose
The guide section provides fast copy and paste solutions, intended for developers new to this library.
:::

## Install

Install with a package manager: [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [`pnpm`](https://pnpm.io/) or [`yarn`](https://classic.yarnpkg.com/en/).

```bash
$ npm install SoundFont3
```

```bash
$ pnpm install SoundFont3
```

```bash
$ yarn add SoundFont3
```

## Import ES6

```typescript
import { SoundFont3 } from 'SoundFont3'
```

## Import CommonJS

```typescript
const { SoundFont3 } = require('SoundFont3')
```

## SoundFont3 compatability
::: warning Caution
While SoundFont2 is a standard, **SoundFont3 is non-standard**. The only difference is compressed audio samples. However, this is no guarantee that another library will implement this correctly.
:::

### Compatible tools
* [sf3convert](https://github.com/musidi-org/sftools) - CLI converter from `.sf2` to `.sf3`

### Non compatible tools
* [Polyphone](https://github.com/davy7125/polyphone) - SoundFont editor with `.sf2` and `.sf3` support.
  * Sample needs padding so number of bytes are even as required by [SoundFont 2.0.4](http://www.synthfont.com/sfspec24.pdf)