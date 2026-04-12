import path from 'path'
import fsPromises from 'fs/promises'
import { exec } from 'child_process'
import dayjs from 'dayjs'
import log from 'electron-log/main'
import { app, BrowserWindow, clipboard, dialog, ipcMain, Menu, nativeTheme, shell } from 'electron'
import plist from 'plist'
import { isChildOfDirectory } from 'common/filesystem/paths'
import { isLinux, isOsx, isWindows } from '../config'
import parseArgs from '../cli/parser'
import { normalizeAndResolvePath } from '../filesystem'
import { normalizeMarkdownPath } from '../filesystem/markdown'
import { registerKeyboardListeners } from '../keyboard'
import { selectTheme } from '../menu/actions/theme'
import { createDockMenu } from '../menu/templates'
import registerSpellcheckerListeners from '../spellchecker'
import { watchers } from '../utils/imagePathAutoComplement'
import { WindowType } from '../windows/base'
import EditorWindow from '../windows/editor'
import SettingWindow from '../windows/setting'

class App {
  /**
   * @param {Accessor} accessor The application accessor for application instances.
   * @param {arg.Result} args Parsed application arguments.
   */
  constructor (accessor, args) {
    this._accessor = accessor
    this._args = args || { _: [] }
    this._openFilesCache = []
    this._openFilesTimer = null
    this._windowManager = this._accessor.windowManager

    this._listenForIpcMain()
  }

  /**
   * The entry point into the application.
   */
  init () {
    // Enable these features to use `backdrop-filter` css rules!
    app.commandLine.appendSwitch('enable-experimental-web-platform-features', 'true')

    app.on('second-instance', (event, argv, workingDirectory) => {
      const { _openFilesCache, _windowManager } = this
      const args = parseArgs(argv.slice(1))

      const buf = []
      for (const pathname of args._) {
        if (pathname.startsWith('--')) {
          continue
        }

        const info = normalizeMarkdownPath(path.resolve(workingDirectory, pathname))
        if (info) {
          buf.push(info)
        }
      }

      if (args['--new-window']) {
        this._openPathList(buf, true)
        return
      }

      _openFilesCache.push(...buf)
      if (_openFilesCache.length) {
        this._openFilesToOpen()
      } else {
        const activeWindow = _windowManager.getActiveWindow()
        if (activeWindow) {
          activeWindow.bringToFront()
        }
      }
    })

    app.on('open-file', this.openFile) // macOS only
    app.on('ready', this.ready)

    app.on('window-all-closed', () => {
      for (const watcher of watchers.values()) {
        watcher.close()
      }
      this._windowManager.closeWatcher()
      if (!isOsx) {
        app.quit()
      }
    })

    app.on('activate', () => { // macOS only
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (this._windowManager.windowCount === 0) {
        this.ready()
      }
    })

    // Prevent to load webview and opening links or new windows via HTML/JS.
    app.on('web-contents-created', (event, contents) => {
      contents.on('will-attach-webview', event => {
        event.preventDefault()
      })
      contents.on('will-navigate', event => {
        event.preventDefault()
      })
      contents.setWindowOpenHandler(() => {
        return { action: 'deny' }
      })
    })
  }

  async getScreenshotFileName () {
    const screenshotFolderPath = await this._accessor.dataCenter.getItem('screenshotFolderPath')
    const fileName = `${dayjs().format('YYYY-MM-DD-HH-mm-ss')}-screenshot.png`
    return path.join(screenshotFolderPath, fileName)
  }

