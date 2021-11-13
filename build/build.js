'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
let nodeEnv = process.argv.length <= 2 ? 'dev' : process.argv[2]
const webpackConfig = require(`./webpack.${nodeEnv}.conf`)
const spinner = ora(`building for ${nodeEnv}...`)
const workboxBuild = require('workbox-build')
const workboxConfig = require('../workbox-config')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: true,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: true,
      chunkModules: true
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    workboxBuild.generateSW(workboxConfig)
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})