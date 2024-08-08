import compat from 'eslint-plugin-compat'

export default [
  {
    ignores: ['coverage', 'dist', 'docs/.vitepress', 'node_modules'],
  },
  compat.configs['flat/recommended'],
]
