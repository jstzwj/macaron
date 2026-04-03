import { app } from 'electron'
import { showAboutDialog } from '../actions/help'
import * as actions from '../actions/marktext'

// macOS only menu.

export default function (keybindings, i18n) {
  return {
    label: i18n.t('menu.macaron.root'),
    submenu: [{
      label: i18n.t('menu.macaron.about'),
      click (menuItem, focusedWindow) {
        showAboutDialog(focusedWindow)
      }
    }, {
      label: i18n.t('menu.macaron.checkForUpdates'),
      click (menuItem, focusedWindow) {
        actions.checkUpdates(focusedWindow)
      }
    }, {
      label: i18n.t('menu.macaron.preferences'),
      accelerator: keybindings.getAccelerator('file.preferences'),
      click () {
        actions.userSetting()
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('menu.macaron.services'),
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: i18n.t('menu.macaron.hide'),
      accelerator: keybindings.getAccelerator('mt.hide'),
      click () {
        actions.osxHide()
      }
    }, {
      label: i18n.t('menu.macaron.hideOthers'),
      accelerator: keybindings.getAccelerator('mt.hide-others'),
      click () {
        actions.osxHideAll()
      }
    }, {
      label: i18n.t('menu.macaron.showAll'),
      click () {
        actions.osxShowAll()
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('menu.macaron.quit'),
      accelerator: keybindings.getAccelerator('file.quit'),
      click: app.quit
    }]
  }
}
