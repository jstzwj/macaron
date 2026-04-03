import edit from './edit'
import prefEdit from './prefEdit'
import file from './file'
import help from './help'
import marktext from './marktext'
import view from './view'
import window from './window'
import paragraph from './paragraph'
import format from './format'
import theme from './theme'

export { createDockMenu } from './dock'

/**
 * Create the setting window menu.
 *
 * @param {Keybindings} keybindings The keybindings instance
 * @param {I18n} i18n The i18n instance
 */
export const configSettingMenu = (keybindings, i18n) => {
  return [
    ...(process.platform === 'darwin' ? [marktext(keybindings, i18n)] : []),
    prefEdit(keybindings, i18n),
    help(i18n)
  ]
}

/**
 * Create the application menu for the editor window.
 *
 * @param {Keybindings} keybindings The keybindings instance.
 * @param {Preference} preferences The preference instance.
 * @param {string[]} recentlyUsedFiles The recently used files.
 * @param {I18n} i18n The i18n instance.
 */
export default function (keybindings, preferences, recentlyUsedFiles, i18n) {
  return [
    ...(process.platform === 'darwin' ? [marktext(keybindings, i18n)] : []),
    file(keybindings, preferences, recentlyUsedFiles, i18n),
    edit(keybindings, i18n),
    paragraph(keybindings, i18n),
    format(keybindings, i18n),
    window(keybindings, i18n),
    theme(preferences, i18n),
    view(keybindings, i18n),
    help(i18n)
  ]
}