  ready = () => {
    const { _args: args, _openFilesCache } = this
    const { preferences, i18n } = this._accessor

    if (args._.length) {
      for (const pathname of args._) {
        if (pathname.startsWith('--')) {
          continue
        }

        const info = normalizeMarkdownPath(pathname)
        if (info) {
          _openFilesCache.push(info)
        }
      }
    }

    const {
      startUpAction,
      defaultDirectoryToOpen,
      autoSwitchTheme,
      theme
    } = preferences.getAll()

    if (startUpAction === 'folder' && defaultDirectoryToOpen) {
      const info = normalizeMarkdownPath(defaultDirectoryToOpen)
      if (info) {
        _openFilesCache.unshift(info)
      }
    }

    const isDarkTheme = /dark/i.test(theme)
    if (autoSwitchTheme === 0 && isDarkTheme !== nativeTheme.shouldUseDarkColors) {
      selectTheme(nativeTheme.shouldUseDarkColors ? 'dark' : 'light')
      nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
    } else {
      nativeTheme.themeSource = isDarkTheme ? 'dark' : 'light'
    }

    let isDarkMode = nativeTheme.shouldUseDarkColors
    ipcMain.on('broadcast-preferences-changed', change => {
      if (change.theme) {
        const changedIsDarkTheme = /dark/i.test(change.theme)
        if (isDarkMode !== changedIsDarkTheme) {
          isDarkMode = changedIsDarkTheme
          nativeTheme.themeSource = changedIsDarkTheme ? 'dark' : 'light'
        } else if (nativeTheme.themeSource === 'system') {
          nativeTheme.themeSource = isDarkMode ? 'dark' : 'light'
        }
      }

      if (change.language !== undefined || change.systemLocale !== undefined) {
        i18n.setLanguage(preferences.getItem('language'), preferences.getItem('systemLocale'))
        if (isOsx) {
          app.dock.setMenu(createDockMenu(i18n))
        }
      }
    })

    if (isOsx) {
      app.dock.setMenu(createDockMenu(i18n))
    } else if (isWindows) {
      app.setJumpList([{
        type: 'recent'
      }, {
        type: 'tasks',
        items: [{
          type: 'task',
          title: 'New Window',
          description: 'Opens a new window',
          program: process.execPath,
          args: '--new-window',
          iconPath: process.execPath,
          iconIndex: 0
        }]
      }])
    }

    if (_openFilesCache.length) {
      this._openFilesToOpen()
    } else {
      this._createEditorWindow()
    }
  }

  openFile = (event, pathname) => {
    event.preventDefault()
    const info = normalizeMarkdownPath(pathname)
    if (info) {
      this._openFilesCache.push(info)

      if (app.isReady()) {
        if (this._openFilesTimer) {
          clearTimeout(this._openFilesTimer)
        }
        this._openFilesTimer = setTimeout(() => {
          this._openFilesTimer = null
          this._openFilesToOpen()
        }, 100)
      }
    }
  }

  _createEditorWindow (rootDirectory = null, fileList = [], markdownList = [], options = {}) {
    const editor = new EditorWindow(this._accessor)
    editor.createWindow(rootDirectory, fileList, markdownList, options)
    this._windowManager.add(editor)
    if (this._windowManager.windowCount === 1) {
      this._accessor.menu.setActiveWindow(editor.id)
    }
    return editor
  }

  _createSettingWindow (category) {
    const setting = new SettingWindow(this._accessor)
    setting.createWindow(category)
    this._windowManager.add(setting)
    if (this._windowManager.windowCount === 1) {
      this._accessor.menu.setActiveWindow(setting.id)
    }
  }

  _openFilesToOpen () {
    this._openPathList(this._openFilesCache, false)
  }

