'use strict'
const merge = require('webpack-merge')
const batEnv = require('../bat.env')

module.exports = merge(batEnv, {
  NODE_ENV: '"qa"',
  VUE_APP_SERVICE_URL_BASE: "'https://battestvnapi.visionplus.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI QA'",
  BASE_URL: "'http://batfeqa.visionnext.com.tr/'",
  SITE_NAME: "'BAT'",
  HASH: "'8ced6612-e737-4f10-82be-76db0177e462'",
  VUE_APP_BG_FILE: "'batbg.jpg'"
})
