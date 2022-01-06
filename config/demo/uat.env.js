'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://demoapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'DEMO UI UAT'",
  VUE_APP_VESION_NO: "'1.0.1.63'",
  BASE_URL: "'https://demo.visionnext.com.tr/'",
  TENANT: "'BAT'",
  SITE_NAME: "'DEMO'",
  HASH: "'d56add78-bd72-a2af-59b7-65c8854dd040'"
})
