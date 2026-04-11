export default {
  app: {
    preferences: 'Preferencje',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: 'Szukaj w preferencjach',
    categories: {
      general: 'Ogólne',
      editor: 'Edytor',
      markdown: 'Markdown',
      spelling: 'Pisownia',
      theme: 'Motyw',
      image: 'Obraz',
      keybindings: 'Skróty klawiszowe'
    },
    general: {
      title: 'Ogólne',
      autoSave: 'Autozapis',
      autoSaveDescription: 'Automatycznie zapisuj zmiany w dokumencie',
      autoSaveDelayDescription: 'Opóźnienie automatycznego zapisu po edycji dokumentu',
      window: 'Okno',
      titleBarStyle: 'Styl paska tytułowego',
      requiresRestart: 'Wymaga ponownego uruchomienia.',
      hideScrollbars: 'Ukryj paski przewijania',
      openFilesInNewWindow: 'Otwieraj pliki w nowym oknie',
      openFoldersInNewWindow: 'Otwieraj foldery w nowym oknie',
      zoom: 'Powiększenie',
      sidebar: 'Pasek boczny',
      wrapTextInToc: 'Zawijaj tekst w spisie treści',
      sortFieldForFilesInOpenFolders: 'Pole sortowania plików w otwartych folderach',
      startupAction: 'Czynność przy uruchomieniu',
      openDefaultDirectory: 'Otwórz domyślny katalog',
      selectFolder: 'Wybierz folder',
      openBlankPage: 'Otwórz pustą stronę',
      misc: 'Różne',
      userInterfaceLanguage: 'Język interfejsu użytkownika'
    },
    options: {
      titleBarStyle: {
        custom: 'Niestandardowy',
        native: 'Natywny'
      },
      fileSortBy: {
        created: 'Czas utworzenia',
        modified: 'Czas modyfikacji',
        title: 'Tytuł'
      },
      language: {
        system: 'Zgodnie z systemem',
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
  statusBar: {
    toggleSidebar: 'Przełącz pasek boczny',
    sourceCodeMode: 'Tryb kodu źródłowego',
    spellcheck: 'Przełącz sprawdzanie pisowni',
    systemDefault: 'Domyślny systemowy',
    spellcheckLanguage: 'Język sprawdzania pisowni',
    wordCount: 'Liczba słów',
    words: 'Słowa',
    characters: 'Znaki',
    paragraphs: 'Akapity',
    allCharacters: 'Wszystkie znaki'
  },
  search: {
    replacementPlaceholder: 'Zastąp',
    caseSensitive: 'Rozróżniaj wielkość liter',
    wholeWord: 'Zaznacz całe słowo',
    regex: 'Użyj zapytania jako wyrażenia regularnego',
    replaceAll: 'Zastąp wszystkie',
    replaceSingle: 'Zastąp pojedyncze',
    invalidRegex: 'Nieprawidłowe wyrażenie regularne: /{value}/.',
    regexMatchesEmpty: 'Wyrażenie regularne: /{value}/ dopasowuje pusty ciąg.'
  },
  titleBar: {
    words: 'Słowa',
    characters: 'Znaki',
    paragraphs: 'Akapity',
    stats: {
      word: {
        short: 'S',
        full: 'słowo'
      },
      character: {
        short: 'Z',
        full: 'znak'
      },
      paragraph: {
        short: 'A',
        full: 'akapit'
      },
      all: {
        short: 'W',
        full: '(ze spacją)znak'
      }
    }
  },
  commandPalette: {
    placeholder: 'Wpisz polecenie do wykonania'
  },
  sideBar: {
    tableOfContents: 'Spis treści'
  },
  exportDialog: {
    title: 'Opcje eksportu',
    overviewEyebrow: 'Ustawienia eksportu',
    htmlEyebrow: 'Ustawienia eksportu HTML',
    printableSubtitle: 'Dostosuj układ strony, wygląd, nagłówek i stopkę oraz spis treści przed wyeksportowaniem dokumentu.',
    htmlSubtitle: 'Dostosuj tytuł, wygląd i spis treści przed wyeksportowaniem dokumentu.',
    footerPrintable: 'Sprawdź powyższe ustawienia i eksportuj, gdy wszystko będzie gotowe.',
    footerHtml: 'Sprawdź powyższe ustawienia i wyeksportuj plik HTML, gdy wszystko będzie gotowe.',
    tabs: {
      info: 'Informacje',
      page: 'Strona',
      style: 'Styl',
      theme: 'Motyw',
      header: 'Nagłówek i stopka',
      toc: 'Spis treści'
    },
    infoText: 'Dostosuj wygląd strony i kliknij "eksportuj", aby kontynuować.',
    pageTitle: 'Tytuł strony:',
    pageSize: 'Rozmiar strony:',
    widthHeightMm: 'Szerokość/Wysokość w mm:',
    landscape: 'Orientacja pozioma:',
    pageMargin: 'Marginesy strony w mm:',
    topBottom: 'Góra/Dół:',
    leftRight: 'Lewo/Prawo:',
    overwriteFontSettings: 'Nadpisz ustawienia czcionki motywu:',
    fontFamily: 'Rodzina czcionek:',
    fontSize: 'Rozmiar czcionki',
    lineHeight: 'Wysokość linii',
    autoNumberingHeadings: 'Automatyczne numerowanie nagłówków:',
    showFrontMatter: 'Pokaż front matter:',
    themeText: 'Możesz zmienić wygląd dokumentu wybierając motyw lub tworząc własny.',
    theme: 'Motyw:',
    headerFooterText: 'Tekst pojawia się na wszystkich stronach, jeśli zdefiniowano nagłówek i/lub stopkę.',
    headerType: 'Typ nagłówka:',
    leftHeaderText: 'Tekst lewego nagłówka:',
    mainHeaderText: 'Tekst głównego nagłówka:',
    rightHeaderText: 'Tekst prawego nagłówka:',
    footerType: 'Typ stopki:',
    leftFooterText: 'Tekst lewej stopki:',
    mainFooterText: 'Tekst głównej stopki:',
    rightFooterText: 'Tekst prawej stopki:',
    customizeStyle: 'Dostosuj styl:',
    allowStyledHeaderFooter: 'Zezwalaj na stylizowany nagłówek i stopkę:',
    headerFooterFontSize: 'Rozmiar czcionki nagłówka i stopki',
    includeTopHeading: 'Dołącz najwyższy nagłówek:',
    includeTopHeadingDetail: 'Dołącza również pierwszy poziom nagłówka.',
    tocTitle: 'Tytuł:',
    export: 'Eksportuj...',
    option: {
      custom: 'Niestandardowy',
      none: 'Brak',
      singleCell: 'Pojedyncza komórka',
      threeCells: 'Trzy komórki',
      default: 'Domyślny',
      simple: 'Prosty',
      styled: 'Stylizowany'
    },
    sections: {
      htmlDocument: 'Dokument HTML',
      htmlDocumentDescription: 'Skonfiguruj tytuł używany w eksportowanym dokumencie HTML.',
      pageSetup: 'Ustawienia strony',
      pageSetupDescription: 'Wybierz rozmiar papieru i orientację używane w eksportowanym PDF.',
      margins: 'Marginesy',
      marginsDescription: 'Ustaw marginesy stosowane podczas drukowania i eksportu do PDF.',
      width: 'Szerokość',
      height: 'Wysokość',
      marginTop: 'Margines górny',
      marginBottom: 'Margines dolny',
      marginLeft: 'Margines lewy',
      marginRight: 'Margines prawy',
      typography: 'Typografia',
      typographyDescription: 'Zastąp ustawienia czcionki i składu używane podczas eksportu.',
      documentDetails: 'Szczegóły dokumentu',
      documentDetailsDescription: 'Wybierz, czy w eksporcie mają zostać uwzględnione dodatkowe informacje strukturalne.',
      theme: 'Motyw',
      header: 'Nagłówek',
      footer: 'Stopka',
      footerDescription: 'Wybierz układ stopki i dostosuj wyświetlany tekst.',
      headerFooterStyle: 'Styl nagłówka i stopki',
      headerFooterStyleDescription: 'Dostosuj typografię używaną w drukowanym obszarze nagłówka i stopki.',
      toc: 'Spis treści',
      tocDescription: 'Steruj wygenerowanym tytułem i zakresem nagłówków uwzględnianych w spisie treści.'
    }
  },
  notification: {
    information: 'Informacja',
    defaultMessage: 'Nigdy nie powinieneś widzieć tej wiadomości',
    spelling: 'Pisownia',
    spellcheckerDisabled: 'Nie można zmienić języka, ponieważ sprawdzanie pisowni jest wyłączone.'
  },
  editor: {
    insertTable: {
      title: 'Wstaw tabelę',
      rows: 'Wiersze',
      columns: 'Kolumny',
      cancel: 'Anuluj',
      ok: 'OK'
    },
    contextMenu: {
      tabs: {
        close: 'Zamknij',
        closeOthers: 'Zamknij inne',
        closeSavedTabs: 'Zamknij zapisane karty',
        closeAllTabs: 'Zamknij wszystkie karty',
        rename: 'Zmień nazwę',
        copyPath: 'Kopiuj ścieżkę',
        showInFolder: 'Pokaż w folderze'
      },
      sideBar: {
        newFile: 'Nowy plik',
        newDirectory: 'Nowy katalog',
        copy: 'Kopiuj',
        cut: 'Wytnij',
        paste: 'Wklej',
        rename: 'Zmień nazwę',
        moveToTrash: 'Przenieś do kosza',
        showInFolder: 'Pokaż w folderze'
      },
      tree: {
        openedFiles: 'Otwarte pliki',
        saveAll: 'Zapisz Wszystko',
        closeAll: 'Zamknij Wszystko',
        emptyProject: 'Pusty projekt',
        createFile: 'Utwórz Plik',
        openFolder: 'Otwórz Folder'
      }
    },
    notification: {
      ok: 'OK'
    },
    imageUpload: {
      title: 'Prześlij obraz',
      uploadFailed: 'Przesyłanie nie powiodło się, obraz zostanie skopiowany do folderu obrazów',
      sizeExceeded: 'Nie można przesłać obrazu większego niż 5MB, obraz zostanie skopiowany do folderu obrazów',
      noUploader: 'Nie dostarczono programu do przesyłania obrazów.',
      copyDeletionUrl: 'Kliknij, aby skopiować adres URL usunięcia przesłanego obrazu do schowka ({url}).'
    },
    frontMenu: {
      duplicate: 'Duplikuj',
      turnInto: 'Zmień w',
      newParagraph: 'Nowy akapit',
      delete: 'Usuń'
    },
    quickInsert: {
      basicBlock: 'Blok podstawowy',
      header: 'Nagłówek',
      advancedBlock: 'Blok zaawansowany',
      listBlock: 'Blok listy',
      diagram: 'Diagram',
      paragraph: 'Akapit',
      horizontalLine: 'Linia pozioma',
      frontMatter: 'Front Matter',
      header1: 'Nagłówek 1',
      header2: 'Nagłówek 2',
      header3: 'Nagłówek 3',
      header4: 'Nagłówek 4',
      header5: 'Nagłówek 5',
      header6: 'Nagłówek 6',
      tableBlock: 'Blok tabeli',
      displayMath: 'Blok matematyczny',
      htmlBlock: 'Blok HTML',
      codeBlock: 'Blok kodu',
      quoteBlock: 'Blok cytatu',
      orderList: 'Lista numerowana',
      bulletList: 'Lista punktowa',
      todoList: 'Lista zadań',
      vegaChart: 'Wykres Vega',
      flowChart: 'Schemat blokowy',
      sequenceDiagram: 'Diagram sekwencji',
      plantuml: 'Diagram PlantUML',
      mermaid: 'Mermaid',
      typeToInsert: "Wpisz {'@'} aby wstawić"
    }
  },
  fileOperation: {
    newFile: 'Nowy plik',
    untitled: 'Bez tytułu {id}',
    import: {
      title: 'Importuj lub otwórz',
      dropHere: 'Upuść tutaj, aby zaimportować do Macaron'
    },
    export: {
      successTitle: 'Eksport zakończony pomyślnie',
      successMessage: 'Pomyślnie wyeksportowano "{filename}"!',
      failTitle: 'Drukowanie/eksportowanie nie powiodło się',
      failMessage: 'Drukowanie/eksportowanie {filename} nie powiodło się'
    }
  },
  about: {
    appName: 'Macaron',
    copyright: 'Copyright © 2017-{year} Luo Ran',
    copyrightContributors: 'Copyright © 2018-{year} Współtwórcy Macaron'
  },
  update: {
    title: 'Aktualizacja',
    notAvailable: 'Aktualizacja niedostępna',
    downloaded: 'Pobrano aktualizację',
    available: 'Dostępna aktualizacja'
  },
  searchFolder: {
    placeholder: 'Szukaj w folderze...',
    noFolderOpen: 'Brak otwartego folderu',
    noResults: 'Nie znaleziono wyników.',
    cancel: 'Anuluj',
    openFolder: 'Otwórz folder'
  },
  preferences: {
    keybindings: {
      title: 'Skróty klawiszowe',
      description: 'Dostosuj skróty Macaron i kliknij przycisk zapisz poniżej, aby zastosować wszystkie zmiany (wymaga ponownego uruchomienia). Wszystkie dostępne i domyślne skróty można znaleźć {link}.',
      onlineLink: 'online',
      columnDescription: 'Opis',
      columnKeyCombination: 'Kombinacja klawiszy',
      columnOptions: 'Opcje',
      buttonEdit: 'Edytuj',
      buttonReset: 'Resetuj',
      buttonUnbind: 'Odwiąż',
      buttonSave: 'Zapisz',
      buttonRestoreDefaults: 'Przywróć domyślne skróty klawiszowe',
      saveFailedTitle: 'Nie udało się zapisać',
      saveFailedMessage: 'Wystąpił nieoczekiwany błąd podczas zapisywania.',
      keyInputDialog: {
        placeholder: 'Naciśnij kombinację klawiszy',
        hint: 'Naciśnij Enter, aby kontynuować lub ESC, aby wyjść.',
        invalidKey: 'Bieżąca kombinacja klawiszy nie może być przypisana!'
      },
      shortcutInUseTitle: 'Skrót jest już w użyciu',
      shortcutInUseMessage: 'Skrót "{accelerator}" jest już w użyciu. Najpierw usuń skrót i spróbuj ponownie.'
    },
    spellchecker: {
      title: 'Pisownia',
      enableSpellcheck: 'Włącz sprawdzanie pisowni',
      hideMarks: 'Ukryj oznaczenia błędów pisowni',
      autoDetectLanguage: 'Automatycznie wykryj język dokumentu',
      defaultLanguage: 'Domyślny język sprawdzania pisowni',
      macOSInfo: 'Używany język będzie wykrywany automatycznie podczas pisania. Dodatkowe języki można dodać przez "Język i region" w preferencjach systemowych.',
      customDictionary: 'Słownik niestandardowy:',
      customDictionaryDesc: 'Edytuj słowa w słowniku niestandardowym.',
      columnWord: 'Słowo',
      columnOptions: 'Opcje',
      buttonDelete: 'Usuń',
      noWords: 'Brak dostępnych słów',
      switchLanguageFailed: 'Nie udało się przełączyć języka',
      removeWordFailed: 'Nie udało się usunąć niestandardowego słowa',
      removeWordFailedMessage: 'Wystąpił nieoczekiwany błąd podczas zapisywania.'
    },
    image: {
      title: 'Obraz',
      insertActionDesc: 'Domyślna czynność po wstawieniu obrazu z lokalnego folderu lub schowka',
      clipboardHint: 'Obsługa schowka jest w pełni wspierana tylko na macOS i Windows.',
      actionUpload: 'Prześlij obraz do chmury za pomocą wybranego programu przesyłającego (należy skonfigurować poniżej)',
      actionFolder: 'Kopiuj obraz do wyznaczonego względnego katalogu assets lub globalnego folderu lokalnego',
      actionPath: 'Zachowaj oryginalną lokalizację',
      folder: {
        globalOrRelative: 'Globalny lub względny folder obrazów',
        globalFolder: 'Globalny folder obrazów',
        open: 'Otwórz...',
        showInFolder: 'Pokaż w folderze',
        preferRelative: 'Preferuj względny folder assets',
        relativeName: 'Nazwa względnego folderu obrazów',
        footnotePrefix: 'Uwzględnij ',
        footnoteSuffix: ' w powyższym polu tekstowym, aby automatycznie wstawić nazwę pliku dokumentu.'
      },
      uploader: {
        title: 'Program przesyłający',
        currentUploader: 'Bieżący program przesyłający obrazy to {name}.',
        noUploader: 'Obecnie nie wybrano programu przesyłającego. Wybierz program i skonfiguruj go.',
        saveConfigTitle: 'Zapisz konfigurację',
        githubSaved: 'Konfiguracja GitHub została zapisana.',
        scriptSaved: 'Konfiguracja skryptu wiersza poleceń została zapisana',
        githubWarning: 'GitHub zostanie usunięty w przyszłej wersji, użyj picgo',
        picgoNotInstalled: 'Twój system nie ma zainstalowanego {link}, zainstaluj go przed użyciem.',
        picgoLink: 'picgo',
        githubToken: 'Token GitHub:',
        githubTokenHint: 'Token jest zapisywany przez Keychain na macOS, Secret Service API/libsecret na Linux i Credential Vault na Windows',
        tokenPlaceholder: 'Wprowadź token',
        ownerPlaceholder: 'właściciel',
        repoPlaceholder: 'repozytorium',
        branchPlaceholder: 'gałąź',
        ownerName: 'Nazwa właściciela:',
        repoName: 'Nazwa repozytorium:',
        branchName: 'Nazwa gałęzi (opcjonalnie):',
        scriptLocation: 'Lokalizacja skryptu powłoki:',
        scriptPathPlaceholder: 'Ścieżka bezwzględna skryptu',
        scriptDesc: 'Skrypt zostanie wykonany ze ścieżką pliku obrazu jako jedynym argumentem i powinien zwrócić dowolną prawidłową wartość dla',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'Motyw',
      autoSwitch: 'Automatycznie dostosuj motyw aplikacji do ustawień systemowych',
      openFolder: 'Otwórz folder motywów',
      openFolderButton: 'Otwórz folder',
      importTheme: 'Importuj motywy niestandardowe',
      importButton: 'Importuj motyw'
    },
    markdown: {
      title: 'Markdown',
      lists: 'Listy:',
      preferLooseList: 'Preferuj luźne elementy listy',
      bulletMarker: 'Preferowany znacznik dla list punktowanych',
      orderDelimiter: 'Preferowany znacznik dla list numerowanych',
      listIndentation: 'Preferowane wcięcie listy',
      extensions: 'Rozszerzenia Markdown:',
      frontmatter: 'Format front matter',
      superSubScript: 'Włącz indeks górny i dolny w stylu Pandoc',
      footnotes: 'Włącz przypisy w stylu Pandoc',
      footnotesNote: 'Wymaga ponownego uruchomienia.',
      compatibility: 'Kompatybilność:',
      enableHtml: 'Włącz renderowanie HTML',
      gitlabCompat: 'Włącz tryb kompatybilności GitLab',
      diagrams: 'Diagramy:',
      sequenceTheme: 'Motyw diagramu sekwencji',
      misc: 'Różne:',
      headingStyle: 'Preferowany styl nagłówka'
    },
    editor: {
      title: 'Edytor',
      textEditor: 'Ustawienia edytora tekstu:',
      fontSize: 'Rozmiar czcionki',
      lineHeight: 'Wysokość linii',
      fontFamily: 'Rodzina czcionek',
      maxWidth: 'Maksymalna szerokość edytora tekstu',
      maxWidthNote: "Pozostaw puste dla domyślnego motywu, w przeciwnym razie użyj liczby z sufiksem jednostki, która jest jedną z 'ch' dla znaków, 'px' dla pikseli lub '%' dla procentów.",
      codeBlock: 'Ustawienia bloku kodu:',
      codeFontSize: 'Rozmiar czcionki',
      codeFontFamily: 'Rodzina czcionek',
      lineNumbers: 'Pokaż numery linii',
      trimEmptyLines: 'Usuń wiodące i końcowe puste linie',
      writing: 'Zachowanie podczas pisania:',
      autoPairBracket: 'Automatycznie zamykaj nawiasy podczas pisania',
      autoPairMarkdown: 'Automatycznie uzupełniaj składnię markdown',
      autoPairQuote: 'Automatycznie zamykaj cudzysłowy',
      fileRepresentation: 'Reprezentacja pliku:',
      tabWidth: 'Preferowana szerokość tabulatora',
      lineSeparator: 'Typ separatora linii',
      encoding: 'Domyślnowe kodowanie',
      detectEncoding: 'Automatycznie wykrywaj kodowanie pliku',
      trailingNewline: 'Obsługa końcowych znaków nowej linii',
      misc: 'Różne:',
      textDirection: 'Kierunek tekstu',
      hideInsertHint: 'Ukryj wskazówkę wyboru typu nowego akapitu',
      hideLinkPopup: 'Ukryj wyskakujące okienko, gdy kursor znajduje się nad linkiem',
      autoCheck: 'Czy automatycznie sprawdzać wszelkie powiązane zadania'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'O Macaron',
      checkForUpdates: 'Sprawdź aktualizacje...',
      preferences: 'Preferencje',
      services: 'Usługi',
      hide: 'Ukryj Macaron',
      hideOthers: 'Ukryj inne',
      showAll: 'Pokaż wszystko',
      quit: 'Zamknij Macaron'
    },
    file: {
      root: '&Plik',
      newTab: 'Nowa karta',
      newWindow: 'Nowe okno',
      openFile: 'Otwórz plik...',
      openFolder: 'Otwórz folder...',
      openRecent: 'Otwórz ostatnie',
      clearRecentlyUsed: 'Wyczyść ostatnio używane',
      save: 'Zapisz',
      saveAs: 'Zapisz jako...',
      autoSave: 'Autozapis',
      moveTo: 'Przenieś do...',
      rename: 'Zmień nazwę...',
      import: 'Importuj...',
      export: 'Eksportuj',
      html: 'HTML',
      pdf: 'PDF',
      print: 'Drukuj',
      preferences: 'Preferencje...',
      closeTab: 'Zamknij kartę',
      closeWindow: 'Zamknij okno',
      quit: 'Zamknij'
    },
    edit: {
      root: '&Edycja',
      simpleRoot: 'Edycja',
      undo: 'Cofnij',
      redo: 'Ponów',
      cut: 'Wytnij',
      copy: 'Kopiuj',
      paste: 'Wklej',
      copyAsMarkdown: 'Kopiuj jako Markdown',
      copyAsHtml: 'Kopiuj jako HTML',
      pasteAsPlainText: 'Wklej jako zwykły tekst',
      selectAll: 'Zaznacz wszystko',
      duplicate: 'Duplikuj',
      createParagraph: 'Utwórz akapit',
      deleteParagraph: 'Usuń akapit',
      find: 'Znajdź',
      findNext: 'Znajdź następne',
      findPrevious: 'Znajdź poprzednie',
      replace: 'Zastąp',
      findInFolder: 'Znajdź w folderze',
      screenshot: 'Zrzut ekranu',
      lineEnding: 'Zakończenie linii',
      lineEndingCrlf: 'Powrót karetki i przesunięcie linii (CRLF)',
      lineEndingLf: 'Przesunięcie linii (LF)'
    },
    paragraph: {
      root: '&Akapit',
      heading1: 'Nagłówek 1',
      heading2: 'Nagłówek 2',
      heading3: 'Nagłówek 3',
      heading4: 'Nagłówek 4',
      heading5: 'Nagłówek 5',
      heading6: 'Nagłówek 6',
      promoteHeading: 'Promuj nagłówek',
      demoteHeading: 'Zdegraduj nagłówek',
      table: 'Tabela',
      codeFences: 'Ogrodzenie kodu',
      quoteBlock: 'Blok cytatu',
      mathBlock: 'Blok matematyczny',
      htmlBlock: 'Blok HTML',
      orderedList: 'Lista numerowana',
      bulletList: 'Lista punktowa',
      taskList: 'Lista zadań',
      looseListItem: 'Luźny element listy',
      paragraph: 'Akapit',
      horizontalRule: 'Linia pozioma',
      frontMatter: 'Front matter'
    },
    format: {
      root: 'F&ormat',
      bold: 'Pogrubienie',
      italic: 'Kursywa',
      underline: 'Podkreślenie',
      superscript: 'Indeks górny',
      subscript: 'Indeks dolny',
      highlight: 'Wyróżnienie',
      inlineCode: 'Kod w linii',
      inlineMath: 'Matematyka w linii',
      strikethrough: 'Przekreślenie',
      hyperlink: 'Hiperłącze',
      image: 'Obraz',
      clearFormatting: 'Wyczyść formatowanie'
    },
    theme: {
      root: '&Motyw',
      light: 'Cadmium Light',
      dark: 'Ciemny',
      graphite: 'Graphite Light',
      materialDark: 'Material Dark',
      oneDark: 'One Dark',
      ulysses: 'Ulysses Light'
    },
    view: {
      root: '&Widok',
      commandPalette: 'Paleta poleceń...',
      sourceCodeMode: 'Tryb kodu źródłowego',
      typewriterMode: 'Tryb maszyny do pisania',
      focusMode: 'Tryb skupienia',
      showSidebar: 'Pokaż pasek boczny',
      showTabBar: 'Pokaż pasek kart',
      toggleToc: 'Przełącz spis treści',
      reloadImages: 'Przeładuj obrazy',
      showDevTools: 'Pokaż narzędzia deweloperskie',
      reloadWindow: 'Przeładuj okno'
    },
    window: {
      root: '&Okno',
      minimize: 'Minimalizuj',
      alwaysOnTop: 'Zawsze na wierzchu',
      zoomIn: 'Powiększ',
      zoomOut: 'Pomniejsz',
      showInFullScreen: 'Pokaż na pełnym ekranie',
      bringAllToFront: 'Przenieś wszystko na wierzch'
    },
    help: {
      root: 'P&omoc',
      quickStart: 'Szybki start...',
      markdownReference: 'Referencja Markdown...',
      changelog: 'Dziennik zmian...',
      donate: 'Wspomóż przez Open Collective...',
      feedbackViaTwitter: 'Opinie przez Twitter...',
      reportIssue: 'Zgłoś problem lub poproś o funkcję...',
      website: 'Strona internetowa...',
      watchOnGitHub: 'Obserwuj na GitHub...',
      followOnGitHub: 'Obserwuj nas na GitHub...',
      followOnTwitter: 'Obserwuj nas na Twitterze...',
      license: 'Licencja...',
      checkForUpdates: 'Sprawdź aktualizacje...',
      about: 'O Macaron...'
    },
    dock: {
      open: 'Otwórz...',
      clearRecent: 'Wyczyść ostatnie'
    }
  }
}
