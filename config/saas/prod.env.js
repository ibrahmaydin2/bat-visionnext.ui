'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"production"',
  VUE_APP_SERVICE_URL_BASE: "'https://saasvnapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'SAAS UI PRODUCTION'",
  BASE_URL: "'https://saas.visionnext.com.tr/'",
  SITE_NAME: "'SAAS'",
  HASH: "'7aaa7777-e737-4f10-82be-76db0177e462'"
})
