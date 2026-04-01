/**
 * This file is used specifically and only for development. It installs
 * `vue-devtools`. There shouldn't be any need to modify this file,
 * but it can be used to extend your development environment.
 */

/* eslint-disable */
require('dotenv').config()

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  try {
    const { session } = require('electron')
    const path = require('path')
    const vueDevtoolsPath = path.join(__dirname, '../../node_modules/vue-devtools/vender')
    session.defaultSession.loadExtension(vueDevtoolsPath)
      .then(() => console.log('Vue Devtools loaded'))
      .catch(err => console.log('Unable to install `vue-devtools`: \n', err))
  } catch (err) {
    console.log('Unable to install `vue-devtools`: \n', err)
  }
})

/* eslint-enable */

// Require `main` process to boot app
require('./index')
