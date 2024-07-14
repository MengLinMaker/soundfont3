import compat from 'eslint-plugin-compat'

export default [
  {
    ignores: ['coverage', 'dist', 'docs/.vitepress/cache', 'node_modules'],
  },
  compat.configs['flat/recommended'],
]
