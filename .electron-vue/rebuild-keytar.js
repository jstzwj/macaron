'use strict'
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// Workaround: electron-rebuild silently fails to rebuild keytar because
// node-addon-api headers are not found in its rebuild environment.
// We rebuild keytar manually using node-gyp targeting the Electron version.
const keytarPath = path.resolve(__dirname, '../node_modules/keytar')
const electronPkg = require('../node_modules/electron/package.json')
const electronVersion = electronPkg.version

const keytarNodePath = path.join(keytarPath, 'build', 'Release', 'keytar.node')
if (fs.existsSync(keytarNodePath)) {
  console.log('keytar.node already exists, skipping manual rebuild')
  process.exit(0)
}

console.log(`Manually rebuilding keytar for Electron ${electronVersion}...`)
try {
  execSync(
    `npx node-gyp rebuild --target=${electronVersion} --arch=x64 --dist-url=https://electronjs.org/headers`,
    {
      cwd: keytarPath,
      stdio: 'inherit',
      env: {
        ...process.env,
        HOME: process.env.HOME || process.env.USERPROFILE
      }
    }
  )

  if (fs.existsSync(keytarNodePath)) {
    console.log('keytar.node built successfully')
  } else {
    console.error('WARNING: keytar.node was not produced by manual rebuild')
  }
} catch (err) {
  console.error('WARNING: Manual keytar rebuild failed:', err.message)
}
