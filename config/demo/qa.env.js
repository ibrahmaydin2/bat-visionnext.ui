'use strict'
const merge = require('webpack-merge')
const batEnv = require('../bat.env')

module.exports = merge(batEnv, {
  NODE_ENV: '"qa"',
  VUE_APP_SERVICE_URL_BASE: "'https://demoapi.visionnext.com.tr/'",
  VUE_APP_SYSTEM_NAME: "'DEMO UI QA'",
  BASE_URL: "'https://demo.visionnext.com.tr/'",
  SITE_NAME: "'DEMO'",
  HASH: "'d56add78-bd72-a2af-59b7-65c8854dd040'"
})
