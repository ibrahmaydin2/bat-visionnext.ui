'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"qa"',
  VUE_APP_SERVICE_URL_BASE: "'https://battestvnapi.visionplus.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI QA'",
  VUE_APP_VESION_NO: "'1.0.1.61'",
  BASE_URL: "'http://batfeqa.visionnext.com.tr/'",
  TENANT: "'BAT'",
  SITE_NAME: "'BAT'",
  HASH: "'8ced6612-e737-4f10-82be-76db0177e462'"
})
