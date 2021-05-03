module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
  ? './' // prod
  : '/', // dev
  pluginOptions: {
    i18n: {
      locale: 'tr',
      fallbackLocale: 'tr',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
