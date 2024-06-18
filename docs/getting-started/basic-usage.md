# Basic Usage

The `SoundFont3` class constructor expects a `Uint8Array` with the binary SoundFont3 (.sf2) file data.

## With Node.js

On recent Node.js versions, the `Buffer` class implements the `Uint8Array` class, so you can use native Node.js modules like `fs` to load a SoundFont3 (.sf2) file.

```typescript
import * as fs from 'fs';
import { SoundFont3 } from 'SoundFont3';

// Do not specify any encoding type
const buffer = fs.readFileSync('my-soundfont.sf2');
const soundFont = new SoundFont3(buffer);
```

## With web browsers

If you are using a module bundler like Webpack or Rollup, you can import the library, similar to Node.js. Otherwise, you can include the library in your HTML page, with a `<script>` tag. Below is a simple example using the `fetch` API.

```typescript
import { SoundFont3 } from 'SoundFont3';
// Or
const { SoundFont3 } = window.SoundFont3;

fetch('https://example.com/my-soundfont.sf2')
  .then(body => body.arrayBuffer())
  .then(arrayBuffer => {
    // `body.arrayBuffer()` returns an ArrayBuffer, so you have to create a Uint8Array first
    const buffer = new Uint8Array(arrayBuffer);
    const soundFont = new SoundFont3(buffer);
  });
```
