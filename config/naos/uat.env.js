'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://naosapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'NAOS UI UAT'",
  VUE_APP_VESION_NO: "'1.0.1.53'",
  BASE_URL: "'https://naosuat.visionnext.com.tr/'",
  TENANT: "'SAAS'",
  SITE_NAME: "'NAOS'",
  HASH: "'db86848c-584e-34f7-c489-c82f2ca9a8d4'"
})
