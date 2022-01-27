'use strict'
const merge = require('webpack-merge')
const batEnv = require('../bat.env')

module.exports =  merge(batEnv, {
  NODE_ENV: '"production"',
  VUE_APP_SERVICE_URL_BASE: "'https://batvnapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI PRODUCTION'",
  BASE_URL: "'http://bat.visionnext.com.tr/'",
  SITE_NAME: "'BAT'",
  HASH: "'c969253e-9767-479e-56e9-cb55bf8b29b6'",
  VUE_APP_BG_FILE: "'batbg.jpg'"
})
