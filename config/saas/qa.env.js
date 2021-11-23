'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"qa"',
  VUE_APP_SERVICE_URL_BASE: "'https://saasvnqaapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'SAAS UI QA'",
  VUE_APP_VESION_NO: "'1.0.1.60'",
  BASE_URL: "'https://saasqa.visionnext.com.tr/'",
  TENANT: "'SAAS'",
  SITE_NAME: "'SAAS'",
  HASH: "'7aaa7777-e737-4f10-82be-76db0177e462'"
})
