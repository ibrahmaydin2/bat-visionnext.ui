'use strict'
const merge = require('webpack-merge')
const batEnv = require('../bat.env')

module.exports = merge(batEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SERVICE_URL_BASE: "'https://batdev.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI DEVELOPMENT'",
  BASE_URL: "'http://batfedev.visionnext.com.tr/'",
  SITE_NAME: "'BAT'",
  HASH: "'e28d4630-558a-7890-be16-9d0c1a9dc096'"
})
