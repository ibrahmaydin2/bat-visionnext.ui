'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"production"',
  VUE_APP_SERVICE_URL_BASE: "'https://naosapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'NAOS UI PRODUCTION'",
  BASE_URL: "'https://naos.visionnext.com.tr/'",
  SITE_NAME: "'NAOS'",
  HASH: "'8ced6612-e737-4f10-82be-76db0177e462'"
})
