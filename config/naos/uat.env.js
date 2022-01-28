'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://naosapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'NAOS UI UAT'",
  BASE_URL: "'https://naosuat.visionnext.com.tr/'",
  SITE_NAME: "'NAOS'",
  HASH: "'db86848c-584e-34f7-c489-c82f2ca9a8d4'"
})
