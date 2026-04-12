export default {
  app: {
    preferences: 'Preferencias',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: 'Buscar preferencias',
    categories: {
      general: 'General',
      editor: 'Editor',
      markdown: 'Markdown',
      spelling: 'Ortografía',
      theme: 'Tema',
      image: 'Imagen',
      keybindings: 'Atajos de teclado'
    },
    general: {
      title: 'General',
      autoSave: 'Guardado automático',
      autoSaveDescription: 'Guardar cambios del documento automáticamente',
      autoSaveDelayDescription: 'Retraso tras la edición del documento antes de guardar automáticamente',
      window: 'Ventana',
      titleBarStyle: 'Estilo de barra de título',
      requiresRestart: 'Requiere reinicio.',
      hideScrollbars: 'Ocultar barras de desplazamiento',
      openFilesInNewWindow: 'Abrir archivos en ventana nueva',
      openFoldersInNewWindow: 'Abrir carpetas en ventana nueva',
      zoom: 'Zoom',
      sidebar: 'Barra lateral',
      wrapTextInToc: 'Ajustar texto en tabla de contenidos',
      sortFieldForFilesInOpenFolders: 'Campo de ordenación para archivos en carpetas abiertas',
      startupAction: 'Acción al iniciar',
      openDefaultDirectory: 'Abrir directorio predeterminado',
      selectFolder: 'Seleccionar carpeta',
      openBlankPage: 'Abrir página en blanco',
      misc: 'Varios',
      userInterfaceLanguage: 'Idioma de la interfaz de usuario'
    },
    options: {
      titleBarStyle: {
        custom: 'Personalizado',
        native: 'Nativo'
      },
      fileSortBy: {
        created: 'Fecha de creación',
        modified: 'Fecha de modificación',
        title: 'Título'
      },
      language: {
        system: 'Seguir sistema',
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
    toggleSidebar: 'Alternar barra lateral',
    sourceCodeMode: 'Modo código fuente',
    spellcheck: 'Alternar corrección ortográfica',
    systemDefault: 'Predeterminado del sistema',
    spellcheckLanguage: 'Idioma de corrección ortográfica',
    wordCount: 'Conteo de palabras',
    words: 'Palabras',
    characters: 'Caracteres',
    paragraphs: 'Párrafos',
    allCharacters: 'Todos los caracteres'
  },
  search: {
    replacementPlaceholder: 'Reemplazo',
    caseSensitive: 'Distinguir mayúsculas',
    wholeWord: 'Seleccionar palabra completa',
    regex: 'Usar consulta como expresión regular',
    replaceAll: 'Reemplazar todo',
    replaceSingle: 'Reemplazar uno',
    invalidRegex: 'Expresión regular inválida: /{value}/.',
    regexMatchesEmpty: 'RegExp: /{value}/ coincide con cadena vacía.'
  },
  titleBar: {
    words: 'Palabras',
    characters: 'Caracteres',
    paragraphs: 'Párrafos',
    stats: {
      word: {
        short: 'P',
        full: 'palabra'
      },
      character: {
        short: 'C',
        full: 'carácter'
      },
      paragraph: {
        short: 'P',
        full: 'párrafo'
      },
      all: {
        short: 'T',
        full: 'carácter (con espacio)'
      }
    }
  },
  commandPalette: {
    placeholder: 'Escriba un comando para ejecutar'
  },
  sideBar: {
    tableOfContents: 'Tabla de contenidos'
  },
  exportDialog: {
    title: 'Opciones de exportación',
    overviewEyebrow: 'Configuración de exportación',
    htmlEyebrow: 'Configuración de exportación HTML',
    printableSubtitle: 'Ajuste el diseño de página, la apariencia, el encabezado y pie de página y la tabla de contenidos antes de exportar el documento.',
    htmlSubtitle: 'Ajuste el título, la apariencia y la tabla de contenidos antes de exportar el documento.',
    footerPrintable: 'Revise la configuración anterior y exporte cuando todo esté listo.',
    footerHtml: 'Revise la configuración anterior y exporte su archivo HTML cuando todo esté listo.',
    tabs: {
      info: 'Info',
      page: 'Página',
      style: 'Estilo',
      theme: 'Tema',
      header: 'Encabezado y pie',
      toc: 'Tabla de contenidos'
    },
    infoText: 'Personalice la apariencia de la página y haga clic en "exportar" para continuar.',
    pageTitle: 'Título de página:',
    pageSize: 'Tamaño de página:',
    widthHeightMm: 'Ancho/Alto en mm:',
    landscape: 'Orientación horizontal:',
    pageMargin: 'Margen de página en mm:',
    topBottom: 'Superior/Inferior:',
    leftRight: 'Izquierda/Derecha:',
    overwriteFontSettings: 'Sobrescribir configuración de fuente del tema:',
    fontFamily: 'Familia de fuente:',
    fontSize: 'Tamaño de fuente',
    lineHeight: 'Altura de línea',
    autoNumberingHeadings: 'Numeración automática de encabezados:',
    showFrontMatter: 'Mostrar front matter:',
    themeText: 'Puede cambiar la apariencia del documento eligiendo un tema o crear uno personalizado.',
    theme: 'Tema:',
    headerFooterText: 'El texto aparece en todas las páginas si se define encabezado y/o pie de página.',
    headerType: 'Tipo de encabezado:',
    leftHeaderText: 'Texto de encabezado izquierdo:',
    mainHeaderText: 'Texto de encabezado principal:',
    rightHeaderText: 'Texto de encabezado derecho:',
    footerType: 'Tipo de pie de página:',
    leftFooterText: 'Texto de pie de página izquierdo:',
    mainFooterText: 'Texto de pie de página principal:',
    rightFooterText: 'Texto de pie de página derecho:',
    customizeStyle: 'Personalizar estilo:',
    allowStyledHeaderFooter: 'Permitir encabezado y pie de página con estilo:',
    headerFooterFontSize: 'Tamaño de fuente de encabezado y pie de página',
    includeTopHeading: 'Incluir encabezado superior:',
    includeTopHeadingDetail: 'Incluye también el primer nivel de encabezado.',
    tocTitle: 'Título:',
    export: 'Exportar...',
    sections: {
      htmlDocument: 'Documento HTML',
      htmlDocumentDescription: 'Configure el título usado para el documento HTML exportado.',
      pageSetup: 'Configuración de página',
      pageSetupDescription: 'Elija el tamaño de papel y la orientación para el PDF exportado.',
      margins: 'Márgenes',
      marginsDescription: 'Defina los márgenes aplicados al imprimir y exportar a PDF.',
      width: 'Ancho',
      height: 'Alto',
      marginTop: 'Margen superior',
      marginBottom: 'Margen inferior',
      marginLeft: 'Margen izquierdo',
      marginRight: 'Margen derecho',
      typography: 'Tipografía',
      typographyDescription: 'Sobrescriba la fuente y la composición tipográfica usadas en la exportación.',
      documentDetails: 'Detalles del documento',
      documentDetailsDescription: 'Elija si desea incluir información estructural adicional en la exportación.',
      theme: 'Tema',
      header: 'Encabezado',
      footer: 'Pie de página',
      footerDescription: 'Elija el diseño del pie y personalice el texto visible.',
      headerFooterStyle: 'Estilo de encabezado y pie',
      headerFooterStyleDescription: 'Personalice la tipografía usada en el área impresa de encabezado y pie.',
      toc: 'Tabla de contenidos',
      tocDescription: 'Controle el título generado y el rango de encabezados incluidos en la tabla de contenidos.'
    },
    option: {
      custom: 'Personalizado',
      none: 'Ninguno',
      singleCell: 'Celda única',
      threeCells: 'Tres celdas',
      default: 'Predeterminado',
      simple: 'Simple',
      styled: 'Con estilo'
    }
  },
  notification: {
    information: 'Información',
    defaultMessage: 'Nunca debería ver este mensaje',
    spelling: 'Ortografía',
    spellcheckerDisabled: 'No se puede cambiar el idioma porque el corrector ortográfico está deshabilitado.'
  },
  editor: {
    insertTable: {
      title: 'Insertar tabla',
      rows: 'Filas',
      columns: 'Columnas',
      cancel: 'Cancelar',
      ok: 'Aceptar'
    },
    contextMenu: {
      tabs: {
        close: 'Cerrar',
        closeOthers: 'Cerrar otros',
        closeSavedTabs: 'Cerrar pestañas guardadas',
        closeAllTabs: 'Cerrar todas las pestañas',
        rename: 'Renombrar',
        copyPath: 'Copiar ruta',
        showInFolder: 'Mostrar en carpeta'
      },
      sideBar: {
        newFile: 'Archivo nuevo',
        newDirectory: 'Directorio nuevo',
        copy: 'Copiar',
        cut: 'Cortar',
        paste: 'Pegar',
        rename: 'Renombrar',
        moveToTrash: 'Mover a la papelera',
        showInFolder: 'Mostrar en carpeta'
      },
      tree: {
        openedFiles: 'Archivos abiertos',
        saveAll: 'Guardar todo',
        closeAll: 'Cerrar todo',
        emptyProject: 'Proyecto vacío',
        createFile: 'Crear archivo',
        openFolder: 'Abrir carpeta'
      }
    },
    notification: {
      ok: 'Aceptar'
    },
    imageUpload: {
      title: 'Subir imagen',
      uploadFailed: 'Error al subir, la imagen se copiará a la carpeta de imágenes',
      sizeExceeded: 'No se puede subir una imagen de más de 5M, la imagen se copiará a la carpeta de imágenes',
      noUploader: 'No se proporcionó cargador de imágenes.',
      copyDeletionUrl: 'Haga clic para copiar la URL de eliminación de la imagen subida al portapapeles ({url}).'
    },
    frontMenu: {
      duplicate: 'Duplicar',
      turnInto: 'Convertir en',
      newParagraph: 'Párrafo nuevo',
      delete: 'Eliminar'
    },
    quickInsert: {
      basicBlock: 'Bloque básico',
      header: 'Encabezado',
      advancedBlock: 'Bloque avanzado',
      listBlock: 'Bloque de lista',
      diagram: 'Diagrama',
      paragraph: 'Párrafo',
      horizontalLine: 'Línea horizontal',
      frontMatter: 'Front Matter',
      header1: 'Encabezado 1',
      header2: 'Encabezado 2',
      header3: 'Encabezado 3',
      header4: 'Encabezado 4',
      header5: 'Encabezado 5',
      header6: 'Encabezado 6',
      tableBlock: 'Bloque de tabla',
      displayMath: 'Bloque matemático',
      htmlBlock: 'Bloque HTML',
      codeBlock: 'Bloque de código',
      quoteBlock: 'Bloque de cita',
      orderList: 'Lista ordenada',
      bulletList: 'Lista con viñetas',
      todoList: 'Lista de tareas',
      vegaChart: 'Gráfico Vega',
      flowChart: 'Diagrama de flujo',
      sequenceDiagram: 'Diagrama de secuencia',
      plantuml: 'Diagrama PlantUML',
      mermaid: 'Mermaid',
      typeToInsert: "Escriba {'@'} para insertar"
    }
  },
  fileOperation: {
    newFile: 'Archivo nuevo',
    untitled: 'Sin título {id}',
    import: {
      title: 'Importar o abrir',
      dropHere: 'Suelte aquí para importar sus archivos a Macaron'
    },
    export: {
      successTitle: 'Exportado exitosamente',
      successMessage: '¡Se exportó "{filename}" exitosamente!',
      failTitle: 'Error al imprimir/exportar',
      failMessage: 'Error al imprimir/exportar {filename}'
    }
  },
  recent: {
    welcome: 'Bienvenido a Macaron',
    newFile: 'Archivo nuevo',
    openFile: 'Abrir archivo',
    openFolder: 'Abrir carpeta'
  },
  about: {
    appName: 'Macaron',
    copyright: 'Copyright © 2017-{year} Luo Ran',
    copyrightContributors: 'Copyright © 2018-{year} Colaboradores de Macaron'
  },
  update: {
    title: 'Actualización',
    notAvailable: 'Actualización no disponible',
    downloaded: 'Actualización descargada',
    available: 'Actualización disponible'
  },
  searchFolder: {
    placeholder: 'Buscar en carpeta...',
    noFolderOpen: 'Ninguna carpeta abierta',
    noResults: 'No se encontraron resultados.',
    cancel: 'Cancelar',
    openFolder: 'Abrir carpeta'
  },
  preferences: {
    keybindings: {
      title: 'Atajos de teclado',
      description: 'Personalice los atajos de Macaron y haga clic en el botón guardar para aplicar todos los cambios (requiere reinicio). Todos los atajos disponibles y predeterminados se pueden encontrar {link}.',
      onlineLink: 'en línea',
      columnDescription: 'Descripción',
      columnKeyCombination: 'Combinación de teclas',
      columnOptions: 'Opciones',
      buttonEdit: 'Editar',
      buttonReset: 'Restablecer',
      buttonUnbind: 'Desvincular',
      buttonSave: 'Guardar',
      buttonRestoreDefaults: 'Restaurar atajos predeterminados',
      saveFailedTitle: 'Error al guardar',
      saveFailedMessage: 'Ocurrió un error inesperado al guardar.',
      keyInputDialog: {
        placeholder: 'Presione una combinación de teclas',
        hint: 'Presione Enter para continuar o ESC para salir.',
        invalidKey: '¡La combinación de teclas actual no se puede vincular!'
      },
      shortcutInUseTitle: 'Atajo ya en uso',
      shortcutInUseMessage: 'El atajo "{accelerator}" ya está en uso. Por favor, desconfigure el atajo e intente de nuevo.'
    },
    spellchecker: {
      title: 'Ortografía',
      enableSpellcheck: 'Habilitar corrección ortográfica',
      hideMarks: 'Ocultar marcas de errores ortográficos',
      autoDetectLanguage: 'Detectar idioma del documento automáticamente',
      defaultLanguage: 'Idioma predeterminado para corrección ortográfica',
      macOSInfo: 'El idioma usado se detectará automáticamente mientras escribe. Se pueden agregar idiomas adicionales a través de "Idioma y Región" en el panel de preferencias del sistema.',
      customDictionary: 'Diccionario personalizado:',
      customDictionaryDesc: 'Editar palabras en el diccionario personalizado.',
      columnWord: 'Palabra',
      columnOptions: 'Opciones',
      buttonDelete: 'Eliminar',
      noWords: 'No hay palabras disponibles',
      switchLanguageFailed: 'Error al cambiar idioma',
      removeWordFailed: 'Error al eliminar palabra personalizada',
      removeWordFailedMessage: 'Ocurrió un error inesperado al guardar.'
    },
    image: {
      title: 'Imagen',
      insertActionDesc: 'Acción predeterminada después de insertar una imagen desde carpeta local o portapapeles',
      clipboardHint: 'El manejo del portapapeles solo es totalmente compatible en macOS y Windows.',
      actionUpload: 'Subir imagen a la nube usando el cargador seleccionado (debe configurarse abajo)',
      actionFolder: 'Copiar imagen al directorio de assets relativo o carpeta local global designada',
      actionPath: 'Mantener ubicación original',
      folder: {
        globalOrRelative: 'Carpeta de imágenes global o relativa',
        globalFolder: 'Carpeta de imágenes global',
        open: 'Abrir...',
        showInFolder: 'Mostrar en carpeta',
        preferRelative: 'Preferir carpeta de assets relativa',
        relativeName: 'Nombre de carpeta de imágenes relativa',
        footnotePrefix: 'Incluya ',
        footnoteSuffix: ' en el cuadro de texto de arriba para insertar automáticamente el nombre del archivo del documento.'
      },
      uploader: {
        title: 'Cargador',
        currentUploader: 'El cargador de imágenes actual es {name}.',
        noUploader: 'Actualmente no hay ningún cargador seleccionado. Por favor, seleccione un cargador y configúrelo.',
        saveConfigTitle: 'Guardar configuración',
        githubSaved: 'La configuración de Github ha sido guardada.',
        scriptSaved: 'La configuración del script de línea de comandos ha sido guardada',
        githubWarning: 'Github será eliminado en una versión futura, por favor use picgo',
        picgoNotInstalled: 'Su sistema no tiene {link} instalado, por favor instálelo antes de usar.',
        picgoLink: 'picgo',
        githubToken: 'Token de GitHub:',
        githubTokenHint: 'El token se guarda mediante Keychain en macOS, Secret Service API/libsecret en Linux y Credential Vault en Windows',
        tokenPlaceholder: 'Ingresar token',
        ownerPlaceholder: 'propietario',
        repoPlaceholder: 'repositorio',
        branchPlaceholder: 'rama',
        ownerName: 'Nombre del propietario:',
        repoName: 'Nombre del repositorio:',
        branchName: 'Nombre de la rama (opcional):',
        scriptLocation: 'Ubicación del script de shell:',
        scriptPathPlaceholder: 'Ruta absoluta del script',
        scriptDesc: 'El script se ejecutará con la ruta del archivo de imagen como su único argumento y debería devolver cualquier valor válido para el',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'Tema',
      autoSwitch: 'Ajustar automáticamente el tema de la aplicación según la configuración del sistema',
      openFolder: 'Abrir la carpeta de temas',
      openFolderButton: 'Abrir carpeta',
      importTheme: 'Importar temas personalizados',
      importButton: 'Importar tema'
    },
    markdown: {
      title: 'Markdown',
      lists: 'Listas:',
      preferLooseList: 'Preferir elementos de lista sueltos',
      bulletMarker: 'Marcador preferido para listas con viñetas',
      orderDelimiter: 'Marcador preferido para listas ordenadas',
      listIndentation: 'Sangría preferida para listas',
      extensions: 'Extensiones de Markdown:',
      frontmatter: 'Formato de front matter',
      superSubScript: 'Habilitar superíndice y subíndice estilo Pandoc',
      footnotes: 'Habilitar notas al pie estilo Pandoc',
      footnotesNote: 'Requiere reinicio.',
      compatibility: 'Compatibilidad:',
      enableHtml: 'Habilitar renderizado HTML',
      gitlabCompat: 'Habilitar modo de compatibilidad GitLab',
      diagrams: 'Diagramas:',
      sequenceTheme: 'Tema de diagrama de secuencia',
      misc: 'Varios:',
      headingStyle: 'Estilo de encabezado preferido'
    },
    editor: {
      title: 'Editor',
      textEditor: 'Configuración del editor de texto:',
      fontSize: 'Tamaño de fuente',
      lineHeight: 'Altura de línea',
      fontFamily: 'Familia de fuente',
      maxWidth: 'Ancho máximo del editor de texto',
      maxWidthNote: "Dejar vacío para el valor predeterminado del tema, de lo contrario usar número con sufijo de unidad, que puede ser 'ch' para caracteres, 'px' para píxeles, o '%' para porcentaje.",
      codeBlock: 'Configuración de bloque de código:',
      codeFontSize: 'Tamaño de fuente',
      codeFontFamily: 'Familia de fuente',
      lineNumbers: 'Mostrar números de línea',
      trimEmptyLines: 'Eliminar líneas vacías al inicio y al final',
      writing: 'Comportamiento de escritura:',
      autoPairBracket: 'Cerrar automáticamente paréntesis al escribir',
      autoPairMarkdown: 'Completar automáticamente sintaxis markdown',
      autoPairQuote: 'Cerrar automáticamente comillas',
      fileRepresentation: 'Representación de archivo:',
      tabWidth: 'Ancho de tabulación preferido',
      lineSeparator: 'Tipo de separador de línea',
      encoding: 'Codificación predeterminada',
      detectEncoding: 'Detectar automáticamente la codificación del archivo',
      trailingNewline: 'Manejo de caracteres de nueva línea finales',
      misc: 'Varios:',
      textDirection: 'Dirección del texto',
      textDirectionLTR: 'De izquierda a derecha',
      textDirectionRTL: 'De derecha a izquierda',
      endOfLineDefault: 'Predeterminado',
      endOfLineCRLF: 'Retorno de carro y salto de línea (CRLF)',
      endOfLineLF: 'Salto de línea (LF)',
      trailingNewlineTrimAll: 'Eliminar todos los saltos de línea finales',
      trailingNewlineEnsureOne: 'Asegurar exactamente un salto de línea final',
      trailingNewlinePreserve: 'Conservar el estilo del documento original',
      trailingNewlineNone: 'No hacer nada',
      hideInsertHint: 'Ocultar sugerencia para seleccionar tipo de nuevo párrafo',
      hideLinkPopup: 'Ocultar ventana emergente cuando el cursor está sobre un enlace',
      autoCheck: 'Si verificar automáticamente cualquier tarea relacionada'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'Acerca de Macaron',
      checkForUpdates: 'Buscar actualizaciones...',
      preferences: 'Preferencias',
      services: 'Servicios',
      hide: 'Ocultar Macaron',
      hideOthers: 'Ocultar otros',
      showAll: 'Mostrar todo',
      quit: 'Salir de Macaron'
    },
    file: {
      root: '&Archivo',
      newTab: 'Nueva pestaña',
      newWindow: 'Nueva ventana',
      openFile: 'Abrir archivo...',
      openFolder: 'Abrir carpeta...',
      openRecent: 'Abrir reciente',
      clearRecentlyUsed: 'Limpiar usados recientemente',
      save: 'Guardar',
      saveAs: 'Guardar como...',
      autoSave: 'Guardado automático',
      moveTo: 'Mover a...',
      rename: 'Renombrar...',
      import: 'Importar...',
      export: 'Exportar',
      html: 'HTML',
      pdf: 'PDF',
      print: 'Imprimir',
      preferences: 'Preferencias...',
      closeTab: 'Cerrar pestaña',
      closeWindow: 'Cerrar ventana',
      quit: 'Salir'
    },
    edit: {
      root: '&Editar',
      simpleRoot: 'Editar',
      undo: 'Deshacer',
      redo: 'Rehacer',
      cut: 'Cortar',
      copy: 'Copiar',
      paste: 'Pegar',
      copyAsMarkdown: 'Copiar como Markdown',
      copyAsHtml: 'Copiar como HTML',
      pasteAsPlainText: 'Pegar como texto plano',
      selectAll: 'Seleccionar todo',
      duplicate: 'Duplicar',
      createParagraph: 'Crear párrafo',
      deleteParagraph: 'Eliminar párrafo',
      find: 'Buscar',
      findNext: 'Buscar siguiente',
      findPrevious: 'Buscar anterior',
      replace: 'Reemplazar',
      findInFolder: 'Buscar en carpeta',
      screenshot: 'Captura de pantalla',
      lineEnding: 'Final de línea',
      lineEndingCrlf: 'Retorno de carro y avance de línea (CRLF)',
      lineEndingLf: 'Avance de línea (LF)'
    },
    paragraph: {
      root: '&Párrafo',
      heading1: 'Encabezado 1',
      heading2: 'Encabezado 2',
      heading3: 'Encabezado 3',
      heading4: 'Encabezado 4',
      heading5: 'Encabezado 5',
      heading6: 'Encabezado 6',
      promoteHeading: 'Promover encabezado',
      demoteHeading: 'Degradar encabezado',
      table: 'Tabla',
      codeFences: 'Bloque de código',
      quoteBlock: 'Bloque de cita',
      mathBlock: 'Bloque matemático',
      htmlBlock: 'Bloque HTML',
      orderedList: 'Lista ordenada',
      bulletList: 'Lista con viñetas',
      taskList: 'Lista de tareas',
      looseListItem: 'Elemento de lista suelto',
      paragraph: 'Párrafo',
      horizontalRule: 'Regla horizontal',
      frontMatter: 'Front Matter'
    },
    format: {
      root: 'F&ormato',
      bold: 'Negrita',
      italic: 'Cursiva',
      underline: 'Subrayado',
      superscript: 'Superíndice',
      subscript: 'Subíndice',
      highlight: 'Resaltado',
      inlineCode: 'Código en línea',
      inlineMath: 'Matemática en línea',
      strikethrough: 'Tachado',
      hyperlink: 'Hipervínculo',
      image: 'Imagen',
      clearFormatting: 'Limpiar formato'
    },
    theme: {
      root: '&Tema',
      light: 'Cadmium Light',
      dark: 'Dark',
      graphite: 'Graphite Light',
      materialDark: 'Material Dark',
      oneDark: 'One Dark',
      ulysses: 'Ulysses Light'
    },
    view: {
      root: '&Ver',
      commandPalette: 'Paleta de comandos...',
      sourceCodeMode: 'Modo código fuente',
      typewriterMode: 'Modo máquina de escribir',
      focusMode: 'Modo enfoque',
      showSidebar: 'Mostrar barra lateral',
      showTabBar: 'Mostrar barra de pestañas',
      showTitleBar: 'Mostrar barra de título',
      toggleToc: 'Alternar tabla de contenidos',
      reloadImages: 'Recargar imágenes',
      showDevTools: 'Mostrar herramientas de desarrollador',
      reloadWindow: 'Recargar ventana'
    },
    window: {
      root: '&Ventana',
      minimize: 'Minimizar',
      alwaysOnTop: 'Siempre encima',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      showInFullScreen: 'Mostrar en pantalla completa',
      bringAllToFront: 'Traer todo al frente'
    },
    help: {
      root: 'A&yuda',
      quickStart: 'Inicio rápido...',
      markdownReference: 'Referencia de Markdown...',
      changelog: 'Registro de cambios...',
      donate: 'Donar a través de Open Collective...',
      feedbackViaTwitter: 'Comentarios por Twitter...',
      reportIssue: 'Reportar problema o solicitar función...',
      website: 'Sitio web...',
      watchOnGitHub: 'Ver en GitHub...',
      followOnGitHub: 'Síguenos en GitHub...',
      followOnTwitter: 'Síguenos en Twitter...',
      license: 'Licencia...',
      checkForUpdates: 'Buscar actualizaciones...',
      about: 'Acerca de Macaron...'
    },
    dock: {
      open: 'Abrir...',
      clearRecent: 'Limpiar recientes'
    }
  }
}
