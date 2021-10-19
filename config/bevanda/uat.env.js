'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://bevandapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BEVANDA UI UAT'",
  VUE_APP_VESION_NO: "'1.0.1.54'",
  BASE_URL: "'https://bevandauat.visionnext.com.tr/'",
  TENANT: "'SAAS'",
  SITE_NAME: "'BEVANDA'",
  HASH: "'5c89a47b-af65-1188-e095-3ae3677435d5'"
})
