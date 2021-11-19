'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://battestvnapi.visionplus.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI UAT'",
  VUE_APP_VESION_NO: "'1.0.1.57'",
  BASE_URL: "'http://batfeuat.visionnext.com.tr/'",
  TENANT: "'BAT'",
  SITE_NAME: "'BAT'",
  HASH: "'35cab0cf-4d75-3610-52ae-cf13a1cb3a2a'"
})
