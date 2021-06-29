'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"qa"',
  VUE_APP_SERVICE_URL_BASE: "'https://mutluuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'MUTLU UI DEVELOPMENT'",
  VUE_APP_VESION_NO: "'1.0.1.34'",
  BASE_URL: "'https://mutluvnapiuat.visionnext.com.tr/'",
  TENANT: "'MUTLU'"
})
