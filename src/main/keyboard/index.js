import { ipcMain, shell } from 'electron'
import log from 'electron-log/main'
import EventEmitter from 'events'
import fsPromises from 'fs/promises'
import os from 'os'
import path from 'path'

let nativeKeymapAvailable = false
let nativeKeymap = null
try {
  nativeKeymap = require('native-keymap')
  // Probe whether the native binding actually works without triggering console.error
  // by checking if the internal _init has a valid native module path
  const fs = require('fs')
  const bindingDir = path.join(
    path.dirname(require.resolve('native-keymap/package.json')),
    'build'
  )
  const hasRelease = fs.existsSync(path.join(bindingDir, 'Release', 'keymapping.node'))
  const hasDebug = fs.existsSync(path.join(bindingDir, 'Debug', 'keymapping.node'))
  if (hasRelease || hasDebug) {
    // Let native-keymap initialize — it should succeed
    nativeKeymapAvailable = typeof nativeKeymap.getKeyMap() !== 'undefined'
  } else {
    log.warn('native-keymap native binding not found. Falling back to default keyboard layout.')
  }
} catch (error) {
  log.warn('native-keymap is unavailable. Falling back to default keyboard layout.', error)
}

const safeNativeCall = (fn, fallbackValue) => {
  if (!nativeKeymap || !nativeKeymapAvailable) {
    return fallbackValue
  }
  try {
    const result = fn()
    return result == null ? fallbackValue : result
  } catch (error) {
    log.warn('Failed to access native keyboard layout information.', error)
    return fallbackValue
  }
}

let currentKeyboardInfo = null
const getSafeKeyboardInfo = () => {
  const layout = safeNativeCall(() => nativeKeymap.getCurrentKeyboardLayout(), 'en-US')
  const keymap = safeNativeCall(() => nativeKeymap.getKeyMap(), [])
  return {
    layout,
    keymap: Array.isArray(keymap) ? keymap : []
  }
}

const loadKeyboardInfo = () => {
  currentKeyboardInfo = getSafeKeyboardInfo()
  return currentKeyboardInfo
}

export const getKeyboardInfo = () => {
  if (!currentKeyboardInfo) {
    return loadKeyboardInfo()
  }
  return currentKeyboardInfo
}

const KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID = 'onDidChangeKeyboardLayout'
class KeyboardLayoutMonitor extends EventEmitter {
  constructor () {
    super()
    this._isSubscribed = false
    this._emitTimer = null
  }

  addListener (callback) {
    this._ensureNativeListener()
    this.on(KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID, callback)
  }

  removeListener (callback) {
    this.removeListener(KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID, callback)
  }

  _ensureNativeListener () {
    if (!this._isSubscribed) {
      const subscribed = safeNativeCall(() => {
        nativeKeymap.onDidChangeKeyboardLayout(() => {
          clearTimeout(this._emitTimer)
          this._emitTimer = setTimeout(() => {
            this.emit(KEYBOARD_LAYOUT_MONITOR_CHANNEL_ID, loadKeyboardInfo())
            this._emitTimer = null
          }, 150)
        })
        return true
      }, false)
      this._isSubscribed = subscribed
    }
  }
}

export const keyboardLayoutMonitor = new KeyboardLayoutMonitor()

export const registerKeyboardListeners = () => {
  ipcMain.handle('mt::keybinding-get-keyboard-info', async () => {
    return getKeyboardInfo()
  })
  ipcMain.on('mt::keybinding-debug-dump-keyboard-info', async () => {
    const dumpPath = path.join(os.tmpdir(), 'marktext_keyboard_info.json')
    const content = JSON.stringify(getKeyboardInfo(), null, 2)
    fsPromises.writeFile(dumpPath, content, 'utf8')
      .then(() => {
        console.log(`Keyboard information written to "${dumpPath}".`)
        shell.openPath(dumpPath)
      })
      .catch(error => {
        log.error('Error dumping keyboard information:', error)
      })
  })
}