  /**
   * Open the path list in the best window(s).
   *
   * @param {string[]} pathsToOpen The path list to open.
   * @param {boolean} openFilesInSameWindow Open all files in the same window with
   * the first directory and discard other directories.
   */
  _openPathList (pathsToOpen, openFilesInSameWindow = false) {
    const { _windowManager } = this
    const openFilesInNewWindow = this._accessor.preferences.getItem('openFilesInNewWindow')

    const fileSet = new Set()
    const directorySet = new Set()
    for (const { isDir, path } of pathsToOpen) {
      if (isDir) {
        directorySet.add(path)
      } else {
        fileSet.add(path)
      }
    }

    // Filter out directories that are already opened.
    for (const window of _windowManager.windows.values()) {
      if (window.type === WindowType.EDITOR) {
        const { openedRootDirectory } = window
        if (directorySet.has(openedRootDirectory)) {
          window.bringToFront()
          directorySet.delete(openedRootDirectory)
        }
      }
    }

    const directoriesToOpen = Array.from(directorySet).map(dir => ({ rootDirectory: dir, fileList: [] }))
    const filesToOpen = Array.from(fileSet)

    // Discard all directories except first one and add files.
    if (openFilesInSameWindow) {
      if (directoriesToOpen.length) {
        directoriesToOpen[0].fileList.push(...filesToOpen)
        directoriesToOpen.length = 1
      } else {
        directoriesToOpen.push({ rootDirectory: null, fileList: [...filesToOpen] })
      }
      filesToOpen.length = 0
    }

    // Find the best window(s) to open the files in.
    if (!openFilesInSameWindow && !openFilesInNewWindow) {
      const isFirstWindow = _windowManager.getActiveEditorId() === null

      // Prefer new directories
      for (let i = 0; i < directoriesToOpen.length; ++i) {
        const { fileList, rootDirectory } = directoriesToOpen[i]

        let breakOuterLoop = false
        for (let j = 0; j < filesToOpen.length; ++j) {
          const pathname = filesToOpen[j]
          if (isChildOfDirectory(rootDirectory, pathname)) {
            if (isFirstWindow) {
              fileList.push(...filesToOpen)
              filesToOpen.length = 0
              breakOuterLoop = true
              break
            }
            fileList.push(pathname)
            filesToOpen.splice(j, 1)
            --j
          }
        }

        if (breakOuterLoop) {
          break
        }
      }

      // Find for the remaining files the best window to open the files in.
      if (isFirstWindow && directoriesToOpen.length && filesToOpen.length) {
        const { fileList } = directoriesToOpen[0]
        fileList.push(...filesToOpen)
        filesToOpen.length = 0
      } else {
        const windowList = _windowManager.findBestWindowToOpenIn(filesToOpen)
        for (const item of windowList) {
          const { windowId, fileList } = item

          // File list is empty when all files are already opened.
          if (fileList.length === 0) {
            continue
          }

          if (windowId !== null) {
            const window = _windowManager.get(windowId)
            if (window) {
              window.openTabsFromPaths(fileList)
              window.bringToFront()
              continue
            }
            // else: fallthrough
          }
          this._createEditorWindow(null, fileList)
        }
      }

      // Directores are always opened in a new window if not already opened.
      for (const item of directoriesToOpen) {
        const { rootDirectory, fileList } = item
        this._createEditorWindow(rootDirectory, fileList)
      }
    } else {
      // Open each file and directory in a new window.

      for (const pathname of filesToOpen) {
        this._createEditorWindow(null, [pathname])
      }

      for (const item of directoriesToOpen) {
        const { rootDirectory, fileList } = item
        this._createEditorWindow(rootDirectory, fileList)
      }
    }

    // Empty the file list
    pathsToOpen.length = 0
  }

  _openSettingsWindow (category) {
    const settingWins = this._windowManager.getWindowsByType(WindowType.SETTINGS)
    if (settingWins.length >= 1) {
      // A setting window is already created
      const browserSettingWindow = settingWins[0].win.browserWindow
      browserSettingWindow.webContents.send('settings::change-tab', category)
      if (isLinux) {
        browserSettingWindow.focus()
      } else {
        browserSettingWindow.moveTop()
      }
      return
    }
    this._createSettingWindow(category)
  }

