'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"uat"',
  VUE_APP_SERVICE_URL_BASE: "'https://mutluvnapiuat.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'MUTLU UI UAT'",
  BASE_URL: "'https://mutluat.visionnext.com.tr/'",
  SITE_NAME: "'MUTLU'",
  HASH: "'13ebeefd-fe04-bbac-778a-0a56e996c363'"
})
