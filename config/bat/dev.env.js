'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SERVICE_URL_BASE: "'https://batdev.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI DEVELOPMENT'",
  VUE_APP_VESION_NO: "'1.0.1.50'",
  BASE_URL: "'http://batfedev.visionnext.com.tr/'",
  TENANT: "'BAT'",
  SITE_NAME: "'BAT'",
  HASH: "'8ced6612-e737-4f10-82be-76db0177e462'"
})
