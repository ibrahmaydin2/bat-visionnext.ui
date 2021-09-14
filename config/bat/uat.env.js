'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://battestvnapi.visionplus.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI UAT'",
  VUE_APP_VESION_NO: "'1.0.1.42'",
  BASE_URL: "'http://batfeuat.visionnext.com.tr/'",
  TENANT: "'BAT'",
  HASH: "'8ced6612-e737-4f10-82be-76db0177e462'"
})
