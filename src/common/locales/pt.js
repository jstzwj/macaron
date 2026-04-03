export default {
  app: {
    preferences: 'Preferências',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: 'Buscar preferências',
    categories: {
      general: 'Geral',
      editor: 'Editor',
      markdown: 'Markdown',
      spelling: 'Ortografia',
      theme: 'Tema',
      image: 'Imagem',
      keybindings: 'Atalhos de Teclado'
    },
    general: {
      title: 'Geral',
      autoSave: 'Salvamento Automático',
      autoSaveDescription: 'Salvar alterações do documento automaticamente',
      autoSaveDelayDescription: 'Atraso após edição do documento antes de salvar automaticamente',
      window: 'Janela',
      titleBarStyle: 'Estilo da barra de título',
      requiresRestart: 'Requer reinicialização.',
      hideScrollbars: 'Ocultar barras de rolagem',
      openFilesInNewWindow: 'Abrir arquivos em nova janela',
      openFoldersInNewWindow: 'Abrir pastas em nova janela',
      zoom: 'Zoom',
      sidebar: 'Barra lateral',
      wrapTextInToc: 'Quebrar texto no índice',
      sortFieldForFilesInOpenFolders: 'Campo de ordenação para arquivos em pastas abertas',
      startupAction: 'Ação ao iniciar',
      openDefaultDirectory: 'Abrir o diretório padrão',
      selectFolder: 'Selecionar Pasta',
      openBlankPage: 'Abrir uma página em branco',
      misc: 'Diversos',
      userInterfaceLanguage: 'Idioma da interface do usuário'
    },
    options: {
      titleBarStyle: {
        custom: 'Personalizado',
        native: 'Nativo'
      },
      fileSortBy: {
        created: 'Tempo de criação',
        modified: 'Tempo de modificação',
        title: 'Título'
      },
      language: {
        system: 'Seguir sistema',
        en: 'English',
        'zh-CN': '简体中文'
      }
    }
  },
  search: {
    placeholder: 'Buscar',
    replacementPlaceholder: 'Substituição',
    caseSensitive: 'Diferenciar maiúsculas/minúsculas',
    wholeWord: 'Selecionar palavra inteira',
    regex: 'Usar consulta como expressão regular',
    replaceAll: 'Substituir Tudo',
    replaceSingle: 'Substituir Individual',
    invalidRegex: 'Expressão regular inválida: /{value}/.',
    regexMatchesEmpty: 'RegExp: /{value}/ corresponde a string vazia.'
  },
  titleBar: {
    words: 'Palavras',
    characters: 'Caracteres',
    paragraphs: 'Parágrafos',
    stats: {
      word: {
        short: 'P',
        full: 'palavra'
      },
      character: {
        short: 'C',
        full: 'caractere'
      },
      paragraph: {
        short: 'G',
        full: 'parágrafo'
      },
      all: {
        short: 'T',
        full: '(com espaço)caractere'
      }
    }
  },
  commandPalette: {
    placeholder: 'Digite um comando para executar'
  },
  exportDialog: {
    title: 'Opções de Exportação',
    tabs: {
      info: 'Info',
      page: 'Página',
      style: 'Estilo',
      theme: 'Tema',
      header: 'Cabeçalho e Rodapé',
      toc: 'Índice'
    },
    infoText: 'Personalize a aparência da página e clique em "exportar" para continuar.',
    pageTitle: 'O título da página:',
    pageSize: 'Tamanho da página:',
    widthHeightMm: 'Largura/Altura em mm:',
    landscape: 'Orientação paisagem:',
    pageMargin: 'Margem da página em mm:',
    topBottom: 'Superior/Inferior:',
    leftRight: 'Esquerda/Direita:',
    overwriteFontSettings: 'Sobrescrever configurações de fonte do tema:',
    fontFamily: 'Família da fonte:',
    fontSize: 'Tamanho da fonte',
    lineHeight: 'Altura da linha',
    autoNumberingHeadings: 'Numeração automática de títulos:',
    showFrontMatter: 'Mostrar front matter:',
    themeText: 'Você pode alterar a aparência do documento escolhendo um tema ou criar um personalizado.',
    theme: 'Tema:',
    headerFooterText: 'O texto aparece em todas as páginas se o cabeçalho e/ou rodapé estiver definido.',
    headerType: 'Tipo de cabeçalho:',
    leftHeaderText: 'Texto do cabeçalho esquerdo:',
    mainHeaderText: 'Texto do cabeçalho principal:',
    rightHeaderText: 'Texto do cabeçalho direito:',
    footerType: 'Tipo de rodapé:',
    leftFooterText: 'Texto do rodapé esquerdo:',
    mainFooterText: 'Texto do rodapé principal:',
    rightFooterText: 'Texto do rodapé direito:',
    customizeStyle: 'Personalizar estilo:',
    allowStyledHeaderFooter: 'Permitir cabeçalho e rodapé estilizados:',
    headerFooterFontSize: 'Tamanho da fonte do cabeçalho e rodapé',
    includeTopHeading: 'Incluir título principal:',
    includeTopHeadingDetail: 'Inclui também o primeiro nível de título.',
    tocTitle: 'Título:',
    export: 'Exportar...',
    option: {
      custom: 'Personalizado',
      none: 'Nenhum',
      singleCell: 'Célula única',
      threeCells: 'Três células',
      default: 'Padrão',
      simple: 'Simples',
      styled: 'Estilizado'
    }
  },
  notification: {
    information: 'Informação',
    defaultMessage: 'Você nunca deveria ver esta mensagem',
    spelling: 'Ortografia',
    spellcheckerDisabled: 'Não é possível alterar o idioma porque o verificador ortográfico está desativado.'
  },
  editor: {
    insertTable: {
      title: 'Inserir Tabela',
      rows: 'Linhas',
      columns: 'Colunas',
      cancel: 'Cancelar',
      ok: 'OK'
    },
    contextMenu: {
      tabs: {
        close: 'Fechar',
        closeOthers: 'Fechar outros',
        closeSavedTabs: 'Fechar abas salvas',
        closeAllTabs: 'Fechar todas as abas',
        rename: 'Renomear',
        copyPath: 'Copiar caminho',
        showInFolder: 'Mostrar na pasta'
      },
      sideBar: {
        newFile: 'Novo Arquivo',
        newDirectory: 'Novo Diretório',
        copy: 'Copiar',
        cut: 'Recortar',
        paste: 'Colar',
        rename: 'Renomear',
        moveToTrash: 'Mover para Lixeira',
        showInFolder: 'Mostrar na Pasta'
      }
    },
    notification: {
      ok: 'OK'
    },
    imageUpload: {
      title: 'Enviar Imagem',
      uploadFailed: 'Falha no envio, a imagem será copiada para a pasta de imagens',
      sizeExceeded: 'Não é possível enviar imagem maior que 5M, a imagem será copiada para a pasta de imagens',
      noUploader: 'Nenhum enviador de imagem fornecido.',
      copyDeletionUrl: 'Clique para copiar a URL de exclusão da imagem enviada para a área de transferência ({url}).'
    }
  },
  fileOperation: {
    newFile: 'Novo Arquivo',
    untitled: 'Sem título {id}',
    import: {
      title: 'Importar ou Abrir',
      dropHere: 'Solte aqui para importar seus arquivos para o Macaron'
    },
    export: {
      successTitle: 'Exportado com sucesso',
      successMessage: '"{filename}" exportado com sucesso!',
      failTitle: 'Falha ao Imprimir/Exportar',
      failMessage: 'Falha ao imprimir/exportar {filename}'
    }
  },
  about: {
    appName: 'Macaron',
    copyright: 'Copyright © 2017-{year} Luo Ran',
    copyrightContributors: 'Copyright © 2018-{year} Colaboradores do Macaron'
  },
  update: {
    title: 'Atualização',
    notAvailable: 'Atualização não Disponível',
    downloaded: 'Atualização Baixada',
    available: 'Atualização Disponível'
  },
  searchFolder: {
    placeholder: 'Buscar na pasta...',
    noFolderOpen: 'Nenhuma pasta aberta',
    noResults: 'Nenhum resultado encontrado.',
    cancel: 'Cancelar',
    openFolder: 'Abrir Pasta'
  },
  preferences: {
    keybindings: {
      title: 'Atalhos de Teclado',
      description: 'Personalize os atalhos do Macaron e clique no botão salvar abaixo para aplicar todas as alterações (requer reinicialização). Todos os atalhos disponíveis e padrão podem ser encontrados {link}.',
      onlineLink: 'online',
      columnDescription: 'Descrição',
      columnKeyCombination: 'Combinação de Teclas',
      columnOptions: 'Opções',
      buttonEdit: 'Editar',
      buttonReset: 'Redefinir',
      buttonUnbind: 'Desvincular',
      buttonSave: 'Salvar',
      buttonRestoreDefaults: 'Restaurar atalhos padrão',
      saveFailedTitle: 'Falha ao salvar',
      saveFailedMessage: 'Ocorreu um erro inesperado ao salvar.',
      keyInputDialog: {
        placeholder: 'Pressione uma combinação de teclas',
        hint: 'Pressione Enter para continuar ou ESC para sair.',
        invalidKey: 'A combinação de teclas atual não pode ser vinculada!'
      },
      shortcutInUseTitle: 'Atalho já em uso',
      shortcutInUseMessage: 'O atalho "{accelerator}" já está em uso. Por favor, cancele o atalho e tente novamente.'
    },
    spellchecker: {
      title: 'Ortografia',
      enableSpellcheck: 'Habilitar verificação ortográfica',
      hideMarks: 'Ocultar marcações de erros ortográficos',
      autoDetectLanguage: 'Detectar idioma do documento automaticamente',
      defaultLanguage: 'Idioma padrão para verificação ortográfica',
      macOSInfo: 'O idioma usado será detectado automaticamente durante a digitação. Idiomas adicionais podem ser adicionados através de "Idioma e Região" nas preferências do sistema.',
      customDictionary: 'Dicionário personalizado:',
      customDictionaryDesc: 'Editar palavras no dicionário personalizado.',
      columnWord: 'Palavra',
      columnOptions: 'Opções',
      buttonDelete: 'Excluir',
      noWords: 'Nenhuma palavra disponível',
      switchLanguageFailed: 'Falha ao trocar idioma',
      removeWordFailed: 'Falha ao remover palavra personalizada',
      removeWordFailedMessage: 'Ocorreu um erro inesperado ao salvar.'
    },
    image: {
      title: 'Imagem',
      insertActionDesc: 'Ação padrão após uma imagem ser inserida de uma pasta local ou área de transferência',
      clipboardHint: 'O manuseio da área de transferência é totalmente suportado apenas no macOS e Windows.',
      uploader: {
        title: 'Enviador',
        currentUploader: 'O enviador de imagem atual é {name}.',
        noUploader: 'Atualmente nenhum enviador está selecionado. Por favor, selecione um enviador e configure-o.',
        saveConfigTitle: 'Salvar Configuração',
        githubSaved: 'A configuração do Github foi salva.',
        scriptSaved: 'A configuração do script de linha de comando foi salva',
        githubWarning: 'O Github será removido em uma versão futura, por favor use o picgo',
        picgoNotInstalled: 'Seu sistema não tem o {link} instalado, por favor instale-o antes de usar.',
        picgoLink: 'picgo',
        githubToken: 'Token do GitHub:',
        githubTokenHint: 'O token é salvo pelo Keychain no macOS, Secret Service API/libsecret no Linux e Credential Vault no Windows',
        tokenPlaceholder: 'Inserir token',
        ownerPlaceholder: 'proprietário',
        repoPlaceholder: 'repositório',
        branchPlaceholder: 'branch',
        ownerName: 'Nome do proprietário:',
        repoName: 'Nome do repositório:',
        branchName: 'Nome do branch (opcional):',
        scriptLocation: 'Localização do script shell:',
        scriptPathPlaceholder: 'Caminho absoluto do script',
        scriptDesc: 'O script será executado com o caminho do arquivo de imagem como seu único argumento e deve retornar qualquer valor válido para o',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'Tema',
      autoSwitch: 'Ajustar automaticamente o tema do aplicativo de acordo com as configurações do sistema',
      openFolder: 'Abrir a pasta de temas',
      openFolderButton: 'Abrir Pasta',
      importTheme: 'Importar temas personalizados',
      importButton: 'Importar Tema'
    },
    markdown: {
      title: 'Markdown',
      lists: 'Listas:',
      preferLooseList: 'Preferir itens de lista soltos',
      bulletMarker: 'Marcador preferido para listas com marcadores',
      orderDelimiter: 'Marcador preferido para listas ordenadas',
      listIndentation: 'Recuo preferido para listas',
      extensions: 'Extensões Markdown:',
      frontmatter: 'Formato do front matter',
      superSubScript: 'Habilitar sobrescrito e subscrito no estilo Pandoc',
      footnotes: 'Habilitar notas de rodapé no estilo Pandoc',
      footnotesNote: 'Requer reinicialização.',
      compatibility: 'Compatibilidade:',
      enableHtml: 'Habilitar renderização HTML',
      gitlabCompat: 'Habilitar modo de compatibilidade GitLab',
      diagrams: 'Diagramas:',
      sequenceTheme: 'Tema do diagrama de sequência',
      misc: 'Diversos:',
      headingStyle: 'Estilo de título preferido'
    },
    editor: {
      title: 'Editor',
      textEditor: 'Configurações do editor de texto:',
      fontSize: 'Tamanho da fonte',
      lineHeight: 'Altura da linha',
      fontFamily: 'Família da fonte',
      maxWidth: 'Largura máxima do editor de texto',
      maxWidthNote: "Deixe vazio para o padrão do tema, caso contrário use número com sufixo de unidade, que pode ser 'ch' para caracteres, 'px' para pixels, ou '%' para porcentagem.",
      codeBlock: 'Configurações de bloco de código:',
      codeFontSize: 'Tamanho da fonte',
      codeFontFamily: 'Família da fonte',
      lineNumbers: 'Mostrar números de linha',
      trimEmptyLines: 'Remover linhas vazias no início e no fim',
      writing: 'Comportamento de escrita:',
      autoPairBracket: 'Fechar colchetes automaticamente ao escrever',
      autoPairMarkdown: 'Completar sintaxe markdown automaticamente',
      autoPairQuote: 'Fechar aspas automaticamente',
      fileRepresentation: 'Representação de arquivo:',
      tabWidth: 'Largura preferida da tabulação',
      lineSeparator: 'Tipo de separador de linha',
      encoding: 'Codificação padrão',
      detectEncoding: 'Detectar codificação do arquivo automaticamente',
      trailingNewline: 'Tratamento de caracteres de nova linha no final',
      misc: 'Diversos:',
      textDirection: 'Direção do texto',
      hideInsertHint: 'Ocultar dica para selecionar tipo de novo parágrafo',
      hideLinkPopup: 'Ocultar popup quando o cursor está sobre um link',
      autoCheck: 'Se deve verificar automaticamente quaisquer tarefas relacionadas'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'Sobre o Macaron',
      checkForUpdates: 'Verificar atualizações...',
      preferences: 'Preferências',
      services: 'Serviços',
      hide: 'Ocultar Macaron',
      hideOthers: 'Ocultar Outros',
      showAll: 'Mostrar Tudo',
      quit: 'Sair do Macaron'
    },
    file: {
      root: '&Arquivo',
      newTab: 'Nova Aba',
      newWindow: 'Nova Janela',
      openFile: 'Abrir Arquivo...',
      openFolder: 'Abrir Pasta...',
      openRecent: 'Abrir Recente',
      clearRecentlyUsed: 'Limpar Recentes',
      save: 'Salvar',
      saveAs: 'Salvar Como...',
      autoSave: 'Salvamento Automático',
      moveTo: 'Mover Para...',
      rename: 'Renomear...',
      import: 'Importar...',
      export: 'Exportar',
      html: 'HTML',
      pdf: 'PDF',
      print: 'Imprimir',
      preferences: 'Preferências...',
      closeTab: 'Fechar Aba',
      closeWindow: 'Fechar Janela',
      quit: 'Sair'
    },
    edit: {
      root: '&Editar',
      simpleRoot: 'Editar',
      undo: 'Desfazer',
      redo: 'Refazer',
      cut: 'Recortar',
      copy: 'Copiar',
      paste: 'Colar',
      copyAsMarkdown: 'Copiar como Markdown',
      copyAsHtml: 'Copiar como HTML',
      pasteAsPlainText: 'Colar como Texto Simples',
      selectAll: 'Selecionar Tudo',
      duplicate: 'Duplicar',
      createParagraph: 'Criar Parágrafo',
      deleteParagraph: 'Excluir Parágrafo',
      find: 'Localizar',
      findNext: 'Localizar Próximo',
      findPrevious: 'Localizar Anterior',
      replace: 'Substituir',
      findInFolder: 'Localizar na Pasta',
      screenshot: 'Captura de Tela',
      lineEnding: 'Fim de Linha',
      lineEndingCrlf: 'Retorno de carro e alimentação de linha (CRLF)',
      lineEndingLf: 'Alimentação de linha (LF)'
    },
    paragraph: {
      root: '&Parágrafo',
      heading1: 'Título 1',
      heading2: 'Título 2',
      heading3: 'Título 3',
      heading4: 'Título 4',
      heading5: 'Título 5',
      heading6: 'Título 6',
      promoteHeading: 'Promover Título',
      demoteHeading: 'Rebaixar Título',
      table: 'Tabela',
      codeFences: 'Blocos de Código',
      quoteBlock: 'Bloco de Citação',
      mathBlock: 'Bloco Matemático',
      htmlBlock: 'Bloco HTML',
      orderedList: 'Lista Ordenada',
      bulletList: 'Lista com Marcadores',
      taskList: 'Lista de Tarefas',
      looseListItem: 'Item de Lista Solto',
      paragraph: 'Parágrafo',
      horizontalRule: 'Linha Horizontal',
      frontMatter: 'Front Matter'
    },
    format: {
      root: 'F&ormatar',
      bold: 'Negrito',
      italic: 'Itálico',
      underline: 'Sublinhado',
      superscript: 'Sobrescrito',
      subscript: 'Subscrito',
      highlight: 'Destacar',
      inlineCode: 'Código em Linha',
      inlineMath: 'Matemática em Linha',
      strikethrough: 'Tachado',
      hyperlink: 'Hiperlink',
      image: 'Imagem',
      clearFormatting: 'Limpar Formatação'
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
      root: '&Visualizar',
      commandPalette: 'Paleta de Comandos...',
      sourceCodeMode: 'Modo Código Fonte',
      typewriterMode: 'Modo Máquina de Escrever',
      focusMode: 'Modo Foco',
      showSidebar: 'Mostrar Barra Lateral',
      showTabBar: 'Mostrar Barra de Abas',
      toggleToc: 'Alternar Índice',
      reloadImages: 'Recarregar Imagens',
      showDevTools: 'Mostrar Ferramentas de Desenvolvedor',
      reloadWindow: 'Recarregar janela'
    },
    window: {
      root: '&Janela',
      minimize: 'Minimizar',
      alwaysOnTop: 'Sempre no Topo',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      showInFullScreen: 'Mostrar em Tela Cheia',
      bringAllToFront: 'Trazer Tudo para Frente'
    },
    help: {
      root: 'Aju&da',
      quickStart: 'Início Rápido...',
      markdownReference: 'Referência Markdown...',
      changelog: 'Registro de Alterações...',
      donate: 'Doar via Open Collective...',
      feedbackViaTwitter: 'Feedback via Twitter...',
      reportIssue: 'Relatar Problema ou Solicitar Recurso...',
      website: 'Site...',
      watchOnGitHub: 'Acompanhar no GitHub...',
      followOnGitHub: 'Siga-nos no Github...',
      followOnTwitter: 'Siga-nos no Twitter...',
      license: 'Licença...',
      checkForUpdates: 'Verificar atualizações...',
      about: 'Sobre o Macaron...'
    },
    dock: {
      open: 'Abrir...',
      clearRecent: 'Limpar Recentes'
    }
  }
}
