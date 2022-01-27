'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://bevandapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'BEVANDA UI UAT'",
  BASE_URL: "'https://bevandauat.visionnext.com.tr/'",
  SITE_NAME: "'BEVANDA'",
  HASH: "'5c89a47b-af65-1188-e095-3ae3677435d5'"
})