  _listenForIpcMain () {
    registerKeyboardListeners()
    registerSpellcheckerListeners()

    ipcMain.on('app-create-editor-window', () => {
      this._createEditorWindow()
    })

    ipcMain.on('screen-capture', async win => {
      if (isOsx) {
        // Use macOs `screencapture` command line when in macOs system.
        const screenshotFileName = await this.getScreenshotFileName()
        exec('screencapture -i -c', async (err) => {
          if (err) {
            log.error(err)
            return
          }
          try {
            // Write screenshot image into screenshot folder.
            const image = clipboard.readImage()
            const bufferImage = image.toPNG()
            await fsPromises.writeFile(screenshotFileName, bufferImage)
          } catch (err) {
            log.error(err)
          }
          win.webContents.send('mt::screenshot-captured')
        })
      } else {
        // TODO: Do nothing, maybe we'll add screenCapture later on Linux and Windows.
        // if (this.shortcutCapture) {
        //   this.launchScreenshotWin = win
        //   this.shortcutCapture.shortcutCapture()
        // }
      }
    })

    ipcMain.on('app-create-settings-window', category => {
      this._openSettingsWindow(category)
    })

    ipcMain.on('app-open-file-by-id', (windowId, filePath) => {
      const openFilesInNewWindow = this._accessor.preferences.getItem('openFilesInNewWindow')
      if (openFilesInNewWindow) {
        this._createEditorWindow(null, [filePath])
      } else {
        const editor = this._windowManager.get(windowId)
        if (editor) {
          editor.openTab(filePath, {}, true)
        }
      }
    })
    ipcMain.on('app-open-files-by-id', (windowId, fileList) => {
      const openFilesInNewWindow = this._accessor.preferences.getItem('openFilesInNewWindow')
      if (openFilesInNewWindow) {
        this._createEditorWindow(null, fileList)
      } else {
        const editor = this._windowManager.get(windowId)
        if (editor) {
          editor.openTabsFromPaths(
            fileList.map(p => normalizeMarkdownPath(p))
              .filter(i => i && !i.isDir)
              .map(i => i.path))
        }
      }
    })

    ipcMain.on('app-open-markdown-by-id', (windowId, data) => {
      const openFilesInNewWindow = this._accessor.preferences.getItem('openFilesInNewWindow')
      if (openFilesInNewWindow) {
        this._createEditorWindow(null, [], [data])
      } else {
        const editor = this._windowManager.get(windowId)
        if (editor) {
          editor.openUntitledTab(true, data)
        }
      }
    })

    ipcMain.on('app-open-directory-by-id', (windowId, pathname, openInSameWindow) => {
      const { openFolderInNewWindow } = this._accessor.preferences.getAll()
      if (openInSameWindow || !openFolderInNewWindow) {
        const editor = this._windowManager.get(windowId)
        if (editor) {
          editor.openFolder(pathname)
          return
        }
      }
      this._createEditorWindow(pathname)
    })

    // --- renderer -------------------

    ipcMain.on('mt::app-try-quit', () => {
      app.quit()
    })

    ipcMain.on('mt::open-file-by-window-id', (e, windowId, filePath) => {
      const resolvedPath = normalizeAndResolvePath(filePath)
      const openFilesInNewWindow = this._accessor.preferences.getItem('openFilesInNewWindow')
      if (openFilesInNewWindow) {
        this._createEditorWindow(null, [resolvedPath])
      } else {
        const editor = this._windowManager.get(windowId)
        if (editor) {
          editor.openTab(resolvedPath, {}, true)
        }
      }
    })

    ipcMain.on('mt::select-default-directory-to-open', async e => {
      const { preferences } = this._accessor
      const { defaultDirectoryToOpen } = preferences.getAll()
      const win = BrowserWindow.fromWebContents(e.sender)

      const { filePaths } = await dialog.showOpenDialog(win, {
        defaultPath: defaultDirectoryToOpen,
        properties: ['openDirectory', 'createDirectory']
      })
      if (filePaths && filePaths[0]) {
        preferences.setItems({ defaultDirectoryToOpen: filePaths[0] })
      }
    })

    ipcMain.on('mt::open-setting-window', () => {
      this._openSettingsWindow()
    })

    ipcMain.on('mt::make-screenshot', e => {
      const win = BrowserWindow.fromWebContents(e.sender)
      ipcMain.emit('screen-capture', win)
    })

    ipcMain.on('mt::request-keybindings', e => {
      const win = BrowserWindow.fromWebContents(e.sender)
      const { keybindings } = this._accessor
      // Convert map to object
      win.webContents.send('mt::keybindings-response', Object.fromEntries(keybindings.keys))
    })

    ipcMain.on('mt::open-keybindings-config', () => {
      const { keybindings } = this._accessor
      keybindings.openConfigInFileManager()
    })

    ipcMain.handle('mt::window-state-get', event => {
      const win = BrowserWindow.fromWebContents(event.sender)
      return {
        isFullScreen: !!win?.isFullScreen(),
        isMaximized: !!win?.isMaximized()
      }
    })

    ipcMain.handle('mt::window-action', (event, action) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) {
        return null
      }

      switch (action) {
        case 'close':
          win.close()
          break
        case 'minimize':
          win.minimize()
          break
        case 'toggle-maximize':
          if (win.isFullScreen()) {
            win.setFullScreen(false)
          } else if (win.isMaximized()) {
            win.unmaximize()
          } else {
            win.maximize()
          }
          break
        case 'toggle-full-screen':
          win.setFullScreen(!win.isFullScreen())
          break
      }
      return null
    })

    ipcMain.on('mt::popup-app-menu', event => {
      const win = BrowserWindow.fromWebContents(event.sender)
      const menu = Menu.getApplicationMenu()
      if (win && menu) {
        menu.popup({ window: win, x: 23, y: 20 })
      }
    })

    ipcMain.handle('mt::clipboard-get-file-path', () => {
      if (isLinux) {
        return ''
      }

      if (isOsx) {
        if (!clipboard.has('NSFilenamesPboardType')) {
          return ''
        }
        const result = plist.parse(clipboard.read('NSFilenamesPboardType'))
        return Array.isArray(result) && result.length ? result[0] : ''
      }

      if (isWindows) {
        const rawFilePath = clipboard.read('FileNameW')
        const filePath = rawFilePath.replace(new RegExp(String.fromCharCode(0), 'g'), '')
        return filePath && typeof filePath === 'string' ? filePath : ''
      }

      return ''
    })

    ipcMain.on('mt::popup-tabs-context-menu', (event, { x, y, tab }) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win || !tab) {
        return
      }

      const { id: tabId, pathname } = tab
      const t = this._accessor.i18n.t.bind(this._accessor.i18n)
      const menu = Menu.buildFromTemplate([
        {
          label: t('editor.contextMenu.tabs.close'),
          id: 'closeThisTab',
          click: () => event.sender.send('mt::context-menu-tabs-action', { type: 'close-this', tabId })
        },
        {
          label: t('editor.contextMenu.tabs.closeOthers'),
          id: 'closeOtherTabs',
          click: () => event.sender.send('mt::context-menu-tabs-action', { type: 'close-others', tabId })
        },
        {
          label: t('editor.contextMenu.tabs.closeSavedTabs'),
          id: 'closeSavedTabs',
          click: () => event.sender.send('mt::context-menu-tabs-action', { type: 'close-saved', tabId })
        },
        {
          label: t('editor.contextMenu.tabs.closeAllTabs'),
          id: 'closeAllTabs',
          click: () => event.sender.send('mt::context-menu-tabs-action', { type: 'close-all', tabId })
        },
        { type: 'separator' },
        {
          label: t('editor.contextMenu.tabs.rename'),
          id: 'renameFile',
          enabled: !!pathname,
          click: () => event.sender.send('mt::context-menu-tabs-action', { type: 'rename', tabId })
        },
        {
          label: t('editor.contextMenu.tabs.copyPath'),
          id: 'copyPath',
          enabled: !!pathname,
          click: () => event.sender.send('mt::context-menu-tabs-action', { type: 'copy-path', tabId })
        },
        {
          label: t('editor.contextMenu.tabs.showInFolder'),
          id: 'showInFolder',
          enabled: !!pathname,
          click: () => event.sender.send('mt::context-menu-tabs-action', { type: 'show-in-folder', tabId })
        }
      ])
      menu.popup({ window: win, x, y })
    })

    ipcMain.on('mt::popup-sidebar-context-menu', (event, { x, y, hasPathCache }) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (!win) {
        return
      }

      const t = this._accessor.i18n.t.bind(this._accessor.i18n)
      const menu = Menu.buildFromTemplate([
        {
          label: t('editor.contextMenu.sideBar.newFile'),
          id: 'newFileMenuItem',
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'new-file' })
        },
        {
          label: t('editor.contextMenu.sideBar.newDirectory'),
          id: 'newDirectoryMenuItem',
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'new-directory' })
        },
        { type: 'separator' },
        {
          label: t('editor.contextMenu.sideBar.copy'),
          id: 'copyMenuItem',
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'copy' })
        },
        {
          label: t('editor.contextMenu.sideBar.cut'),
          id: 'cutMenuItem',
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'cut' })
        },
        {
          label: t('editor.contextMenu.sideBar.paste'),
          id: 'pasteMenuItem',
          enabled: !!hasPathCache,
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'paste' })
        },
        { type: 'separator' },
        {
          label: t('editor.contextMenu.sideBar.rename'),
          id: 'renameMenuItem',
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'rename' })
        },
        {
          label: t('editor.contextMenu.sideBar.moveToTrash'),
          id: 'deleteMenuItem',
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'delete' })
        },
        { type: 'separator' },
        {
          label: t('editor.contextMenu.sideBar.showInFolder'),
          id: 'showInFolderMenuItem',
          click: () => event.sender.send('mt::context-menu-sidebar-action', { type: 'show-in-folder' })
        }
      ])
      menu.popup({ window: win, x, y })
    })

    ipcMain.handle('mt::keybinding-get-pref-keybindings', () => {
      const { keybindings } = this._accessor
      const defaultKeybindings = keybindings.getDefaultKeybindings()
      const userKeybindings = keybindings.getUserKeybindings()
      return { defaultKeybindings, userKeybindings }
    })

    ipcMain.handle('mt::keybinding-save-user-keybindings', async (event, userKeybindings) => {
      const { keybindings } = this._accessor
      return keybindings.setUserKeybindings(userKeybindings)
    })

    ipcMain.handle('mt::fs-trash-item', async (event, fullPath) => {
      return shell.trashItem(fullPath)
    })
  }
}

export default App
