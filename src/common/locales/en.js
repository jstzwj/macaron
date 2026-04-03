export default {
  app: {
    preferences: 'Preferences',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: 'Search preferences',
    categories: {
      general: 'General',
      editor: 'Editor',
      markdown: 'Markdown',
      spelling: 'Spelling',
      theme: 'Theme',
      image: 'Image',
      keybindings: 'Key Bindings'
    },
    general: {
      title: 'General',
      autoSave: 'Auto Save',
      autoSaveDescription: 'Automatically save document changes',
      autoSaveDelayDescription: 'Delay following document edit before automatically saving',
      window: 'Window',
      titleBarStyle: 'Title bar style',
      requiresRestart: 'Requires restart.',
      hideScrollbars: 'Hide scrollbars',
      openFilesInNewWindow: 'Open files in new window',
      openFoldersInNewWindow: 'Open folders in new window',
      zoom: 'Zoom',
      sidebar: 'Sidebar',
      wrapTextInToc: 'Wrap text in table of contents',
      sortFieldForFilesInOpenFolders: 'Sort field for files in open folders',
      startupAction: 'Action on startup',
      openDefaultDirectory: 'Open the default directory',
      selectFolder: 'Select Folder',
      openBlankPage: 'Open a blank page',
      misc: 'Misc',
      userInterfaceLanguage: 'User interface language'
    },
    options: {
      titleBarStyle: {
        custom: 'Custom',
        native: 'Native'
      },
      fileSortBy: {
        created: 'Creation time',
        modified: 'Modification time',
        title: 'Title'
      },
      language: {
        system: 'Follow system',
        en: 'English',
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        ja: '日本語',
        ko: '한국어',
        fr: 'Français',
        es: 'Español',
        pt: 'Português',
        pl: 'Polski',
        tr: 'Türkçe',
        ar: 'العربية'
      }
    }
  },
  search: {
    placeholder: 'Search',
    replacementPlaceholder: 'Replacement',
    caseSensitive: 'Case Sensitive',
    wholeWord: 'Select whole word',
    regex: 'Use query as RegEx',
    replaceAll: 'Replace All',
    replaceSingle: 'Replace Single',
    invalidRegex: 'Invalid regular expression: /{value}/.',
    regexMatchesEmpty: 'RegExp: /{value}/ match empty string.'
  },
  titleBar: {
    words: 'Words',
    characters: 'Characters',
    paragraphs: 'Paragraphs',
    stats: {
      word: {
        short: 'W',
        full: 'word'
      },
      character: {
        short: 'C',
        full: 'character'
      },
      paragraph: {
        short: 'P',
        full: 'paragraph'
      },
      all: {
        short: 'A',
        full: '(with space)character'
      }
    }
  },
  commandPalette: {
    placeholder: 'Type a command to execute'
  },
  exportDialog: {
    title: 'Export Options',
    tabs: {
      info: 'Info',
      page: 'Page',
      style: 'Style',
      theme: 'Theme',
      header: 'Header & Footer',
      toc: 'Table of Contents'
    },
    infoText: 'Please customize the page appearance and click on "export" to continue.',
    pageTitle: 'The page title:',
    pageSize: 'Page size:',
    widthHeightMm: 'Width/Height in mm:',
    landscape: 'Landscape orientation:',
    pageMargin: 'Page margin in mm:',
    topBottom: 'Top/Bottom:',
    leftRight: 'Left/Right:',
    overwriteFontSettings: 'Overwrite theme font settings:',
    fontFamily: 'Font family:',
    fontSize: 'Font size',
    lineHeight: 'Line height',
    autoNumberingHeadings: 'Auto numbering headings:',
    showFrontMatter: 'Show front matter:',
    themeText: 'You can change the document appearance by choosing a theme or create a handcrafted one.',
    theme: 'Theme:',
    headerFooterText: 'The text appear on all pages if header and/or footer is defined.',
    headerType: 'Header type:',
    leftHeaderText: 'The left header text:',
    mainHeaderText: 'The main header text:',
    rightHeaderText: 'The right header text:',
    footerType: 'Footer type:',
    leftFooterText: 'The left footer text:',
    mainFooterText: 'The main footer text:',
    rightFooterText: 'The right footer text:',
    customizeStyle: 'Customize style:',
    allowStyledHeaderFooter: 'Allow styled header and footer:',
    headerFooterFontSize: 'Header and footer font size',
    includeTopHeading: 'Include top heading:',
    includeTopHeadingDetail: 'Includes the first heading level too.',
    tocTitle: 'Title:',
    export: 'Export...',
    option: {
      custom: 'Custom',
      none: 'None',
      singleCell: 'Single cell',
      threeCells: 'Three cells',
      default: 'Default',
      simple: 'Simple',
      styled: 'Styled'
    }
  },
  notification: {
    information: 'Information',
    defaultMessage: 'You should never see this message',
    spelling: 'Spelling',
    spellcheckerDisabled: 'Cannot change language because spellchecker is disabled.'
  },
  editor: {
    insertTable: {
      title: 'Insert Table',
      rows: 'Rows',
      columns: 'Columns',
      cancel: 'Cancel',
      ok: 'OK'
    },
    contextMenu: {
      tabs: {
        close: 'Close',
        closeOthers: 'Close others',
        closeSavedTabs: 'Close saved tabs',
        closeAllTabs: 'Close all tabs',
        rename: 'Rename',
        copyPath: 'Copy path',
        showInFolder: 'Show in folder'
      },
      sideBar: {
        newFile: 'New File',
        newDirectory: 'New Directory',
        copy: 'Copy',
        cut: 'Cut',
        paste: 'Paste',
        rename: 'Rename',
        moveToTrash: 'Move To Trash',
        showInFolder: 'Show In Folder'
      }
    },
    notification: {
      ok: 'Ok'
    },
    imageUpload: {
      title: 'Upload Image',
      uploadFailed: 'Upload failed, the image will be copied to the image folder',
      sizeExceeded: 'Cannot upload more than 5M image, the image will be copied to the image folder',
      noUploader: 'No image uploader provided.',
      copyDeletionUrl: 'Click to copy the deletion URL of the uploaded image to the clipboard ({url}).'
    },
    frontMenu: {
      duplicate: 'Duplicate',
      turnInto: 'Turn Into',
      newParagraph: 'New Paragraph',
      delete: 'Delete'
    },
    quickInsert: {
      basicBlock: 'Basic Block',
      header: 'Header',
      advancedBlock: 'Advanced Block',
      listBlock: 'List Block',
      diagram: 'Diagram',
      paragraph: 'Paragraph',
      horizontalLine: 'Horizontal Line',
      frontMatter: 'Front Matter',
      header1: 'Header 1',
      header2: 'Header 2',
      header3: 'Header 3',
      header4: 'Header 4',
      header5: 'Header 5',
      header6: 'Header 6',
      tableBlock: 'Table Block',
      displayMath: 'Display Math',
      htmlBlock: 'HTML Block',
      codeBlock: 'Code Block',
      quoteBlock: 'Quote Block',
      orderList: 'Order List',
      bulletList: 'Bullet List',
      todoList: 'To-do List',
      vegaChart: 'Vega Chart',
      flowChart: 'Flow Chart',
      sequenceDiagram: 'Sequence Diagram',
      plantuml: 'PlantUML Diagram',
      mermaid: 'Mermaid'
    }
  },
  fileOperation: {
    newFile: 'New File',
    untitled: 'Untitled {id}',
    import: {
      title: 'Import or Open',
      dropHere: 'Drop here to get you stuff into Macaron'
    },
    export: {
      successTitle: 'Exported successfully',
      successMessage: 'Exported "{filename}" successfully!',
      failTitle: 'Printing/Exporting failed',
      failMessage: 'Printing/Exporting {filename} failed'
    }
  },
  about: {
    appName: 'Macaron',
    copyright: 'Copyright © 2017-{year} Luo Ran',
    copyrightContributors: 'Copyright © 2018-{year} Macaron Contributors'
  },
  update: {
    title: 'Update',
    notAvailable: 'Update not Available',
    downloaded: 'Update Downloaded',
    available: 'Update Available'
  },
  searchFolder: {
    placeholder: 'Search in folder...',
    noFolderOpen: 'No folder open',
    noResults: 'No results found.',
    cancel: 'Cancel',
    openFolder: 'Open Folder'
  },
  preferences: {
    keybindings: {
      title: 'Key Bindings',
      description: 'Customize Macaron shortcuts and click on the save button below to apply all changes (requires a restart). All available and default key binding can be found {link}.',
      onlineLink: 'online',
      columnDescription: 'Description',
      columnKeyCombination: 'Key Combination',
      columnOptions: 'Options',
      buttonEdit: 'Edit',
      buttonReset: 'Reset',
      buttonUnbind: 'Unbind',
      buttonSave: 'Save',
      buttonRestoreDefaults: 'Restore default key bindings',
      saveFailedTitle: 'Failed to save',
      saveFailedMessage: 'An unexpected error occurred while saving.',
      keyInputDialog: {
        placeholder: 'Press a key combination',
        hint: 'Press Enter to continue or ESC to exit.',
        invalidKey: 'Current key combination cannot be bound!'
      },
      shortcutInUseTitle: 'Shortcut already in use',
      shortcutInUseMessage: 'The shortcut "{accelerator}" is already in use. Please unset the shortcut and try again.'
    },
    spellchecker: {
      title: 'Spelling',
      enableSpellcheck: 'Enable spell checking',
      hideMarks: 'Hide marks for spelling errors',
      autoDetectLanguage: 'Automatically detect document language',
      defaultLanguage: 'Default language for spell checking',
      macOSInfo: 'The used language will be detected automatically while typing. Additional languages may be added through "Language & Region" in your system preferences pane.',
      customDictionary: 'Custom dictionary:',
      customDictionaryDesc: 'Edit words in custom dictionary.',
      columnWord: 'Word',
      columnOptions: 'Options',
      buttonDelete: 'Delete',
      noWords: 'No words available',
      switchLanguageFailed: 'Failed to switch language',
      removeWordFailed: 'Failed to remove custom word',
      removeWordFailedMessage: 'An unexpected error occurred while saving.'
    },
    image: {
      title: 'Image',
      insertActionDesc: 'Default action after an image is inserted from local folder or clipboard',
      clipboardHint: 'Clipboard handling is only fully supported on macOS and Windows.',
      uploader: {
        title: 'Uploader',
        currentUploader: 'The current image uploader is {name}.',
        noUploader: 'Currently no uploader is selected. Please select an uploader and config it.',
        saveConfigTitle: 'Save Config',
        githubSaved: 'The Github configration has been saved.',
        scriptSaved: 'The command line script configuration has been saved',
        githubWarning: 'Github will be removed in a future version, please use picgo',
        picgoNotInstalled: 'Your system does not have {link} installed, please install it before use.',
        picgoLink: 'picgo',
        githubToken: 'GitHub token:',
        githubTokenHint: 'The token is saved by Keychain on macOS, Secret Service API/libsecret on Linux and Credential Vault on Windows',
        tokenPlaceholder: 'Input token',
        ownerPlaceholder: 'owner',
        repoPlaceholder: 'repo',
        branchPlaceholder: 'branch',
        ownerName: 'Owner name:',
        repoName: 'Repo name:',
        branchName: 'Branch name (optional):',
        scriptLocation: 'Shell script location:',
        scriptPathPlaceholder: 'Script absolute path',
        scriptDesc: 'The script will be executed with the image file path as its only argument and it should output any valid value for the',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'Theme',
      autoSwitch: 'Automatically adjust application theme according to system settings',
      openFolder: 'Open the themes folder',
      openFolderButton: 'Open Folder',
      importTheme: 'Import custom themes',
      importButton: 'Import Theme'
    },
    markdown: {
      title: 'Markdown',
      lists: 'Lists:',
      preferLooseList: 'Prefer loose list items',
      bulletMarker: 'Preferred marker for bullet lists',
      orderDelimiter: 'Preferred marker for ordered lists',
      listIndentation: 'Preferred list indentation',
      extensions: 'Markdown extensions:',
      frontmatter: 'Front matter format',
      superSubScript: 'Enable Pandoc-style superscript and subscript',
      footnotes: 'Enable Pandoc-style footnotes',
      footnotesNote: 'Requires restart.',
      compatibility: 'Compatibility:',
      enableHtml: 'Enable HTML rendering',
      gitlabCompat: 'Enable GitLab compatibility mode',
      diagrams: 'Diagrams:',
      sequenceTheme: 'Sequence diagram theme',
      misc: 'Misc:',
      headingStyle: 'Preferred heading style'
    },
    editor: {
      title: 'Editor',
      textEditor: 'Text editor settings:',
      fontSize: 'Font size',
      lineHeight: 'Line height',
      fontFamily: 'Font family',
      maxWidth: 'Maximum width of text editor',
      maxWidthNote: "Leave empty for theme default, otherwise use number with unit suffix, which is one of 'ch' for characters, 'px' for pixels, or '%' for percentage.",
      codeBlock: 'Code block settings:',
      codeFontSize: 'Font size',
      codeFontFamily: 'Font family',
      lineNumbers: 'Show line numbers',
      trimEmptyLines: 'Remove leading and trailing empty lines',
      writing: 'Writing behavior:',
      autoPairBracket: 'Automatically close brackets when writing',
      autoPairMarkdown: 'Automatically complete markdown syntax',
      autoPairQuote: 'Automatically close quotation marks',
      fileRepresentation: 'File representation:',
      tabWidth: 'Preferred tab width',
      lineSeparator: 'Line separator type',
      encoding: 'Default encoding',
      detectEncoding: 'Automatically detect file encoding',
      trailingNewline: 'Handling of trailing newline characters',
      misc: 'Misc:',
      textDirection: 'Text direction',
      hideInsertHint: 'Hide hint for selecting type of new paragraph',
      hideLinkPopup: 'Hide popup when cursor is over link',
      autoCheck: 'Whether to automatically check any related tasks'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'About Macaron',
      checkForUpdates: 'Check for updates...',
      preferences: 'Preferences',
      services: 'Services',
      hide: 'Hide Macaron',
      hideOthers: 'Hide Others',
      showAll: 'Show All',
      quit: 'Quit Macaron'
    },
    file: {
      root: '&File',
      newTab: 'New Tab',
      newWindow: 'New Window',
      openFile: 'Open File...',
      openFolder: 'Open Folder...',
      openRecent: 'Open Recent',
      clearRecentlyUsed: 'Clear Recently Used',
      save: 'Save',
      saveAs: 'Save As...',
      autoSave: 'Auto Save',
      moveTo: 'Move To...',
      rename: 'Rename...',
      import: 'Import...',
      export: 'Export',
      html: 'HTML',
      pdf: 'PDF',
      print: 'Print',
      preferences: 'Preferences...',
      closeTab: 'Close Tab',
      closeWindow: 'Close Window',
      quit: 'Quit'
    },
    edit: {
      root: '&Edit',
      simpleRoot: 'Edit',
      undo: 'Undo',
      redo: 'Redo',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste',
      copyAsMarkdown: 'Copy as Markdown',
      copyAsHtml: 'Copy as HTML',
      pasteAsPlainText: 'Paste as Plain Text',
      selectAll: 'Select All',
      duplicate: 'Duplicate',
      createParagraph: 'Create Paragraph',
      deleteParagraph: 'Delete Paragraph',
      find: 'Find',
      findNext: 'Find Next',
      findPrevious: 'Find Previous',
      replace: 'Replace',
      findInFolder: 'Find in Folder',
      screenshot: 'Screenshot',
      lineEnding: 'Line Ending',
      lineEndingCrlf: 'Carriage return and line feed (CRLF)',
      lineEndingLf: 'Line feed (LF)'
    },
    paragraph: {
      root: '&Paragraph',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      heading4: 'Heading 4',
      heading5: 'Heading 5',
      heading6: 'Heading 6',
      promoteHeading: 'Promote Heading',
      demoteHeading: 'Demote Heading',
      table: 'Table',
      codeFences: 'Code Fences',
      quoteBlock: 'Quote Block',
      mathBlock: 'Math Block',
      htmlBlock: 'Html Block',
      orderedList: 'Ordered List',
      bulletList: 'Bullet List',
      taskList: 'Task List',
      looseListItem: 'Loose List Item',
      paragraph: 'Paragraph',
      horizontalRule: 'Horizontal Rule',
      frontMatter: 'Front Matter'
    },
    format: {
      root: 'F&ormat',
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      superscript: 'Superscript',
      subscript: 'Subscript',
      highlight: 'Highlight',
      inlineCode: 'Inline Code',
      inlineMath: 'Inline Math',
      strikethrough: 'Strikethrough',
      hyperlink: 'Hyperlink',
      image: 'Image',
      clearFormatting: 'Clear Formatting'
    },
    theme: {
      root: '&Theme',
      light: 'Cadmium Light',
      dark: 'Dark',
      graphite: 'Graphite Light',
      materialDark: 'Material Dark',
      oneDark: 'One Dark',
      ulysses: 'Ulysses Light'
    },
    view: {
      root: '&View',
      commandPalette: 'Command Palette...',
      sourceCodeMode: 'Source Code Mode',
      typewriterMode: 'Typewriter Mode',
      focusMode: 'Focus Mode',
      showSidebar: 'Show Sidebar',
      showTabBar: 'Show Tab Bar',
      toggleToc: 'Toggle Table of Contents',
      reloadImages: 'Reload Images',
      showDevTools: 'Show Developer Tools',
      reloadWindow: 'Reload window'
    },
    window: {
      root: '&Window',
      minimize: 'Minimize',
      alwaysOnTop: 'Always on Top',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      showInFullScreen: 'Show in Full Screen',
      bringAllToFront: 'Bring All to Front'
    },
    help: {
      root: '&Help',
      quickStart: 'Quick Start...',
      markdownReference: 'Markdown Reference...',
      changelog: 'Changelog...',
      donate: 'Donate via Open Collective...',
      feedbackViaTwitter: 'Feedback via Twitter...',
      reportIssue: 'Report Issue or Request Feature...',
      website: 'Website...',
      watchOnGitHub: 'Watch on GitHub...',
      followOnGitHub: 'Follow us on Github...',
      followOnTwitter: 'Follow us on Twitter...',
      license: 'License...',
      checkForUpdates: 'Check for updates...',
      about: 'About Macaron...'
    },
    dock: {
      open: 'Open...',
      clearRecent: 'Clear Recent'
    }
  }
}
