'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://mutluvnapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'MUTLU UI UAT'",
  VUE_APP_VESION_NO: "'1.0.1.62'",
  BASE_URL: "'https://mutluat.visionnext.com.tr/'",
  TENANT: "'SAAS'",
  SITE_NAME: "'MUTLU'",
  HASH: "'13ebeefd-fe04-bbac-778a-0a56e996c363'"
})
