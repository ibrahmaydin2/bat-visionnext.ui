'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"qa"',
  VUE_APP_SERVICE_URL_BASE: "'https://bevandapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BEVANDA UI QA'",
  BASE_URL: "'https://bevandaqa.visionnext.com.tr/'",
  SITE_NAME: "'BEVANDA'",
  HASH: "'8ced6612-e737-4f10-82be-76db0177e462'"
})
