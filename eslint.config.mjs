import compat from 'eslint-plugin-compat'

export default [
  {
    ignores: ['coverage', 'dist', 'node_modules'],
  },
  compat.configs['flat/recommended'],
]
