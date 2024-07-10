module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./docs/**/*.js', './docs/**/*.vue', './docs/**/*.ts'],
    options: {
      safelist: ['html', 'body']
    }
  }
}
