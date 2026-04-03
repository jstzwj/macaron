import WindowManager from '../app/windowManager'
import Preference from '../preferences'
import DataCenter from '../dataCenter'
import Keybindings from '../keyboard/shortcutHandler'
import AppMenu from '../menu'
import I18n from '../i18n'
import { loadMenuCommands } from '../menu/actions'
import { CommandManager, loadDefaultCommands } from '../commands'

class Accessor {
  /**
   * @param {AppEnvironment} appEnvironment The application environment instance.
   */
  constructor (appEnvironment) {
    const userDataPath = appEnvironment.paths.userDataPath

    this.env = appEnvironment
    this.paths = appEnvironment.paths // export paths to make it better accessible

    this.preferences = new Preference(this.paths)
    this.dataCenter = new DataCenter(this.paths)
    this.i18n = new I18n()
    this.i18n.setLanguage(this.preferences.getItem('language'), this.i18n.getSystemLocale())

    this.commandManager = CommandManager
    this._loadCommands()

    this.keybindings = new Keybindings(this.commandManager, appEnvironment)
    this.menu = new AppMenu(this.preferences, this.keybindings, userDataPath, this.i18n)
    this.windowManager = new WindowManager(this.menu, this.preferences)
  }

  _loadCommands () {
    const { commandManager } = this
    loadDefaultCommands(commandManager)
    loadMenuCommands(commandManager)

    if (this.env.isDevMode) {
      commandManager.__verifyDefaultCommands()
    }
  }
}

export default Accessor
