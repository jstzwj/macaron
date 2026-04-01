'use strict'
const fs = require('fs')
const path = require('path')

const patchFile = (filePath, transform) => {
  if (!fs.existsSync(filePath)) {
    return
  }

  const original = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const patched = transform(original)
  if (patched !== original) {
    fs.writeFileSync(filePath, patched)
  }
}

const patchNativeKeymapForWindows = () => {
  if (process.platform !== 'win32') {
    return
  }

  const bindingGypPath = path.resolve(__dirname, '../node_modules/native-keymap/binding.gyp')
  patchFile(bindingGypPath, content => {
    let patched = content.replace(/\n\s*'msvs_configuration_attributes': \{\n\s*'SpectreMitigation': 'Spectre'\n\s*\},/, '')
    patched = patched.replace("'/ZH:SHA_256'", "'/ZH:SHA_256',\n            '/wd4996'")
    return patched
  })
}

const patchWindowsRelease = () => {
  // WORKAROUND: Fix slow startup time on Windows due to blocking powershell call(s) in windows-release.
  //   Replace the problematic file with our "fixed" version.
  const windowsReleasePath = path.resolve(__dirname, '../node_modules/windows-release')
  if (fs.existsSync(windowsReleasePath)) {
    const windowsReleaseJson = path.join(windowsReleasePath, 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(windowsReleaseJson, { encoding: 'utf-8' }))

    const windowsReleaseMajor = Number(packageJson.version.match(/^(\d+)\./)[1])
    if (windowsReleaseMajor >= 5) {
      console.error('[ERROR] "windows-release" workaround failed because version is >=5.\n')
      process.exit(1)
    }

    const srcPath = path.resolve(__dirname, '../resources/build/windows-release.js')
    const destPath = path.join(windowsReleasePath, 'index.js')
    fs.copyFileSync(srcPath, destPath)
  }
}

patchNativeKeymapForWindows()
patchWindowsRelease()
