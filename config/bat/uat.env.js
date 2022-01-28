'use strict'
const merge = require('webpack-merge')
const batEnv = require('../bat.env')

module.exports = merge(batEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://battestvnapi.visionplus.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI UAT'",
  BASE_URL: "'http://batfeuat.visionnext.com.tr/'",
  SITE_NAME: "'BAT'",
  HASH: "'35cab0cf-4d75-3610-52ae-cf13a1cb3a2a'",
  VUE_APP_BG_FILE: "'batbg.jpg'"
})
