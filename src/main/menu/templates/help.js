import path from 'path'
import { shell } from 'electron'
import { isFile } from 'common/filesystem'
import * as actions from '../actions/help'
import { checkUpdates } from '../actions/marktext'

const isUpdatable = () => {
  const resFile = isFile(path.join(process.resourcesPath, 'app-update.yml'))
  if (!resFile) {
    return false
  } else if (process.env.APPIMAGE) {
    return true
  } else if (process.platform === 'win32' && isFile(path.join(process.resourcesPath, 'md.ico'))) {
    return true
  }

  return false
}

export default function (i18n) {
  const helpMenu = {
    label: i18n.t('menu.help.root'),
    role: 'help',
    submenu: [{
      label: i18n.t('menu.help.quickStart'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/docs/README.md')
      }
    }, {
      label: i18n.t('menu.help.markdownReference'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/docs/MARKDOWN_SYNTAX.md')
      }
    }, {
      label: i18n.t('menu.help.changelog'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/.github/CHANGELOG.md')
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('menu.help.donate'),
      click () {
        shell.openExternal('https://opencollective.com/marktext')
      }
    }, {
      label: i18n.t('menu.help.feedbackViaTwitter'),
      click (item, win) {
        actions.showTweetDialog(win, 'twitter')
      }
    }, {
      label: i18n.t('menu.help.reportIssue'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/issues')
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('menu.help.website'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext')
      }
    }, {
      label: i18n.t('menu.help.watchOnGitHub'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext')
      }
    }, {
      label: i18n.t('menu.help.followOnGitHub'),
      click () {
        shell.openExternal('https://github.com/Jocs')
      }
    }, {
      label: i18n.t('menu.help.followOnTwitter'),
      click () {
        shell.openExternal('https://twitter.com/marktextapp')
      }
    }, {
      type: 'separator'
    }, {
      label: i18n.t('menu.help.license'),
      click () {
        shell.openExternal('https://github.com/marktext/marktext/blob/master/LICENSE')
      }
    }]
  }

  if (isUpdatable()) {
    helpMenu.submenu.push({
      type: 'separator'
    }, {
      label: i18n.t('menu.help.checkForUpdates'),
      click (menuItem, browserWindow) {
        checkUpdates(browserWindow)
      }
    })
  }

  if (process.platform !== 'darwin') {
    helpMenu.submenu.push({
      type: 'separator'
    }, {
      label: i18n.t('menu.help.about'),
      click (menuItem, browserWindow) {
        actions.showAboutDialog(browserWindow)
      }
    })
  }
  return helpMenu
}
