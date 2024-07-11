import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import terser from '@rollup/plugin-terser'

const name = 'SoundFont3'
const outDir = 'dist'

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  treeshake: true,
  external: id => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [esbuild(), terser()],
    output: [
      {
        dir: `${outDir}/${name}.js`,
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
      {
        dir: `${outDir}/${name}.mjs`,
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      dir: `${outDir}/${name}.d.ts`,
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
  }),
]
