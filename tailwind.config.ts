module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./docs/.vitepress/**/*.vue'],
    options: {
      safelist: ['html', 'body'],
    },
  },
}
