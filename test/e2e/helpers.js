const os = require('os')
const path = require('path')
const { _electron } = require('playwright')

const mainEntrypoint = 'dist/electron/main.js'

const getTempPath = () => {
  return path.join(os.tmpdir(), `marktext-e2etest-${Date.now()}-${process.pid}`)
}

const getElectronPath = () => {
  const launcherName = process.platform === 'win32' ? 'electron.cmd' : 'electron'
  return path.resolve(path.join('node_modules', '.bin', launcherName))
}

const launchElectron = async userArgs => {
  userArgs = userArgs || []
  const executablePath = getElectronPath()
  const args = [mainEntrypoint, '--user-data-dir', getTempPath()].concat(userArgs)
  const app = await _electron.launch({
    executablePath,
    args,
    timeout: 30000
  })
  const page = await app.firstWindow()
  await page.waitForLoadState('domcontentloaded')
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { app, page }
}

module.exports = { getElectronPath, launchElectron}
