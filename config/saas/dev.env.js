'use strict'
const merge = require('webpack-merge')
const saasEnv = require('../saas.env')

module.exports = merge(saasEnv, {
  NODE_ENV: '"development"',
  VUE_APP_SERVICE_URL_BASE: "'https://saasvndevapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'SAAS UI DEVELOPMENT'",
  BASE_URL: "'https://saasfedev.visionnext.com.tr/'",
  SITE_NAME: "'SAAS'",
  HASH: "'2a3e24c0-ce45-50b0-3ff9-8b9523611a2b'"
})
