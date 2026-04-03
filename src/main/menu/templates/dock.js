import { app, Menu } from 'electron'
import * as actions from '../actions/file'

export const createDockMenu = i18n => Menu.buildFromTemplate([{
  label: i18n.t('menu.dock.open'),
  click (menuItem, browserWindow) {
    if (browserWindow) {
      actions.openFile(browserWindow)
    } else {
      actions.newEditorWindow()
    }
  }
}, {
  label: i18n.t('menu.dock.clearRecent'),
  click () {
    app.clearRecentDocuments()
  }
}])
