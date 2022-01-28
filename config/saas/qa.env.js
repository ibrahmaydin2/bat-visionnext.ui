'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"qa"',
  VUE_APP_SERVICE_URL_BASE: "'https://saasvnqaapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'SAAS UI QA'",
  BASE_URL: "'https://saasqa.visionnext.com.tr/'",
  SITE_NAME: "'SAAS'",
  HASH: "'7aaa7777-e737-4f10-82be-76db0177e462'"
})
