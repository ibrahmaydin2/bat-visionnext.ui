'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SERVICE_URL_BASE: "'https://batdev.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BAT UI DEVELOPMENT'",
  VUE_APP_VESION_NO: "'1.0.1.56'",
  BASE_URL: "'http://batfedev.visionnext.com.tr/'",
  TENANT: "'BAT'",
  SITE_NAME: "'BAT'",
  HASH: "'e28d4630-558a-7890-be16-9d0c1a9dc096'"
})
