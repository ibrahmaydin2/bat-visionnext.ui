'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  VUE_APP_SERVICE_URL_BASE: "'https://batdev.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI TEST'",
  VUE_APP_VESION_NO: "'1.0.1.18'"
})
