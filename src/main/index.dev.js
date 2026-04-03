/**
 * This file is used specifically and only for development. It installs
 * `vue-devtools`. There shouldn't be any need to modify this file,
 * but it can be used to extend your development environment.
 */

/* eslint-disable */
require('dotenv').config()

// Install `vue-devtools` if available
require('electron').app.on('ready', () => {
  try {
    const { session } = require('electron')
    const path = require('path')
    const fs = require('fs')

    // Look for vue-devtools in common locations
    const devtoolsPaths = [
      path.join(__dirname, '../../node_modules/vue-devtools/vender'),
      path.join(__dirname, '../../node_modules/vue-devtools/vendor')
    ]

    const devtoolsPath = devtoolsPaths.find(p => fs.existsSync(p))

    if (devtoolsPath) {
      const loadFn = session.defaultSession.extensions
        ? session.defaultSession.extensions.loadExtension.bind(session.defaultSession)
        : session.defaultSession.loadExtension.bind(session.defaultSession)
      loadFn(devtoolsPath)
        .then(() => console.log('Vue Devtools loaded'))
        .catch(err => console.log('Unable to install `vue-devtools`: \n', err))
    } else {
      console.log('Vue Devtools not found. Install it via: yarn add --dev vue-devtools')
      console.log('Or use the browser extension with remote debugging.')
    }
  } catch (err) {
    console.log('Unable to install `vue-devtools`: \n', err)
  }
})

/* eslint-enable */

// Require `main` process to boot app
require('./index')
