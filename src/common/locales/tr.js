export default {
  app: {
    preferences: 'Tercihler',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: 'Tercihlerde ara',
    categories: {
      general: 'Genel',
      editor: 'Düzenleyici',
      markdown: 'Markdown',
      spelling: 'Yazım Denetimi',
      theme: 'Tema',
      image: 'Resim',
      keybindings: 'Tuş Bağlamaları'
    },
    general: {
      title: 'Genel',
      autoSave: 'Otomatik Kaydet',
      autoSaveDescription: 'Belge değişikliklerini otomatik olarak kaydet',
      autoSaveDelayDescription: 'Belge düzenlemesinden sonra otomatik kaydetmeden önceki gecikme',
      window: 'Pencere',
      titleBarStyle: 'Başlık çubuğu stili',
      requiresRestart: 'Yeniden başlatma gerektirir.',
      hideScrollbars: 'Kaydırma çubuklarını gizle',
      openFilesInNewWindow: 'Dosyaları yeni pencerede aç',
      openFoldersInNewWindow: 'Klasörleri yeni pencerede aç',
      zoom: 'Yakınlaştırma',
      sidebar: 'Kenar Çubuğu',
      wrapTextInToc: 'İçindekiler tablosunda metni kaydır',
      sortFieldForFilesInOpenFolders: 'Açık klasörlerdeki dosyalar için sıralama alanı',
      startupAction: 'Başlangıçtaki eylem',
      openDefaultDirectory: 'Varsayılan dizini aç',
      selectFolder: 'Klasör Seç',
      openBlankPage: 'Boş bir sayfa aç',
      misc: 'Çeşitli',
      userInterfaceLanguage: 'Kullanıcı arayüzü dili'
    },
    options: {
      titleBarStyle: {
        custom: 'Özel',
        native: 'Yerel'
      },
      fileSortBy: {
        created: 'Oluşturma zamanı',
        modified: 'Değiştirme zamanı',
        title: 'Başlık'
      },
      language: {
        system: 'Sistemi takip et',
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
    toggleSidebar: 'Kenar Çubuğunu Değiştir',
    sourceCodeMode: 'Kaynak Kod Modu',
    spellcheck: 'Yazım Denetimini Değiştir',
    systemDefault: 'Sistem Varsayılanı',
    spellcheckLanguage: 'Yazım Denetimi Dili',
    wordCount: 'Kelime Sayısı',
    words: 'Kelime',
    characters: 'Karakter',
    paragraphs: 'Paragraf',
    allCharacters: 'Tüm Karakterler'
  },
  search: {
    replacementPlaceholder: 'Değiştirme',
    caseSensitive: 'Büyük/Küçük Harf Duyarlı',
    wholeWord: 'Tüm kelimeyi seç',
    regex: 'Sorguyu RegEx olarak kullan',
    replaceAll: 'Tümünü Değiştir',
    replaceSingle: 'Tekini Değiştir',
    invalidRegex: 'Geçersiz düzenli ifade: /{value}/.',
    regexMatchesEmpty: 'RegEx: /{value}/ boş dizeyle eşleşiyor.'
  },
  titleBar: {
    words: 'Kelimeler',
    characters: 'Karakterler',
    paragraphs: 'Paragraflar',
    stats: {
      word: {
        short: 'K',
        full: 'kelime'
      },
      character: {
        short: 'Kr',
        full: 'karakter'
      },
      paragraph: {
        short: 'P',
        full: 'paragraf'
      },
      all: {
        short: 'T',
        full: '(boşlukla birlikte)karakter'
      }
    }
  },
  commandPalette: {
    placeholder: 'Çalıştırmak için bir komut yazın'
  },
  sideBar: {
    tableOfContents: 'İçindekiler'
  },
  exportDialog: {
    title: 'Dışa Aktarma Seçenekleri',
    overviewEyebrow: 'Dışa aktarma ayarları',
    htmlEyebrow: 'HTML dışa aktarma ayarları',
    printableSubtitle: 'Belgenizi dışa aktarmadan önce sayfa düzenini, görünümü, üst ve alt bilgileri ve içindekiler tablosunu ayarlayın.',
    htmlSubtitle: 'Belgenizi dışa aktarmadan önce başlığı, görünümü ve içindekiler tablosunu ayarlayın.',
    footerPrintable: 'Yukarıdaki ayarları gözden geçirin ve hazır olduğunuzda dışa aktarın.',
    footerHtml: 'Yukarıdaki ayarları gözden geçirin ve hazır olduğunuzda HTML dosyanızı dışa aktarın.',
    tabs: {
      info: 'Bilgi',
      page: 'Sayfa',
      style: 'Stil',
      theme: 'Tema',
      header: 'Üstbilgi ve Altbilgi',
      toc: 'İçindekiler Tablosu'
    },
    infoText: 'Lütfen sayfa görünümünü özelleştirin ve devam etmek için "dışa aktar" seçeneğine tıklayın.',
    pageTitle: 'Sayfa başlığı:',
    pageSize: 'Sayfa boyutu:',
    widthHeightMm: 'Genişlik/Yükseklik (mm):',
    landscape: 'Yatay yönelim:',
    pageMargin: 'Sayfa kenar boşluğu (mm):',
    topBottom: 'Üst/Alt:',
    leftRight: 'Sol/Sağ:',
    overwriteFontSettings: 'Tema yazı tipi ayarlarının üzerine yaz:',
    fontFamily: 'Yazı tipi ailesi:',
    fontSize: 'Yazı tipi boyutu',
    lineHeight: 'Satır yüksekliği',
    autoNumberingHeadings: 'Başlıkları otomatik numaralandır:',
    showFrontMatter: 'Front matter\'ı göster:',
    themeText: 'Bir tema seçerek veya el yapımı bir tema oluşturarak belge görünümünü değiştirebilirsiniz.',
    theme: 'Tema:',
    headerFooterText: 'Üstbilgi ve/veya altbilgi tanımlanırsa, metin tüm sayfalarda görünür.',
    headerType: 'Üstbilgi türü:',
    leftHeaderText: 'Sol üstbilgi metni:',
    mainHeaderText: 'Ana üstbilgi metni:',
    rightHeaderText: 'Sağ üstbilgi metni:',
    footerType: 'Altbilgi türü:',
    leftFooterText: 'Sol altbilgi metni:',
    mainFooterText: 'Ana altbilgi metni:',
    rightFooterText: 'Sağ altbilgi metni:',
    customizeStyle: 'Stili özelleştir:',
    allowStyledHeaderFooter: 'Stilli üstbilgi ve altbilgiye izin ver:',
    headerFooterFontSize: 'Üstbilgi ve altbilgi yazı tipi boyutu',
    includeTopHeading: 'Üst başlığı dahil et:',
    includeTopHeadingDetail: 'İlk başlık seviyesini de dahil eder.',
    tocTitle: 'Başlık:',
    export: 'Dışa Aktar...',
    option: {
      custom: 'Özel',
      none: 'Yok',
      singleCell: 'Tek hücre',
      threeCells: 'Üç hücre',
      default: 'Varsayılan',
      simple: 'Basit',
      styled: 'Stilli'
    },
    sections: {
      htmlDocument: 'HTML belgesi',
      htmlDocumentDescription: 'Dışa aktarılan HTML belgesi için kullanılan başlığı yapılandırın.',
      pageSetup: 'Sayfa ayarı',
      pageSetupDescription: 'Dışa aktarılan PDF için kullanılan kağıt boyutunu ve yönünü seçin.',
      margins: 'Kenar boşlukları',
      marginsDescription: 'Yazdırma ve PDF dışa aktarma sırasında uygulanan sayfa kenar boşluklarını ayarlayın.',
      width: 'Genişlik',
      height: 'Yükseklik',
      marginTop: 'Üst kenar boşluğu',
      marginBottom: 'Alt kenar boşluğu',
      marginLeft: 'Sol kenar boşluğu',
      marginRight: 'Sağ kenar boşluğu',
      typography: 'Tipografi',
      typographyDescription: 'Dışa aktarma çıktısında kullanılan yazı tipi ve dizgi ayarlarının üzerine yazın.',
      documentDetails: 'Belge ayrıntıları',
      documentDetailsDescription: 'Dışa aktarmaya ek yapısal bilgiler dahil edilip edilmeyeceğini seçin.',
      theme: 'Tema',
      header: 'Üstbilgi',
      footer: 'Altbilgi',
      footerDescription: 'Altbilgi düzenini seçin ve görüntülenecek metni özelleştirin.',
      headerFooterStyle: 'Üstbilgi ve altbilgi stili',
      headerFooterStyleDescription: 'Yazdırılan üstbilgi ve altbilgi alanında kullanılan tipografiyi özelleştirin.',
      toc: 'İçindekiler tablosu',
      tocDescription: 'Oluşturulan başlığı ve içindekiler tablosuna dahil edilen başlık aralığını kontrol edin.'
    }
  },
  notification: {
    information: 'Bilgi',
    defaultMessage: 'Bu mesajı asla görmemelisiniz',
    spelling: 'Yazım',
    spellcheckerDisabled: 'Yazım denetleyici devre dışı bırakıldığından dil değiştirilemiyor.'
  },
  editor: {
    insertTable: {
      title: 'Tablo Ekle',
      rows: 'Satırlar',
      columns: 'Sütunlar',
      cancel: 'İptal',
      ok: 'Tamam'
    },
    contextMenu: {
      tabs: {
        close: 'Kapat',
        closeOthers: 'Diğerlerini kapat',
        closeSavedTabs: 'Kaydedilen sekmeleri kapat',
        closeAllTabs: 'Tüm sekmeleri kapat',
        rename: 'Yeniden Adlandır',
        copyPath: 'Yolu kopyala',
        showInFolder: 'Klasörde göster'
      },
      sideBar: {
        newFile: 'Yeni Dosya',
        newDirectory: 'Yeni Dizin',
        copy: 'Kopyala',
        cut: 'Kes',
        paste: 'Yapıştır',
        rename: 'Yeniden Adlandır',
        moveToTrash: 'Çöpe Taşı',
        showInFolder: 'Klasörde Göster'
      },
      tree: {
        openedFiles: 'Açık Dosyalar',
        saveAll: 'Tümünü Kaydet',
        closeAll: 'Tümünü Kapat',
        emptyProject: 'Boş proje',
        createFile: 'Dosya Oluştur',
        openFolder: 'Klasör Aç'
      }
    },
    notification: {
      ok: 'Tamam'
    },
    imageUpload: {
      title: 'Resim Yükle',
      uploadFailed: 'Yükleme başarısız oldu, resim resim klasörüne kopyalanacak',
      sizeExceeded: '5M\'tan büyük resim yüklenemiyor, resim resim klasörüne kopyalanacak',
      noUploader: 'Resim yükleyici sağlanmadı.',
      copyDeletionUrl: 'Yüklenen resmin silme URL\'sini panoya kopyalamak için tıklayın ({url}).'
    },
    frontMenu: {
      duplicate: 'Çoğalt',
      turnInto: 'Dönüştür',
      newParagraph: 'Yeni Paragraf',
      delete: 'Sil'
    },
    quickInsert: {
      basicBlock: 'Temel Blok',
      header: 'Başlık',
      advancedBlock: 'Gelişmiş Blok',
      listBlock: 'Liste Bloğu',
      diagram: 'Diyagram',
      paragraph: 'Paragraf',
      horizontalLine: 'Yatay Çizgi',
      frontMatter: 'Front Matter',
      header1: 'Başlık 1',
      header2: 'Başlık 2',
      header3: 'Başlık 3',
      header4: 'Başlık 4',
      header5: 'Başlık 5',
      header6: 'Başlık 6',
      tableBlock: 'Tablo Bloğu',
      displayMath: 'Matematik Bloğu',
      htmlBlock: 'HTML Bloğu',
      codeBlock: 'Kod Bloğu',
      quoteBlock: 'Alıntı Bloğu',
      orderList: 'Sıralı Liste',
      bulletList: 'Madde İşaretli Liste',
      todoList: 'Görev Listesi',
      vegaChart: 'Vega Grafiği',
      flowChart: 'Akış Şeması',
      sequenceDiagram: 'Sıralama Diyagramı',
      plantuml: 'PlantUML Diyagramı',
      mermaid: 'Mermaid',
      typeToInsert: "Eklemek için {'@'} yazın"
    }
  },
  fileOperation: {
    newFile: 'Yeni Dosya',
    untitled: 'Başlıksız {id}',
    import: {
      title: 'İçe Aktar veya Aç',
      dropHere: 'Öğelerinizi Macaron\'a getirmek için buraya bırakın'
    },
    export: {
      successTitle: 'Başarıyla dışa aktarıldı',
      successMessage: '"{filename}" başarıyla dışa aktarıldı!',
      failTitle: 'Yazdırma/Dışa Aktarma başarısız oldu',
      failMessage: '{filename} dışa aktarma/yazdırma başarısız oldu'
    }
  },
  recent: {
    welcome: 'Macaron\'a Hoş Geldiniz',
    newFile: 'Yeni Dosya',
    openFile: 'Dosya Aç',
    openFolder: 'Klasör Aç'
  },
  about: {
    appName: 'Macaron',
    copyright: 'Telif Hakkı © 2017-{year} Luo Ran',
    copyrightContributors: 'Telif Hakkı © 2018-{year} Macaron Katkıda Bulunanlar'
  },
  update: {
    title: 'Güncelleme',
    notAvailable: 'Güncelleme Mevcut Değil',
    downloaded: 'Güncelleme İndirildi',
    available: 'Güncelleme Mevcut'
  },
  searchFolder: {
    placeholder: 'Klasörde ara...',
    noFolderOpen: 'Açık klasör yok',
    noResults: 'Sonuç bulunamadı.',
    cancel: 'İptal',
    openFolder: 'Klasör Aç'
  },
  preferences: {
    keybindings: {
      title: 'Tuş Bağlamaları',
      description: 'Macaron kısayollarını özelleştirin ve tüm değişiklikleri uygulamak için aşağıdaki kaydet düğmesine tıklayın (yeniden başlatma gerektirir). Mevcut ve varsayılan tüm tuş bağlamaları {link} bulunabilir.',
      onlineLink: 'çevrimiçi',
      columnDescription: 'Açıklama',
      columnKeyCombination: 'Tuş Kombinasyonu',
      columnOptions: 'Seçenekler',
      buttonEdit: 'Düzenle',
      buttonReset: 'Sıfırla',
      buttonUnbind: 'Bağlamayı Kaldır',
      buttonSave: 'Kaydet',
      buttonRestoreDefaults: 'Varsayılan tuş bağlamalarını geri yükle',
      saveFailedTitle: 'Kaydetme başarısız oldu',
      saveFailedMessage: 'Kaydetme sırasında beklenmeyen bir hata oluştu.',
      keyInputDialog: {
        placeholder: 'Bir tuş kombinasyonuna basın',
        hint: 'Devam etmek için Enter, çıkmak için ESC tuşuna basın.',
        invalidKey: 'Mevcut tuş kombinasyonu bağlanamaz!'
      },
      shortcutInUseTitle: 'Kısayol zaten kullanımda',
      shortcutInUseMessage: '"{accelerator}" kısayolu zaten kullanımda. Lütfen kısayolu kaldırın ve tekrar deneyin.'
    },
    spellchecker: {
      title: 'Yazım Denetimi',
      enableSpellcheck: 'Yazım denetimini etkinleştir',
      hideMarks: 'Yazım hataları için işaretleri gizle',
      autoDetectLanguage: 'Belge dilini otomatik olarak algıla',
      defaultLanguage: 'Yazım denetimi için varsayılan dil',
      macOSInfo: 'Kullanılan dil yazarken otomatik olarak algılanacaktır. Ek diller sistem tercihleri bölmesindeki "Dil ve Bölge" aracılığıyla eklenebilir.',
      customDictionary: 'Özel sözlük:',
      customDictionaryDesc: 'Özel sözlükteki kelimeleri düzenle.',
      columnWord: 'Kelime',
      columnOptions: 'Seçenekler',
      buttonDelete: 'Sil',
      noWords: 'Kullanılabilir kelime yok',
      switchLanguageFailed: 'Dil değiştirme başarısız oldu',
      removeWordFailed: 'Özel kelimeyi kaldırma başarısız oldu',
      removeWordFailedMessage: 'Kaydetme sırasında beklenmeyen bir hata oluştu.'
    },
    image: {
      title: 'Resim',
      insertActionDesc: 'Yerel klasörden veya panodan resim eklendikten sonraki varsayılan eylem',
      clipboardHint: 'Pano işleme yalnızca macOS ve Windows\'ta tam olarak desteklenmektedir.',
      actionUpload: 'Seçilen yükleyiciyi kullanarak görüntüyü buluta yükle (aşağıda yapılandırılmalıdır)',
      actionFolder: 'Görüntüyü belirlenen göreli assets dizinine veya genel yerel klasöre kopyala',
      actionPath: 'Orijinal konumu koru',
      folder: {
        globalOrRelative: 'Genel veya göreli resim klasörü',
        globalFolder: 'Genel resim klasörü',
        open: 'Aç...',
        showInFolder: 'Klasörde Göster',
        preferRelative: 'Göreli assets klasörünü tercih et',
        relativeName: 'Göreli resim klasörü adı',
        footnotePrefix: 'Yukarıdaki metin kutusuna ',
        footnoteSuffix: ' ekleyerek belge dosya adını otomatik olarak ekleyin.'
      },
      uploader: {
        title: 'Yükleyici',
        currentUploader: 'Mevcut resim yükleyici {name}.',
        noUploader: 'Şu anda seçili yükleyici yok. Lütfen bir yükleyici seçin ve yapılandırın.',
        saveConfigTitle: 'Yapılandırmayı Kaydet',
        githubSaved: 'GitHub yapılandırması kaydedildi.',
        scriptSaved: 'Komut satırı betiği yapılandırması kaydedildi',
        githubWarning: 'GitHub gelecekteki bir sürümde kaldırılacak, lütfen picgo kullanın',
        picgoNotInstalled: 'Sisteminizde {link} yüklü değil, lütfen kullanmadan önce yükleyin.',
        picgoLink: 'picgo',
        githubToken: 'GitHub token:',
        githubTokenHint: 'Token macOS\'ta Keychain, Linux\'ta Secret Service API/libsecret ve Windows\'ta Credential Vault tarafından kaydedilir',
        tokenPlaceholder: 'Token girin',
        ownerPlaceholder: 'sahip',
        repoPlaceholder: 'depo',
        branchPlaceholder: 'dal',
        ownerName: 'Sahip adı:',
        repoName: 'Depo adı:',
        branchName: 'Dal adı (isteğe bağlı):',
        scriptLocation: 'Kabuk betiği konumu:',
        scriptPathPlaceholder: 'Betiğin mutlak yolu',
        scriptDesc: 'Betik, resim dosyası yolunu tek argüman olarak alarak çalıştırılacak ve',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'Tema',
      autoSwitch: 'Uygulama temasını sistem ayarlarına göre otomatik olarak ayarla',
      openFolder: 'Temalar klasörünü aç',
      openFolderButton: 'Klasör Aç',
      importTheme: 'Özel temaları içe aktar',
      importButton: 'Tema İçe Aktar'
    },
    markdown: {
      title: 'Markdown',
      lists: 'Listeler:',
      preferLooseList: 'Gevşek liste öğelerini tercih et',
      bulletMarker: 'Madde işaretli listeler için tercih edilen işaretleyici',
      orderDelimiter: 'Sıralı listeler için tercih edilen işaretleyici',
      listIndentation: 'Tercih edilen liste girintisi',
      extensions: 'Markdown uzantıları:',
      frontmatter: 'Front matter biçimi',
      superSubScript: 'Pandoc tarzı üst simge ve alt simgeyi etkinleştir',
      footnotes: 'Pandoc tarzı dipnotları etkinleştir',
      footnotesNote: 'Yeniden başlatma gerektirir.',
      compatibility: 'Uyumluluk:',
      enableHtml: 'HTML oluşturmayı etkinleştir',
      gitlabCompat: 'GitLab uyumluluk modunu etkinleştir',
      diagrams: 'Diyagramlar:',
      sequenceTheme: 'Sıra diyagramı teması',
      misc: 'Çeşitli:',
      headingStyle: 'Tercih edilen başlık stili'
    },
    editor: {
      title: 'Düzenleyici',
      textEditor: 'Metin düzenleyici ayarları:',
      fontSize: 'Yazı tipi boyutu',
      lineHeight: 'Satır yüksekliği',
      fontFamily: 'Yazı tipi ailesi',
      maxWidth: 'Metin düzenleyicinin maksimum genişliği',
      maxWidthNote: 'Tema varsayılanı için boş bırakın, aksi takdirde birim soneki ile sayı kullanın; karakterler için \'ch\', pikseller için \'px\' veya yüzde için \'%\'.',
      codeBlock: 'Kod bloğu ayarları:',
      codeFontSize: 'Yazı tipi boyutu',
      codeFontFamily: 'Yazı tipi ailesi',
      lineNumbers: 'Satır numaralarını göster',
      trimEmptyLines: 'Baştaki ve sondaki boş satırları kaldır',
      writing: 'Yazma davranışı:',
      autoPairBracket: 'Yazarken parantezleri otomatik olarak kapat',
      autoPairMarkdown: 'Markdown sözdizimini otomatik olarak tamamla',
      autoPairQuote: 'Tırnak işaretlerini otomatik olarak kapat',
      fileRepresentation: 'Dosya temsili:',
      tabWidth: 'Tercih edilen sekme genişliği',
      lineSeparator: 'Satır ayırıcı türü',
      encoding: 'Varsayılan kodlama',
      detectEncoding: 'Dosya kodlamasını otomatik olarak algıla',
      trailingNewline: 'Sondaki yeni satır karakterlerinin işlenmesi',
      misc: 'Çeşitli:',
      textDirection: 'Metin yönü',
      textDirectionLTR: 'Soldan sağa',
      textDirectionRTL: 'Sağdan sola',
      endOfLineDefault: 'Varsayılan',
      endOfLineCRLF: 'Satır başı dönüşü ve satır besleme (CRLF)',
      endOfLineLF: 'Satır besleme (LF)',
      trailingNewlineTrimAll: 'Tüm sondaki yeni satırları sil',
      trailingNewlineEnsureOne: 'Tam olarak bir sondaki yeni satır sağla',
      trailingNewlinePreserve: 'Orijinal belgenin stilini koru',
      trailingNewlineNone: 'Hiçbir şey yapma',
      hideInsertHint: 'Yeni paragraf türü seçimi için ipucunu gizle',
      hideLinkPopup: 'İmleç bağlantının üzerindeyken açılır pencereyi gizle',
      autoCheck: 'İlgili görevlerin otomatik olarak kontrol edilip edilmeyeceği'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'Macaron Hakkında',
      checkForUpdates: 'Güncellemeleri kontrol et...',
      preferences: 'Tercihler',
      services: 'Hizmetler',
      hide: 'Macaron\'u Gizle',
      hideOthers: 'Diğerlerini Gizle',
      showAll: 'Tümünü Göster',
      quit: 'Macaron\'dan Çık'
    },
    file: {
      root: '&Dosya',
      newTab: 'Yeni Sekme',
      newWindow: 'Yeni Pencere',
      openFile: 'Dosya Aç...',
      openFolder: 'Klasör Aç...',
      openRecent: 'Son Kullanılanları Aç',
      clearRecentlyUsed: 'Son Kullanılanları Temizle',
      save: 'Kaydet',
      saveAs: 'Farklı Kaydet...',
      autoSave: 'Otomatik Kaydet',
      moveTo: 'Taşı...',
      rename: 'Yeniden Adlandır...',
      import: 'İçe Aktar...',
      export: 'Dışa Aktar',
      html: 'HTML',
      pdf: 'PDF',
      print: 'Yazdır',
      preferences: 'Tercihler...',
      closeTab: 'Sekmeyi Kapat',
      closeWindow: 'Pencereyi Kapat',
      quit: 'Çık'
    },
    edit: {
      root: '&Düzenle',
      simpleRoot: 'Düzenle',
      undo: 'Geri Al',
      redo: 'Yinele',
      cut: 'Kes',
      copy: 'Kopyala',
      paste: 'Yapıştır',
      copyAsMarkdown: 'Markdown Olarak Kopyala',
      copyAsHtml: 'HTML Olarak Kopyala',
      pasteAsPlainText: 'Düz Metin Olarak Yapıştır',
      selectAll: 'Tümünü Seç',
      duplicate: 'Çoğalt',
      createParagraph: 'Paragraf Oluştur',
      deleteParagraph: 'Paragrafı Sil',
      find: 'Bul',
      findNext: 'Sonrakini Bul',
      findPrevious: 'Öncekini Bul',
      replace: 'Değiştir',
      findInFolder: 'Klasörde Bul',
      screenshot: 'Ekran Görüntüsü',
      lineEnding: 'Satır Sonu',
      lineEndingCrlf: 'Satır başı ve satır besleme (CRLF)',
      lineEndingLf: 'Satır besleme (LF)'
    },
    paragraph: {
      root: '&Paragraf',
      heading1: 'Başlık 1',
      heading2: 'Başlık 2',
      heading3: 'Başlık 3',
      heading4: 'Başlık 4',
      heading5: 'Başlık 5',
      heading6: 'Başlık 6',
      promoteHeading: 'Başlığı Yükselt',
      demoteHeading: 'Başlığı Alçalt',
      table: 'Tablo',
      codeFences: 'Kod Çitleri',
      quoteBlock: 'Alıntı Bloğu',
      mathBlock: 'Matematik Bloğu',
      htmlBlock: 'Html Bloğu',
      orderedList: 'Sıralı Liste',
      bulletList: 'Madde İşaretli Liste',
      taskList: 'Görev Listesi',
      looseListItem: 'Gevşek Liste Öğesi',
      paragraph: 'Paragraf',
      horizontalRule: 'Yatay Kural',
      frontMatter: 'Front Matter'
    },
    format: {
      root: 'B&içim',
      bold: 'Kalın',
      italic: 'Eğik',
      underline: 'Altı Çizili',
      superscript: 'Üst Simge',
      subscript: 'Alt Simge',
      highlight: 'Vurgula',
      inlineCode: 'Satır İçi Kod',
      inlineMath: 'Satır İçi Matematik',
      strikethrough: 'Üstü Çizili',
      hyperlink: 'Köprü',
      image: 'Resim',
      clearFormatting: 'Biçimlendirmeyi Temizle'
    },
    theme: {
      root: '&Tema',
      light: 'Kadmiyum Açık',
      dark: 'Koyu',
      graphite: 'Grafit Açık',
      materialDark: 'Materyal Koyu',
      oneDark: 'One Dark',
      ulysses: 'Ulysses Açık'
    },
    view: {
      root: '&Görünüm',
      commandPalette: 'Komut Paleti...',
      sourceCodeMode: 'Kaynak Kod Modu',
      typewriterMode: 'Daktilo Modu',
      focusMode: 'Odak Modu',
      showSidebar: 'Kenar Çubuğunu Göster',
      showTabBar: 'Sekme Çubuğunu Göster',
      showTitleBar: 'Başlık Çubuğunu Göster',
      toggleToc: 'İçindekiler Tablosunu Aç/Kapat',
      reloadImages: 'Resimleri Yeniden Yükle',
      showDevTools: 'Geliştirici Araçlarını Göster',
      reloadWindow: 'Pencereyi Yeniden Yükle'
    },
    window: {
      root: '&Pencere',
      minimize: 'Simge Durumuna Küçült',
      alwaysOnTop: 'Her Zaman Üstte',
      zoomIn: 'Yakınlaştır',
      zoomOut: 'Uzaklaştır',
      showInFullScreen: 'Tam Ekranda Göster',
      bringAllToFront: 'Tümünü Öne Getir'
    },
    help: {
      root: '&Yardım',
      quickStart: 'Hızlı Başlangıç...',
      markdownReference: 'Markdown Referansı...',
      changelog: 'Değişiklik Günlüğü...',
      donate: 'Open Collective Aracılığıyla Bağış Yap...',
      feedbackViaTwitter: 'Twitter Aracılığıyla Geri Bildirim...',
      reportIssue: 'Sorun Bildir veya Özellik İste...',
      website: 'Web Sitesi...',
      watchOnGitHub: 'GitHub\'da İzle...',
      followOnGitHub: 'GitHub\'da Bizi Takip Et...',
      followOnTwitter: 'Twitter\'da Bizi Takip Et...',
      license: 'Lisans...',
      checkForUpdates: 'Güncellemeleri kontrol et...',
      about: 'Macaron Hakkında...'
    },
    dock: {
      open: 'Aç...',
      clearRecent: 'Son Kullanılanları Temizle'
    }
  }
}
