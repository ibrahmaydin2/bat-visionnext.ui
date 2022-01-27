'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://saasvnuatapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'SAAS UI UAT'",
  BASE_URL: "'https://saasfeuat.visionnext.com.tr/'",
  SITE_NAME: "'SAAS'",
  HASH: "'7aaa7777-e737-4f10-82be-76db0177e462'"
})
