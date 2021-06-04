'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://battestvnapi.visionplus.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI UAT'",
  VUE_APP_VESION_NO: "'1.0.1.30'",
  BASE_URL: "'http://batfeuat.visionnext.com.tr/'"
})
