import { ipcMain, MenuItem } from 'electron'
import { isOsx } from '../../config'
import { hunspellService } from '../../hunspell/HunspellService'
import { SEPARATOR } from './menuItems'

/**
 * Build the spell checker menu depending on input.
 *
 * @param {boolean} isMisspelled Whether a the selected word is misspelled.
 * @param {[string]} misspelledWord The selected word.
 * @param {[string[]]} wordSuggestions Suggestions for `selectedWord`.
 * @returns {MenuItem[]}
 */
export default (isMisspelled, misspelledWord, wordSuggestions) => {
  const spellingSubmenu = []

  spellingSubmenu.push(new MenuItem({
    label: 'Change Language...',
    // NB: On macOS the OS spell checker is used and will detect the language automatically.
    visible: !isOsx,
    click (menuItem, targetWindow) {
      targetWindow.webContents.send('mt::spelling-show-switch-language')
    }
  }))

  // Handle misspelled word if wordSuggestions is set, otherwise word is correct.
  if (isMisspelled && misspelledWord && wordSuggestions) {
    spellingSubmenu.push({
      label: 'Add to Dictionary',
      click (menuItem, targetWindow) {
        hunspellService.addToDictionary(misspelledWord)
      }
    })

    if (wordSuggestions.length > 0) {
      spellingSubmenu.push(SEPARATOR)
      for (const word of wordSuggestions) {
        spellingSubmenu.push({
          label: word,
          click (menuItem, targetWindow) {
            targetWindow.webContents.send('mt::spelling-replace-misspelling', {
              word: misspelledWord,
              replacement: word
            })
          }
        })
      }
    }
  } else {
    spellingSubmenu.push({
      label: 'Edit Dictionary...',
      click (menuItem, targetWindow) {
        if (targetWindow) {
          targetWindow.webContents.send('mt::show-inline-preferences', 'spelling')
        } else {
          ipcMain.emit('app-create-settings-window', 'spelling')
        }
      }
    })
  }
  return spellingSubmenu
}
