export default {
  app: {
    preferences: '環境設定',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: '設定を検索',
    categories: {
      general: '一般',
      editor: 'エディタ',
      markdown: 'Markdown',
      spelling: 'スペル',
      theme: 'テーマ',
      image: '画像',
      keybindings: 'キーバインド'
    },
    general: {
      title: '一般',
      autoSave: '自動保存',
      autoSaveDescription: 'ドキュメントの変更を自動的に保存',
      autoSaveDelayDescription: 'ドキュメント編集後、自動保存までの遅延時間',
      window: 'ウィンドウ',
      titleBarStyle: 'タイトルバーのスタイル',
      requiresRestart: '再起動が必要です。',
      hideScrollbars: 'スクロールバーを非表示',
      openFilesInNewWindow: 'ファイルを新規ウィンドウで開く',
      openFoldersInNewWindow: 'フォルダを新規ウィンドウで開く',
      zoom: 'ズーム',
      sidebar: 'サイドバー',
      wrapTextInToc: '目次でテキストを折り返す',
      sortFieldForFilesInOpenFolders: '開いているフォルダ内のファイルの並べ替え基準',
      startupAction: '起動時の動作',
      openDefaultDirectory: 'デフォルトディレクトリを開く',
      selectFolder: 'フォルダを選択',
      openBlankPage: '空白ページを開く',
      misc: 'その他',
      userInterfaceLanguage: 'ユーザーインターフェース言語'
    },
    options: {
      titleBarStyle: {
        custom: 'カスタム',
        native: 'ネイティブ'
      },
      fileSortBy: {
        created: '作成日時',
        modified: '更新日時',
        title: 'タイトル'
      },
      language: {
        system: 'システム設定に従う',
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
    placeholder: '検索',
    replacementPlaceholder: '置換',
    caseSensitive: '大文字と小文字を区別',
    wholeWord: '単語全体を選択',
    regex: '正規表現としてクエリを使用',
    replaceAll: 'すべて置換',
    replaceSingle: '現在の置換',
    invalidRegex: '無効な正規表現: /{value}/。',
    regexMatchesEmpty: '正規表現: /{value}/ は空文字列にマッチします。'
  },
  titleBar: {
    words: '単語',
    characters: '文字',
    paragraphs: '段落',
    stats: {
      word: {
        short: '単語',
        full: '単語'
      },
      character: {
        short: '文字',
        full: '文字'
      },
      paragraph: {
        short: '段落',
        full: '段落'
      },
      all: {
        short: '全',
        full: '文字（スペース含む）'
      }
    }
  },
  commandPalette: {
    placeholder: 'コマンドを入力して実行'
  },
  exportDialog: {
    title: 'エクスポートオプション',
    tabs: {
      info: '情報',
      page: 'ページ',
      style: 'スタイル',
      theme: 'テーマ',
      header: 'ヘッダーとフッター',
      toc: '目次'
    },
    infoText: 'ページの外観をカスタマイズし、「エクスポート」をクリックして続行してください。',
    pageTitle: 'ページタイトル：',
    pageSize: 'ページサイズ：',
    widthHeightMm: '幅/高さ (mm)：',
    landscape: '横向き：',
    pageMargin: 'ページ余白 (mm)：',
    topBottom: '上/下：',
    leftRight: '左/右：',
    overwriteFontSettings: 'テーマのフォント設定を上書き：',
    fontFamily: 'フォントファミリー：',
    fontSize: 'フォントサイズ',
    lineHeight: '行の高さ',
    autoNumberingHeadings: '見出しの自動番号付け：',
    showFrontMatter: 'Front Matter を表示：',
    themeText: 'テーマを選択するか、手作りでドキュメントの外観を変更できます。',
    theme: 'テーマ：',
    headerFooterText: 'ヘッダーやフッターが定義されている場合、すべてのページにテキストが表示されます。',
    headerType: 'ヘッダータイプ：',
    leftHeaderText: '左ヘッダーテキスト：',
    mainHeaderText: 'メインヘッダーテキスト：',
    rightHeaderText: '右ヘッダーテキスト：',
    footerType: 'フッタータイプ：',
    leftFooterText: '左フッターテキスト：',
    mainFooterText: 'メインフッターテキスト：',
    rightFooterText: '右フッターテキスト：',
    customizeStyle: 'スタイルをカスタマイズ：',
    allowStyledHeaderFooter: 'スタイル付きヘッダーとフッターを許可：',
    headerFooterFontSize: 'ヘッダーとフッターのフォントサイズ',
    includeTopHeading: '最上位見出しを含める：',
    includeTopHeadingDetail: '最初の見出しレベルも含めます。',
    tocTitle: 'タイトル：',
    export: 'エクスポート...',
    option: {
      custom: 'カスタム',
      none: 'なし',
      singleCell: '単一セル',
      threeCells: '3セル',
      default: 'デフォルト',
      simple: 'シンプル',
      styled: 'スタイル付き'
    }
  },
  notification: {
    information: '情報',
    defaultMessage: 'このメッセージは表示されないはずです',
    spelling: 'スペル',
    spellcheckerDisabled: 'スペルチェッカーが無効になっているため、言語を変更できません。'
  },
  editor: {
    insertTable: {
      title: '表を挿入',
      rows: '行数',
      columns: '列数',
      cancel: 'キャンセル',
      ok: 'OK'
    },
    contextMenu: {
      tabs: {
        close: '閉じる',
        closeOthers: '他を閉じる',
        closeSavedTabs: '保存済みタブを閉じる',
        closeAllTabs: 'すべてのタブを閉じる',
        rename: '名前を変更',
        copyPath: 'パスをコピー',
        showInFolder: 'フォルダで表示'
      },
      sideBar: {
        newFile: '新規ファイル',
        newDirectory: '新規フォルダ',
        copy: 'コピー',
        cut: '切り取り',
        paste: '貼り付け',
        rename: '名前を変更',
        moveToTrash: 'ゴミ箱に移動',
        showInFolder: 'フォルダで表示'
      }
    },
    notification: {
      ok: 'OK'
    },
    imageUpload: {
      title: '画像をアップロード',
      uploadFailed: 'アップロードに失敗しました。画像は画像フォルダにコピーされます',
      sizeExceeded: '5Mを超える画像はアップロードできません。画像は画像フォルダにコピーされます',
      noUploader: '画像アップローダーが提供されていません。',
      copyDeletionUrl: 'クリックしてアップロードした画像の削除URLをクリップボードにコピーします ({url})。'
    },
    frontMenu: {
      duplicate: '複製',
      turnInto: '変換',
      newParagraph: '新しい段落',
      delete: '削除'
    },
    quickInsert: {
      basicBlock: '基本ブロック',
      header: '見出し',
      advancedBlock: '高度なブロック',
      listBlock: 'リストブロック',
      diagram: '図表',
      paragraph: '段落',
      horizontalLine: '水平線',
      frontMatter: 'Front Matter',
      header1: '見出し 1',
      header2: '見出し 2',
      header3: '見出し 3',
      header4: '見出し 4',
      header5: '見出し 5',
      header6: '見出し 6',
      tableBlock: '表ブロック',
      displayMath: '数式ブロック',
      htmlBlock: 'HTML ブロック',
      codeBlock: 'コードブロック',
      quoteBlock: '引用ブロック',
      orderList: '番号付きリスト',
      bulletList: '箇条書きリスト',
      todoList: 'タスクリスト',
      vegaChart: 'Vega チャート',
      flowChart: 'フローチャート',
      sequenceDiagram: 'シーケンス図',
      plantuml: 'PlantUML 図',
      mermaid: 'Mermaid 図'
    }
  },
  fileOperation: {
    newFile: '新規ファイル',
    untitled: '無題 {id}',
    import: {
      title: 'インポートまたは開く',
      dropHere: 'ここにドロップして Macaron に取り込みます'
    },
    export: {
      successTitle: 'エクスポート成功',
      successMessage: '"{filename}" のエクスポートに成功しました！',
      failTitle: '印刷/エクスポート失敗',
      failMessage: '{filename} の印刷/エクスポートに失敗しました'
    }
  },
  about: {
    appName: 'Macaron',
    copyright: 'Copyright © 2017-{year} Luo Ran',
    copyrightContributors: 'Copyright © 2018-{year} Macaron Contributors'
  },
  update: {
    title: '更新',
    notAvailable: '更新はありません',
    downloaded: '更新がダウンロードされました',
    available: '更新があります'
  },
  searchFolder: {
    placeholder: 'フォルダ内を検索...',
    noFolderOpen: 'フォルダが開かれていません',
    noResults: '結果が見つかりません。',
    cancel: 'キャンセル',
    openFolder: 'フォルダを開く'
  },
  preferences: {
    keybindings: {
      title: 'キーバインド',
      description: 'Macaron のショートカットをカスタマイズし、下の保存ボタンをクリックしてすべての変更を適用します（再起動が必要）。利用可能なすべてのキーバインドとデフォルトは{link}で確認できます。',
      onlineLink: 'オンライン',
      columnDescription: '説明',
      columnKeyCombination: 'キーの組み合わせ',
      columnOptions: 'オプション',
      buttonEdit: '編集',
      buttonReset: 'リセット',
      buttonUnbind: 'バインド解除',
      buttonSave: '保存',
      buttonRestoreDefaults: 'デフォルトのキーバインドを復元',
      saveFailedTitle: '保存に失敗しました',
      saveFailedMessage: '保存中に予期しないエラーが発生しました。',
      keyInputDialog: {
        placeholder: 'キーの組み合わせを押してください',
        hint: 'Enter を押して続行するか、ESC を押して終了します。',
        invalidKey: '現在のキーの組み合わせはバインドできません！'
      },
      shortcutInUseTitle: 'ショートカットは既に使用されています',
      shortcutInUseMessage: 'ショートカット "{accelerator}" は既に使用されています。ショートカットを解除してから再試行してください。'
    },
    spellchecker: {
      title: 'スペルチェック',
      enableSpellcheck: 'スペルチェックを有効にする',
      hideMarks: 'スペルエラーのマークを非表示',
      autoDetectLanguage: 'ドキュメントの言語を自動検出',
      defaultLanguage: 'スペルチェックのデフォルト言語',
      macOSInfo: '入力中に使用される言語は自動的に検出されます。追加の言語は、システム環境設定の「言語と地域」から追加できます。',
      customDictionary: 'カスタム辞書：',
      customDictionaryDesc: 'カスタム辞書の単語を編集します。',
      columnWord: '単語',
      columnOptions: 'オプション',
      buttonDelete: '削除',
      noWords: '単語がありません',
      switchLanguageFailed: '言語の切り替えに失敗しました',
      removeWordFailed: 'カスタム単語の削除に失敗しました',
      removeWordFailedMessage: '保存中に予期しないエラーが発生しました。'
    },
    image: {
      title: '画像',
      insertActionDesc: 'ローカルフォルダまたはクリップボードから画像が挿入された後のデフォルトのアクション',
      clipboardHint: 'クリップボード処理は macOS と Windows でのみ完全にサポートされています。',
      uploader: {
        title: 'アップローダー',
        currentUploader: '現在の画像アップローダーは {name} です。',
        noUploader: '現在アップローダーが選択されていません。アップローダーを選択して設定してください。',
        saveConfigTitle: '設定を保存',
        githubSaved: 'Github の設定が保存されました。',
        scriptSaved: 'コマンドラインスクリプトの設定が保存されました',
        githubWarning: 'Github は将来のバージョンで削除される予定です。picgo を使用してください',
        picgoNotInstalled: 'システムに {link} がインストールされていません。使用前にインストールしてください。',
        picgoLink: 'picgo',
        githubToken: 'GitHub トークン：',
        githubTokenHint: 'トークンは macOS では Keychain、Linux では Secret Service API/libsecret、Windows では Credential Vault によって保存されます',
        tokenPlaceholder: 'トークンを入力',
        ownerPlaceholder: 'オーナー',
        repoPlaceholder: 'リポジトリ',
        branchPlaceholder: 'ブランチ',
        ownerName: 'オーナー名：',
        repoName: 'リポジトリ名：',
        branchName: 'ブランチ名（オプション）：',
        scriptLocation: 'シェルスクリプトの場所：',
        scriptPathPlaceholder: 'スクリプトの絶対パス',
        scriptDesc: 'スクリプトは画像ファイルのパスを唯一の引数として実行され、',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'テーマ',
      autoSwitch: 'システム設定に従ってアプリケーションテーマを自動的に調整',
      openFolder: 'テーマフォルダを開く',
      openFolderButton: 'フォルダを開く',
      importTheme: 'カスタムテーマをインポート',
      importButton: 'テーマをインポート'
    },
    markdown: {
      title: 'Markdown',
      lists: 'リスト：',
      preferLooseList: 'ルーズリスト項目を優先',
      bulletMarker: '箇条書きリストの優先マーカー',
      orderDelimiter: '番号付きリストの優先マーカー',
      listIndentation: 'リストの優先インデント',
      extensions: 'Markdown 拡張：',
      frontmatter: 'Front matter フォーマット',
      superSubScript: 'Pandoc スタイルの上付き文字と下付き文字を有効にする',
      footnotes: 'Pandoc スタイルの脚注を有効にする',
      footnotesNote: '再起動が必要です。',
      compatibility: '互換性：',
      enableHtml: 'HTML レンダリングを有効にする',
      gitlabCompat: 'GitLab 互換モードを有効にする',
      diagrams: '図表：',
      sequenceTheme: 'シーケンス図のテーマ',
      misc: 'その他：',
      headingStyle: '優先見出しスタイル'
    },
    editor: {
      title: 'エディタ',
      textEditor: 'テキストエディタ設定：',
      fontSize: 'フォントサイズ',
      lineHeight: '行の高さ',
      fontFamily: 'フォントファミリー',
      maxWidth: 'テキストエディタの最大幅',
      maxWidthNote: "テーマのデフォルトを使用する場合は空欄にしてください。それ以外の場合は単位サフィックス付きの数値を使用します。'ch'（文字）、'px'（ピクセル）、'%'（パーセント）のいずれかです。",
      codeBlock: 'コードブロック設定：',
      codeFontSize: 'フォントサイズ',
      codeFontFamily: 'フォントファミリー',
      lineNumbers: '行番号を表示',
      trimEmptyLines: '先頭と末尾の空行を削除',
      writing: '執筆動作：',
      autoPairBracket: '入力時に括弧を自動的に閉じる',
      autoPairMarkdown: 'Markdown 構文を自動的に完了',
      autoPairQuote: '引用符を自動的に閉じる',
      fileRepresentation: 'ファイル表現：',
      tabWidth: '優先タブ幅',
      lineSeparator: '行区切りタイプ',
      encoding: 'デフォルトエンコーディング',
      detectEncoding: 'ファイルエンコーディングを自動検出',
      trailingNewline: '末尾の改行文字の処理',
      misc: 'その他：',
      textDirection: 'テキストの方向',
      hideInsertHint: '新しい段落のタイプ選択ヒントを非表示',
      hideLinkPopup: 'カーソルがリンク上にあるときのポップアップを非表示',
      autoCheck: '関連するタスクを自動的にチェックするかどうか'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'Macaron について',
      checkForUpdates: '更新を確認...',
      preferences: '環境設定',
      services: 'サービス',
      hide: 'Macaron を隠す',
      hideOthers: '他を隠す',
      showAll: 'すべて表示',
      quit: 'Macaron を終了'
    },
    file: {
      root: 'ファイル(&F)',
      newTab: '新規タブ',
      newWindow: '新規ウィンドウ',
      openFile: 'ファイルを開く...',
      openFolder: 'フォルダを開く...',
      openRecent: '最近使用したファイルを開く',
      clearRecentlyUsed: '最近使用したファイルをクリア',
      save: '保存',
      saveAs: '名前を付けて保存...',
      autoSave: '自動保存',
      moveTo: '移動先...',
      rename: '名前を変更...',
      import: 'インポート...',
      export: 'エクスポート',
      html: 'HTML',
      pdf: 'PDF',
      print: '印刷',
      preferences: '環境設定...',
      closeTab: 'タブを閉じる',
      closeWindow: 'ウィンドウを閉じる',
      quit: '終了'
    },
    edit: {
      root: '編集(&E)',
      simpleRoot: '編集',
      undo: '元に戻す',
      redo: 'やり直し',
      cut: '切り取り',
      copy: 'コピー',
      paste: '貼り付け',
      copyAsMarkdown: 'Markdown としてコピー',
      copyAsHtml: 'HTML としてコピー',
      pasteAsPlainText: 'プレーンテキストとして貼り付け',
      selectAll: 'すべて選択',
      duplicate: '段落を複製',
      createParagraph: '段落を作成',
      deleteParagraph: '段落を削除',
      find: '検索',
      findNext: '次を検索',
      findPrevious: '前を検索',
      replace: '置換',
      findInFolder: 'フォルダ内を検索',
      screenshot: 'スクリーンショット',
      lineEnding: '行末',
      lineEndingCrlf: 'キャリッジリターンとラインフィード (CRLF)',
      lineEndingLf: 'ラインフィード (LF)'
    },
    paragraph: {
      root: '段落(&P)',
      heading1: '見出し 1',
      heading2: '見出し 2',
      heading3: '見出し 3',
      heading4: '見出し 4',
      heading5: '見出し 5',
      heading6: '見出し 6',
      promoteHeading: '見出しレベルを上げる',
      demoteHeading: '見出しレベルを下げる',
      table: '表',
      codeFences: 'コードフェンス',
      quoteBlock: '引用ブロック',
      mathBlock: '数式ブロック',
      htmlBlock: 'HTML ブロック',
      orderedList: '番号付きリスト',
      bulletList: '箇条書きリスト',
      taskList: 'タスクリスト',
      looseListItem: 'ルーズリスト項目',
      paragraph: '段落',
      horizontalRule: '水平線',
      frontMatter: 'Front Matter'
    },
    format: {
      root: 'フォーマット(&O)',
      bold: '太字',
      italic: '斜体',
      underline: '下線',
      superscript: '上付き文字',
      subscript: '下付き文字',
      highlight: 'ハイライト',
      inlineCode: 'インラインコード',
      inlineMath: 'インライン数式',
      strikethrough: '取り消し線',
      hyperlink: 'ハイパーリンク',
      image: '画像',
      clearFormatting: 'フォーマットをクリア'
    },
    theme: {
      root: 'テーマ(&T)',
      light: 'Cadmium Light',
      dark: 'Dark',
      graphite: 'Graphite Light',
      materialDark: 'Material Dark',
      oneDark: 'One Dark',
      ulysses: 'Ulysses Light'
    },
    view: {
      root: '表示(&V)',
      commandPalette: 'コマンドパレット...',
      sourceCodeMode: 'ソースコードモード',
      typewriterMode: 'タイプライターモード',
      focusMode: 'フォーカスモード',
      showSidebar: 'サイドバーを表示',
      showTabBar: 'タブバーを表示',
      toggleToc: '目次を切り替え',
      reloadImages: '画像を再読み込み',
      showDevTools: '開発者ツールを表示',
      reloadWindow: 'ウィンドウを再読み込み'
    },
    window: {
      root: 'ウィンドウ(&W)',
      minimize: '最小化',
      alwaysOnTop: '常に最前面',
      zoomIn: '拡大',
      zoomOut: '縮小',
      showInFullScreen: 'フルスクリーンで表示',
      bringAllToFront: 'すべてを最前面に'
    },
    help: {
      root: 'ヘルプ(&H)',
      quickStart: 'クイックスタート...',
      markdownReference: 'Markdown リファレンス...',
      changelog: '変更履歴...',
      donate: 'Open Collective で寄付...',
      feedbackViaTwitter: 'Twitter でフィードバック...',
      reportIssue: '問題を報告または機能をリクエスト...',
      website: 'ウェブサイト...',
      watchOnGitHub: 'GitHub でウォッチ...',
      followOnGitHub: 'GitHub でフォロー...',
      followOnTwitter: 'Twitter でフォロー...',
      license: 'ライセンス...',
      checkForUpdates: '更新を確認...',
      about: 'Macaron について...'
    },
    dock: {
      open: '開く...',
      clearRecent: '最近使用したファイルをクリア'
    }
  }
}
