import { ipcMain, BrowserWindow } from 'electron'
import { hunspellService } from '../hunspell/HunspellService'

const setNativeSpellCheckerEnabled = (win, enabled) => {
  win.webContents.session.setSpellCheckerEnabled(enabled)
  return win.webContents.session.isSpellCheckerEnabled() === enabled
}

const switchNativeSpellCheckerLanguage = (win, lang) => {
  const available = win.webContents.session.availableSpellCheckerLanguages || []
  if (!available.includes(lang)) {
    return false
  }
  win.webContents.session.setSpellCheckerLanguages([lang])
  return true
}

export default () => {
  ipcMain.handle('mt::spellchecker-set-enabled', async (e, enabled) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    return setNativeSpellCheckerEnabled(win, enabled)
  })

  ipcMain.handle('mt::spellchecker-switch-language', async (e, lang) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    return switchNativeSpellCheckerLanguage(win, lang)
  })

  ipcMain.handle('mt::hunspell-is-misspelled', async (e, word) => {
    return hunspellService.isMisspelled(word)
  })

  ipcMain.handle('mt::hunspell-get-suggestions', async (e, word) => {
    return hunspellService.getSuggestions(word)
  })

  ipcMain.handle('mt::hunspell-add-to-dictionary', async (e, word) => {
    return hunspellService.addToDictionary(word)
  })

  ipcMain.handle('mt::hunspell-remove-from-dictionary', async (e, word) => {
    return hunspellService.removeFromDictionary(word)
  })

  ipcMain.handle('mt::hunspell-switch-language', async (e, lang) => {
    return hunspellService.setLanguage(lang)
  })

  ipcMain.handle('mt::hunspell-get-available-dictionaries', async () => {
    return hunspellService.getAvailableDictionaries()
  })

  ipcMain.handle('mt::hunspell-download-dictionary', async (e, lang) => {
    return hunspellService.downloadDictionary(lang)
  })

  ipcMain.handle('mt::hunspell-all-languages', async () => {
    return hunspellService.getAllSupportedLanguages()
  })

  ipcMain.handle('mt::hunspell-has-dictionary', async (e, lang) => {
    return hunspellService.hasDictionary(lang)
  })
}
