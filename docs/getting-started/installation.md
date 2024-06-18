# Installation

## Table of Contents

* [Using `yarn` or `npm` (Recommended)](#using-yarn-or-npm-recommended)
  * [CommonJS](#commonjs)
  * [ES6 / TypeScript `import`](#es6--typescript-import)
* [Using a `<script>` tag](#using-a-script-tag)

## Using `yarn` or `npm` (Recommended)

This method is recommended for Node.js and web browsers. You can install the library using `yarn` or `npm`, by running one of the following commands.

```bash
$ yarn add SoundFont3
```

```bash
$ npm install --save SoundFont3
```

Then include the library in your project, simply by importing it. If you want to use the library in a web browser, you can use a module bundler like [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/).

### CommonJS

```typescript
const { SoundFont3 } = require('SoundFont3');
```

### ES6 / TypeScript `import`

```typescript
import { SoundFont3 } from 'SoundFont3';
```

## Using a `<script>` tag

This method is for web browsers only. Download the latest release from [here](https://github.com/Mrtenz/SoundFont3/releases/latest) and include it in your project using a `<script>` tag.

```html
<script src="SoundFont3.js"></script>
```

The library will be available as `window.SoundFont3`.

```typescript
const { SoundFont3 } = window.SoundFont3;
```
