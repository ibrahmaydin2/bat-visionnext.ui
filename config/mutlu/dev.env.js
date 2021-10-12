'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SERVICE_URL_BASE: "'https://mutluvnapidev.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'MUTLU UI DEVELOPMENT'",
  VUE_APP_VESION_NO: "'1.0.1.53'",
  BASE_URL: "'https://mutludev.visionnext.com.tr/'",
  TENANT: "'SAAS'",
  SITE_NAME: "'MUTLU'",
  HASH: "'8ced6612-e737-4f10-82be-76db0177e462'"
})
