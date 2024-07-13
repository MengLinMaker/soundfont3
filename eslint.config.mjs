import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import compat from 'eslint-plugin-compat'

export default [
  {
    ignores: ['coverage', 'dist', 'node_modules'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  compat.configs['flat/recommended'],
]
