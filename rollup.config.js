import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const outDir = 'dist'

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  treeshake: true,
  external: id => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        dir: `${outDir}/index.js`,
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        dir: `${outDir}/index.mjs`,
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      dir: `${outDir}/index.d.ts`,
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
  }),
]
