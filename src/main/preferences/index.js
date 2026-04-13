import fs from 'fs'
import path from 'path'
import EventEmitter from 'events'
import Store from 'electron-store'
import { BrowserWindow, ipcMain, nativeTheme, app } from 'electron'
import log from 'electron-log/main'
import { isWindows } from '../config'
import { hasSameKeys } from '../utils'
import { SYSTEM_LANGUAGE } from '../../common/i18n'
import schema from './schema'

const PREFERENCES_FILE_NAME = 'preferences'

class Preference extends EventEmitter {
  /**
   * @param {AppPaths} userDataPath The path instance.
   *
   * NOTE: This throws an exception when validation fails.
   *
   */
  constructor (paths) {
    // TODO: Preferences should not loaded if global.MARKTEXT_SAFE_MODE is set.
    super()

    const { preferencesPath } = paths
    this.preferencesPath = preferencesPath
    this.hasPreferencesFile = fs.existsSync(path.join(this.preferencesPath, `./${PREFERENCES_FILE_NAME}.json`))
    this.store = new Store({
      schema,
      name: PREFERENCES_FILE_NAME
    })

    this.staticPath = path.join(__static, 'preference.json')
    this.init()
  }

  init = () => {
    let defaultSettings = null
    try {
      defaultSettings = JSON.parse(fs.readFileSync(this.staticPath, { encoding: 'utf8' }) || '{}')

      // Set best theme on first application start.
      if (nativeTheme.shouldUseDarkColors) {
        defaultSettings.theme = 'dark'
      }
    } catch (err) {
      log.error(err)
    }

    if (!defaultSettings) {
      throw new Error('Can not load static preference.json file')
    }

    if (!this.hasPreferencesFile) {
      this.store.set(defaultSettings)
    } else {
      const userSetting = this.store.store
      const requiresUpdate = !hasSameKeys(defaultSettings, userSetting)
      const userSettingKeys = Object.keys(userSetting)
      const defaultSettingKeys = Object.keys(defaultSettings)

      if (requiresUpdate) {
        for (const key of userSettingKeys) {
          if (!defaultSettingKeys.includes(key)) {
            delete userSetting[key]
            this.store.delete(key)
          }
        }

        let addedNewEntries = false
        for (const key in defaultSettings) {
          if (!userSettingKeys.includes(key)) {
            addedNewEntries = true
            userSetting[key] = defaultSettings[key]
          }
        }
        if (addedNewEntries) {
          this.store.set(userSetting)
        }
      }
    }

    this._listenForIpcMain()
  }

  getAll () {
    return {
      ...this.store.store,
      systemLocale: app.getLocale(),
      language: this.store.get('language') || SYSTEM_LANGUAGE
    }
  }

  setItem (key, value) {
    const payload = { [key]: value }
    if (key === 'language') {
      payload.systemLocale = app.getLocale()
    }
    ipcMain.emit('broadcast-preferences-changed', payload)
    return this.store.set(key, value)
  }

  getItem (key) {
    if (key === 'systemLocale') {
      return app.getLocale()
    }
    return this.store.get(key)
  }

  /**
   * Change multiple setting entries.
   *
   * @param {Object.<string, *>} settings A settings object or subset object with key/value entries.
   */
  setItems (settings) {
    if (!settings) {
      log.error('Cannot change settings without entires: object is undefined or null.')
      return
    }

    Object.keys(settings).forEach(key => {
      this.setItem(key, settings[key])
    })
  }

  getPreferredEol () {
    const endOfLine = this.getItem('endOfLine')
    if (endOfLine === 'lf') {
      return 'lf'
    }
    return endOfLine === 'crlf' || isWindows ? 'crlf' : 'lf'
  }

  exportJSON () {
    // todo
  }

  importJSON () {
    // todo
  }

  _listenForIpcMain () {
    ipcMain.on('mt::ask-for-user-preference', e => {
      const win = BrowserWindow.fromWebContents(e.sender)
      win.webContents.send('mt::user-preference', this.getAll())
    })
    ipcMain.on('mt::set-user-preference', (e, settings) => {
      this.setItems(settings)
      // Send updated preferences back to the renderer so Vuex state updates
      e.sender.send('mt::user-preference', this.getAll())
    })
    ipcMain.on('mt::cmd-toggle-autosave', e => {
      this.setItem('autoSave', !!this.getItem('autoSave'))
    })

    ipcMain.on('set-user-preference', settings => {
      this.setItems(settings)
    })
  }
}

export default Preference
