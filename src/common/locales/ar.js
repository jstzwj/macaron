export default {
  app: {
    preferences: 'التفضيلات',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: 'البحث في التفضيلات',
    categories: {
      general: 'عام',
      editor: 'المحرر',
      markdown: 'ماركداون',
      spelling: 'التدقيق الإملائي',
      theme: 'السمة',
      image: 'الصورة',
      keybindings: 'اختصارات لوحة المفاتيح'
    },
    general: {
      title: 'عام',
      autoSave: 'الحفظ التلقائي',
      autoSaveDescription: 'حفظ تغييرات المستند تلقائياً',
      autoSaveDelayDescription: 'التأخير بعد تحرير المستند قبل الحفظ التلقائي',
      window: 'النافذة',
      titleBarStyle: 'نمط شريط العنوان',
      requiresRestart: 'يتطلب إعادة التشغيل.',
      hideScrollbars: 'إخفاء أشرطة التمرير',
      openFilesInNewWindow: 'فتح الملفات في نافذة جديدة',
      openFoldersInNewWindow: 'فتح المجلدات في نافذة جديدة',
      zoom: 'التكبير',
      sidebar: 'الشريط الجانبي',
      wrapTextInToc: 'التفاف النص في جدول المحتويات',
      sortFieldForFilesInOpenFolders: 'حقل ترتيب الملفات في المجلدات المفتوحة',
      startupAction: 'الإجراء عند بدء التشغيل',
      openDefaultDirectory: 'فتح الدليل الافتراضي',
      selectFolder: 'اختر مجلداً',
      openBlankPage: 'فتح صفحة فارغة',
      misc: 'متفرقات',
      userInterfaceLanguage: 'لغة واجهة المستخدم'
    },
    options: {
      titleBarStyle: {
        custom: 'مخصص',
        native: 'أصلي'
      },
      fileSortBy: {
        created: 'وقت الإنشاء',
        modified: 'وقت التعديل',
        title: 'العنوان'
      },
      language: {
        system: 'اتباع النظام',
        en: 'English',
        'zh-CN': '简体中文'
      }
    }
  },
  search: {
    placeholder: 'البحث',
    replacementPlaceholder: 'الاستبدال',
    caseSensitive: 'حساس لحالة الأحرف',
    wholeWord: 'تحديد الكلمة كاملة',
    regex: 'استخدام البحث كتعبير نمطي',
    replaceAll: 'استبدال الكل',
    replaceSingle: 'استبدال واحد',
    invalidRegex: 'تعبير نمطي غير صالح: /{value}/.',
    regexMatchesEmpty: 'التعبير النمطي: /{value}/ يطابق سلسلة فارغة.'
  },
  titleBar: {
    words: 'كلمات',
    characters: 'أحرف',
    paragraphs: 'فقرات',
    stats: {
      word: {
        short: 'ك',
        full: 'كلمة'
      },
      character: {
        short: 'ح',
        full: 'حرف'
      },
      paragraph: {
        short: 'ف',
        full: 'فقرة'
      },
      all: {
        short: 'ك',
        full: 'حرف (مع المسافات)'
      }
    }
  },
  commandPalette: {
    placeholder: 'اكتب أمراً للتنفيذ'
  },
  exportDialog: {
    title: 'خيارات التصدير',
    tabs: {
      info: 'معلومات',
      page: 'الصفحة',
      style: 'النمط',
      theme: 'السمة',
      header: 'الرأس والتذييل',
      toc: 'جدول المحتويات'
    },
    infoText: 'يرجى تخصيص مظهر الصفحة والنقر على "تصدير" للمتابعة.',
    pageTitle: 'عنوان الصفحة:',
    pageSize: 'حجم الصفحة:',
    widthHeightMm: 'العرض/الارتفاع بالملم:',
    landscape: 'اتجاه أفقي:',
    pageMargin: 'هوامش الصفحة بالملم:',
    topBottom: 'أعلى/أسفل:',
    leftRight: 'يسار/يمين:',
    overwriteFontSettings: 'الكتابة فوق إعدادات خط السمة:',
    fontFamily: 'عائلة الخط:',
    fontSize: 'حجم الخط',
    lineHeight: 'ارتفاع السطر',
    autoNumberingHeadings: 'ترقيم العناوين تلقائياً:',
    showFrontMatter: 'إظهار المقدمة:',
    themeText: 'يمكنك تغيير مظهر المستند باختيار سمة أو إنشاء سمة مخصصة.',
    theme: 'السمة:',
    headerFooterText: 'النص الذي يظهر في جميع الصفحات إذا تم تحديد الرأس و/أو التذييل.',
    headerType: 'نوع الرأس:',
    leftHeaderText: 'نص الرأس الأيسر:',
    mainHeaderText: 'نص الرأس الرئيسي:',
    rightHeaderText: 'نص الرأس الأيمن:',
    footerType: 'نوع التذييل:',
    leftFooterText: 'نص التذييل الأيسر:',
    mainFooterText: 'نص التذييل الرئيسي:',
    rightFooterText: 'نص التذييل الأيمن:',
    customizeStyle: 'تخصيص النمط:',
    allowStyledHeaderFooter: 'السماح برأس وتذييل منسقين:',
    headerFooterFontSize: 'حجم خط الرأس والتذييل',
    includeTopHeading: 'تضمين العنوان العلوي:',
    includeTopHeadingDetail: 'يتضمن مستوى العنوان الأول أيضاً.',
    tocTitle: 'العنوان:',
    export: 'تصدير...',
    option: {
      custom: 'مخصص',
      none: 'لا شيء',
      singleCell: 'خلية واحدة',
      threeCells: 'ثلاث خلايا',
      default: 'افتراضي',
      simple: 'بسيط',
      styled: 'منسق'
    }
  },
  notification: {
    information: 'معلومات',
    defaultMessage: 'يجب ألا ترى هذه الرسالة أبداً',
    spelling: 'التدقيق الإملائي',
    spellcheckerDisabled: 'لا يمكن تغيير اللغة لأن المدقق الإملائي معطل.'
  },
  editor: {
    insertTable: {
      title: 'إدراج جدول',
      rows: 'صفوف',
      columns: 'أعمدة',
      cancel: 'إلغاء',
      ok: 'موافق'
    },
    contextMenu: {
      tabs: {
        close: 'إغلاق',
        closeOthers: 'إغلاق الأخرى',
        closeSavedTabs: 'إغلاق علامات التبويب المحفوظة',
        closeAllTabs: 'إغلاق جميع علامات التبويب',
        rename: 'إعادة تسمية',
        copyPath: 'نسخ المسار',
        showInFolder: 'إظهار في المجلد'
      },
      sideBar: {
        newFile: 'ملف جديد',
        newDirectory: 'مجلد جديد',
        copy: 'نسخ',
        cut: 'قص',
        paste: 'لصق',
        rename: 'إعادة تسمية',
        moveToTrash: 'نقل إلى سلة المهملات',
        showInFolder: 'إظهار في المجلد'
      }
    },
    notification: {
      ok: 'موافق'
    },
    imageUpload: {
      title: 'رفع صورة',
      uploadFailed: 'فشل الرفع، سيتم نسخ الصورة إلى مجلد الصور',
      sizeExceeded: 'لا يمكن رفع صورة أكبر من 5 ميغابايت، سيتم نسخ الصورة إلى مجلد الصور',
      noUploader: 'لم يتم توفير رافع صور.',
      copyDeletionUrl: 'انقر لنسخ عنوان URL لحذف الصورة المرفوعة إلى الحافظة ({url}).'
    },
    frontMenu: {
      duplicate: 'تكرار',
      turnInto: 'تحويل إلى',
      newParagraph: 'فقرة جديدة',
      delete: 'حذف'
    },
    quickInsert: {
      basicBlock: 'كتلة أساسية',
      header: 'عنوان',
      advancedBlock: 'كتلة متقدمة',
      listBlock: 'كتلة قائمة',
      diagram: 'مخطط',
      paragraph: 'فقرة',
      horizontalLine: 'مسطرة أفقية',
      frontMatter: 'المقدمة',
      header1: 'عنوان 1',
      header2: 'عنوان 2',
      header3: 'عنوان 3',
      header4: 'عنوان 4',
      header5: 'عنوان 5',
      header6: 'عنوان 6',
      tableBlock: 'كتلة جدول',
      displayMath: 'كتلة رياضيات',
      htmlBlock: 'كتلة HTML',
      codeBlock: 'كتلة كود',
      quoteBlock: 'كتلة اقتباس',
      orderList: 'قائمة مرقمة',
      bulletList: 'قائمة نقطية',
      todoList: 'قائمة مهام',
      vegaChart: 'مخطط Vega',
      flowChart: 'مخطط انسيابي',
      sequenceDiagram: 'مخطط تسلسلي',
      plantuml: 'مخطط PlantUML',
      mermaid: 'Mermaid'
    }
  },
  fileOperation: {
    newFile: 'ملف جديد',
    untitled: 'بدون عنوان {id}',
    import: {
      title: 'استيراد أو فتح',
      dropHere: 'اسحب到这里 لاستيراد ملفاتك إلى Macaron'
    },
    export: {
      successTitle: 'تم التصدير بنجاح',
      successMessage: 'تم تصدير "{filename}" بنجاح!',
      failTitle: 'فشل الطباعة/التصدير',
      failMessage: 'فشلت الطباعة/التصدير {filename}'
    }
  },
  about: {
    appName: 'Macaron',
    copyright: 'حقوق النشر © 2017-{year} Luo Ran',
    copyrightContributors: 'حقوق النشر © 2018-{year} مساهمو Macaron'
  },
  update: {
    title: 'تحديث',
    notAvailable: 'التحديث غير متوفر',
    downloaded: 'تم تحميل التحديث',
    available: 'التحديث متوفر'
  },
  searchFolder: {
    placeholder: 'البحث في المجلد...',
    noFolderOpen: 'لا يوجد مجلد مفتوح',
    noResults: 'لم يتم العثور على نتائج.',
    cancel: 'إلغاء',
    openFolder: 'فتح مجلد'
  },
  preferences: {
    keybindings: {
      title: 'اختصارات لوحة المفاتيح',
      description: 'خصص اختصارات Macaron وانقر على زر الحفظ أدناه لتطبيق جميع التغييرات (يتطلب إعادة التشغيل). يمكن العثور على جميع اختصارات لوحة المفاتيح المتاحة والافتراضية {link}.',
      onlineLink: 'عبر الإنترنت',
      columnDescription: 'الوصف',
      columnKeyCombination: 'مجموعة المفاتيح',
      columnOptions: 'الخيارات',
      buttonEdit: 'تحرير',
      buttonReset: 'إعادة تعيين',
      buttonUnbind: 'إلغاء الربط',
      buttonSave: 'حفظ',
      buttonRestoreDefaults: 'استعادة الاختصارات الافتراضية',
      saveFailedTitle: 'فشل الحفظ',
      saveFailedMessage: 'حدث خطأ غير متوقع أثناء الحفظ.',
      keyInputDialog: {
        placeholder: 'اضغط على مجموعة مفاتيح',
        hint: 'اضغط على Enter للمتابعة أو ESC للخروج.',
        invalidKey: 'لا يمكن ربط مجموعة المفاتيح الحالية!'
      },
      shortcutInUseTitle: 'الاختصار قيد الاستخدام بالفعل',
      shortcutInUseMessage: 'الاختصار "{accelerator}" قيد الاستخدام بالفعل. يرجى إلغاء تعيين الاختصار والمحاولة مرة أخرى.'
    },
    spellchecker: {
      title: 'التدقيق الإملائي',
      enableSpellcheck: 'تمكين التدقيق الإملائي',
      hideMarks: 'إخفاء علامات الأخطاء الإملائية',
      autoDetectLanguage: 'الكشف التلقائي عن لغة المستند',
      defaultLanguage: 'اللغة الافتراضية لل تدقيق الإملائي',
      macOSInfo: 'سيتم اكتشاف اللغة المستخدمة تلقائياً أثناء الكتابة. يمكن إضافة لغات إضافية من خلال "اللغة والمنطقة" في إعدادات النظام الخاصة بك.',
      customDictionary: 'القاموس المخصص:',
      customDictionaryDesc: 'تحرير الكلمات في القاموس المخصص.',
      columnWord: 'كلمة',
      columnOptions: 'الخيارات',
      buttonDelete: 'حذف',
      noWords: 'لا توجد كلمات متاحة',
      switchLanguageFailed: 'فشل تبديل اللغة',
      removeWordFailed: 'فشل إزالة الكلمة المخصصة',
      removeWordFailedMessage: 'حدث خطأ غير متوقع أثناء الحفظ.'
    },
    image: {
      title: 'الصورة',
      insertActionDesc: 'الإجراء الافتراضي بعد إدراج صورة من مجلد محلي أو الحافظة',
      clipboardHint: 'التعامل مع الحافظة مدعوم بالكامل فقط على macOS و Windows.',
      uploader: {
        title: 'رافع الصور',
        currentUploader: 'رافع الصور الحالي هو {name}.',
        noUploader: 'لم يتم تحديد رافع صور حالياً. يرجى تحديد رافع وتكوينه.',
        saveConfigTitle: 'حفظ التكوين',
        githubSaved: 'تم حفظ تكوين GitHub.',
        scriptSaved: 'تم حفظ تكوين البرنامج النصي لسطر الأوامر',
        githubWarning: 'سيتم إزالة GitHub في إصدار مستقبلي، يرجى استخدام picgo',
        picgoNotInstalled: 'النظام الخاص بك لا يحتوي على {link} مثبت، يرجى تثبيته قبل الاستخدام.',
        picgoLink: 'picgo',
        githubToken: 'رمز GitHub:',
        githubTokenHint: 'يتم حفظ الرمز بواسطة Keychain على macOS، و Secret Service API/libsecret على Linux، و Credential Vault على Windows',
        tokenPlaceholder: 'أدخل الرمز',
        ownerPlaceholder: 'المالك',
        repoPlaceholder: 'المستودع',
        branchPlaceholder: 'الفرع',
        ownerName: 'اسم المالك:',
        repoName: 'اسم المستودع:',
        branchName: 'اسم الفرع (اختياري):',
        scriptLocation: 'موقع البرنامج النصي Shell:',
        scriptPathPlaceholder: 'المسار المطلق للبرنامج النصي',
        scriptDesc: 'سيتم تنفيذ البرنامج النصي مع مسار ملف الصورة كوسيطه الوحيد ويجب أن يخرج أي قيمة صالحة لـ',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'السمة',
      autoSwitch: 'ضبط سمة التطبيق تلقائياً وفقاً لإعدادات النظام',
      openFolder: 'فتح مجلد السمات',
      openFolderButton: 'فتح المجلد',
      importTheme: 'استيراد سمات مخصصة',
      importButton: 'استيراد سمة'
    },
    markdown: {
      title: 'ماركداون',
      lists: 'القوائم:',
      preferLooseList: 'تفضيل عناصر القائمة المفككة',
      bulletMarker: 'العلامة المفضلة للقوائم النقطية',
      orderDelimiter: 'العلامة المفضلة للقوائم المرقمة',
      listIndentation: 'المسافة البادئة المفضلة للقوائم',
      extensions: 'امتدادات ماركداون:',
      frontmatter: 'تنسيق المقدمة',
      superSubScript: 'تمكين الحروف العلوية والسفلية بنمط Pandoc',
      footnotes: 'تمكين الحواشي السفلية بنمط Pandoc',
      footnotesNote: 'يتطلب إعادة التشغيل.',
      compatibility: 'التوافق:',
      enableHtml: 'تمكين عرض HTML',
      gitlabCompat: 'تمكين وضع توافق GitLab',
      diagrams: 'المخططات:',
      sequenceTheme: 'سمة مخطط التسلسل',
      misc: 'متفرقات:',
      headingStyle: 'نمط العنوان المفضل'
    },
    editor: {
      title: 'المحرر',
      textEditor: 'إعدادات محرر النص:',
      fontSize: 'حجم الخط',
      lineHeight: 'ارتفاع السطر',
      fontFamily: 'عائلة الخط',
      maxWidth: 'العرض الأقصى لمحرر النص',
      maxWidthNote: "اتركه فارغاً للسمة الافتراضية، وإلا استخدم رقماً مع لاحقة الوحدة، وهي واحدة من 'ch' للأحرف، أو 'px' للبكسلات، أو '%' للنسبة المئوية.",
      codeBlock: 'إعدادات كتلة الكود:',
      codeFontSize: 'حجم الخط',
      codeFontFamily: 'عائلة الخط',
      lineNumbers: 'إظهار أرقام الأسطر',
      trimEmptyLines: 'إزالة الأسطر الفارغة البادئة واللاحقة',
      writing: 'سلوك الكتابة:',
      autoPairBracket: 'إغلاق الأقواس تلقائياً عند الكتابة',
      autoPairMarkdown: 'إكمال بناء جملة ماركداون تلقائياً',
      autoPairQuote: 'إغلاق علامات الاقتباس تلقائياً',
      fileRepresentation: 'تمثيل الملف:',
      tabWidth: 'عرض علامة التبويب المفضل',
      lineSeparator: 'نوع فاصل الأسطر',
      encoding: 'الترميز الافتراضي',
      detectEncoding: 'الكشف التلقائي عن ترميز الملف',
      trailingNewline: 'معالجة أحرف السطر الجديد اللاحقة',
      misc: 'متفرقات:',
      textDirection: 'اتجاه النص',
      hideInsertHint: 'إخفاء تلميح تحديد نوع الفقرة الجديدة',
      hideLinkPopup: 'إخفاء النافذة المنبثقة عندما يكون المؤشر فوق الرابط',
      autoCheck: 'ما إذا كان سيتم التحقق تلقائياً من أي مهام ذات صلة'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'حول Macaron',
      checkForUpdates: 'التحقق من التحديثات...',
      preferences: 'التفضيلات',
      services: 'الخدمات',
      hide: 'إخفاء Macaron',
      hideOthers: 'إخفاء الأخرى',
      showAll: 'إظهار الكل',
      quit: 'إنهاء Macaron'
    },
    file: {
      root: '&ملف',
      newTab: 'علامة تبويب جديدة',
      newWindow: 'نافذة جديدة',
      openFile: 'فتح ملف...',
      openFolder: 'فتح مجلد...',
      openRecent: 'فتح الأحدث',
      clearRecentlyUsed: 'مسح المستخدمة مؤخراً',
      save: 'حفظ',
      saveAs: 'حفظ باسم...',
      autoSave: 'حفظ تلقائي',
      moveTo: 'نقل إلى...',
      rename: 'إعادة تسمية...',
      import: 'استيراد...',
      export: 'تصدير',
      html: 'HTML',
      pdf: 'PDF',
      print: 'طباعة',
      preferences: 'التفضيلات...',
      closeTab: 'إغلاق علامة التبويب',
      closeWindow: 'إغلاق النافذة',
      quit: 'إنهاء'
    },
    edit: {
      root: '&تحرير',
      simpleRoot: 'تحرير',
      undo: 'تراجع',
      redo: 'إعادة',
      cut: 'قص',
      copy: 'نسخ',
      paste: 'لصق',
      copyAsMarkdown: 'نسخ كماركداون',
      copyAsHtml: 'نسخ كـ HTML',
      pasteAsPlainText: 'لصق كنص عادي',
      selectAll: 'تحديد الكل',
      duplicate: 'تكرار',
      createParagraph: 'إنشاء فقرة',
      deleteParagraph: 'حذف فقرة',
      find: 'بحث',
      findNext: 'بحث عن التالي',
      findPrevious: 'بحث عن السابق',
      replace: 'استبدال',
      findInFolder: 'البحث في المجلد',
      screenshot: 'لقطة شاشة',
      lineEnding: 'نهاية السطر',
      lineEndingCrlf: 'إرجاع المؤشر وتغذية السطر (CRLF)',
      lineEndingLf: 'تغذية السطر (LF)'
    },
    paragraph: {
      root: '&فقرة',
      heading1: 'عنوان 1',
      heading2: 'عنوان 2',
      heading3: 'عنوان 3',
      heading4: 'عنوان 4',
      heading5: 'عنوان 5',
      heading6: 'عنوان 6',
      promoteHeading: 'ترقية العنوان',
      demoteHeading: 'تنزيل العنوان',
      table: 'جدول',
      codeFences: 'أسوار الكود',
      quoteBlock: 'كتلة اقتباس',
      mathBlock: 'كتلة رياضيات',
      htmlBlock: 'كتلة HTML',
      orderedList: 'قائمة مرقمة',
      bulletList: 'قائمة نقطية',
      taskList: 'قائمة مهام',
      looseListItem: 'عنصر قائمة مفكك',
      paragraph: 'فقرة',
      horizontalRule: 'مسطرة أفقية',
      frontMatter: 'المقدمة'
    },
    format: {
      root: 'تن&سيق',
      bold: 'غامق',
      italic: 'مائل',
      underline: 'تحته خط',
      superscript: 'حرف علوي',
      subscript: 'حرف سفلي',
      highlight: 'تمييز',
      inlineCode: 'كود مضمّن',
      inlineMath: 'رياضيات مضمّنة',
      strikethrough: 'يتوسطه خط',
      hyperlink: 'ارتباط تشعبي',
      image: 'صورة',
      clearFormatting: 'مسح التنسيق'
    },
    theme: {
      root: '&السمة',
      light: 'Cadmium Light',
      dark: 'داكن',
      graphite: 'Graphite Light',
      materialDark: 'Material Dark',
      oneDark: 'One Dark',
      ulysses: 'Ulysses Light'
    },
    view: {
      root: '&عرض',
      commandPalette: 'لوحة الأوامر...',
      sourceCodeMode: 'وضع الكود المصدري',
      typewriterMode: 'وضع الآلة الكاتبة',
      focusMode: 'وضع التركيز',
      showSidebar: 'إظهار الشريط الجانبي',
      showTabBar: 'إظهار شريط علامات التبويب',
      toggleToc: 'تبديل جدول المحتويات',
      reloadImages: 'إعادة تحميل الصور',
      showDevTools: 'إظهار أدوات المطور',
      reloadWindow: 'إعادة تحميل النافذة'
    },
    window: {
      root: '&نافذة',
      minimize: 'تصغير',
      alwaysOnTop: 'دائماً في الأعلى',
      zoomIn: 'تكبير',
      zoomOut: 'تصغير',
      showInFullScreen: 'إظهار بملء الشاشة',
      bringAllToFront: 'إحضار الكل إلى الأمام'
    },
    help: {
      root: '&مساعدة',
      quickStart: 'البدء السريع...',
      markdownReference: 'مرجع ماركداون...',
      changelog: 'سجل التغييرات...',
      donate: 'تبرع عبر Open Collective...',
      feedbackViaTwitter: 'ملاحظات عبر تويتر...',
      reportIssue: 'الإبلاغ عن مشكلة أو طلب ميزة...',
      website: 'الموقع الإلكتروني...',
      watchOnGitHub: 'مشاهدة على GitHub...',
      followOnGitHub: 'تابعنا على GitHub...',
      followOnTwitter: 'تابعنا على تويتر...',
      license: 'الترخيص...',
      checkForUpdates: 'التحقق من التحديثات...',
      about: 'حول Macaron...'
    },
    dock: {
      open: 'فتح...',
      clearRecent: 'مسح الأحدث'
    }
  }
}
