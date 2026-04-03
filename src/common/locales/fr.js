export default {
  app: {
    preferences: 'Préférences',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: 'Rechercher dans les préférences',
    categories: {
      general: 'Général',
      editor: 'Éditeur',
      markdown: 'Markdown',
      spelling: 'Orthographe',
      theme: 'Thème',
      image: 'Image',
      keybindings: 'Raccourcis clavier'
    },
    general: {
      title: 'Général',
      autoSave: 'Enregistrement automatique',
      autoSaveDescription: 'Enregistrer automatiquement les modifications du document',
      autoSaveDelayDescription: 'Délai avant l\'enregistrement automatique après une modification du document',
      window: 'Fenêtre',
      titleBarStyle: 'Style de la barre de titre',
      requiresRestart: 'Nécessite un redémarrage.',
      hideScrollbars: 'Masquer les barres de défilement',
      openFilesInNewWindow: 'Ouvrir les fichiers dans une nouvelle fenêtre',
      openFoldersInNewWindow: 'Ouvrir les dossiers dans une nouvelle fenêtre',
      zoom: 'Zoom',
      sidebar: 'Barre latérale',
      wrapTextInToc: 'Retour à la ligne dans la table des matières',
      sortFieldForFilesInOpenFolders: 'Champ de tri pour les fichiers dans les dossiers ouverts',
      startupAction: 'Action au démarrage',
      openDefaultDirectory: 'Ouvrir le répertoire par défaut',
      selectFolder: 'Sélectionner un dossier',
      openBlankPage: 'Ouvrir une page vide',
      misc: 'Divers',
      userInterfaceLanguage: 'Langue de l\'interface utilisateur'
    },
    options: {
      titleBarStyle: {
        custom: 'Personnalisé',
        native: 'Natif'
      },
      fileSortBy: {
        created: 'Date de création',
        modified: 'Date de modification',
        title: 'Titre'
      },
      language: {
        system: 'Suivre le système',
        en: 'English',
        'zh-CN': '简体中文'
      }
    }
  },
  search: {
    placeholder: 'Rechercher',
    replacementPlaceholder: 'Remplacement',
    caseSensitive: 'Respecter la casse',
    wholeWord: 'Sélectionner le mot entier',
    regex: 'Utiliser la recherche comme expression régulière',
    replaceAll: 'Tout remplacer',
    replaceSingle: 'Remplacer',
    invalidRegex: 'Expression régulière invalide : /{value}/.',
    regexMatchesEmpty: 'RegExp : /{value}/ correspond à une chaîne vide.'
  },
  titleBar: {
    words: 'Mots',
    characters: 'Caractères',
    paragraphs: 'Paragraphes',
    stats: {
      word: {
        short: 'M',
        full: 'mot'
      },
      character: {
        short: 'C',
        full: 'caractère'
      },
      paragraph: {
        short: 'P',
        full: 'paragraphe'
      },
      all: {
        short: 'T',
        full: 'caractère (avec espaces)'
      }
    }
  },
  commandPalette: {
    placeholder: 'Tapez une commande à exécuter'
  },
  exportDialog: {
    title: 'Options d\'exportation',
    tabs: {
      info: 'Infos',
      page: 'Page',
      style: 'Style',
      theme: 'Thème',
      header: 'En-tête et pied de page',
      toc: 'Table des matières'
    },
    infoText: 'Veuillez personnaliser l\'apparence de la page et cliquer sur "exporter" pour continuer.',
    pageTitle: 'Titre de la page :',
    pageSize: 'Taille de la page :',
    widthHeightMm: 'Largeur/Hauteur en mm :',
    landscape: 'Orientation paysage :',
    pageMargin: 'Marges de page en mm :',
    topBottom: 'Haut/Bas :',
    leftRight: 'Gauche/Droite :',
    overwriteFontSettings: 'Remplacer les paramètres de police du thème :',
    fontFamily: 'Famille de police :',
    fontSize: 'Taille de police',
    lineHeight: 'Hauteur de ligne',
    autoNumberingHeadings: 'Numérotation automatique des titres :',
    showFrontMatter: 'Afficher le front matter :',
    themeText: 'Vous pouvez modifier l\'apparence du document en choisissant un thème ou en créant un thème personnalisé.',
    theme: 'Thème :',
    headerFooterText: 'Le texte apparaît sur toutes les pages si l\'en-tête et/ou le pied de page est défini.',
    headerType: 'Type d\'en-tête :',
    leftHeaderText: 'Texte de l\'en-tête gauche :',
    mainHeaderText: 'Texte de l\'en-tête principal :',
    rightHeaderText: 'Texte de l\'en-tête droit :',
    footerType: 'Type de pied de page :',
    leftFooterText: 'Texte du pied de page gauche :',
    mainFooterText: 'Texte du pied de page principal :',
    rightFooterText: 'Texte du pied de page droit :',
    customizeStyle: 'Personnaliser le style :',
    allowStyledHeaderFooter: 'Autoriser les en-têtes et pieds de page stylisés :',
    headerFooterFontSize: 'Taille de police des en-têtes et pieds de page',
    includeTopHeading: 'Inclure le titre principal :',
    includeTopHeadingDetail: 'Inclut également le premier niveau de titre.',
    tocTitle: 'Titre :',
    export: 'Exporter...',
    option: {
      custom: 'Personnalisé',
      none: 'Aucun',
      singleCell: 'Cellule unique',
      threeCells: 'Trois cellules',
      default: 'Par défaut',
      simple: 'Simple',
      styled: 'Stylisé'
    }
  },
  notification: {
    information: 'Information',
    defaultMessage: 'Vous ne devriez jamais voir ce message',
    spelling: 'Orthographe',
    spellcheckerDisabled: 'Impossible de changer la langue car le correcteur orthographique est désactivé.'
  },
  editor: {
    insertTable: {
      title: 'Insérer un tableau',
      rows: 'Lignes',
      columns: 'Colonnes',
      cancel: 'Annuler',
      ok: 'OK'
    },
    contextMenu: {
      tabs: {
        close: 'Fermer',
        closeOthers: 'Fermer les autres',
        closeSavedTabs: 'Fermer les onglets enregistrés',
        closeAllTabs: 'Fermer tous les onglets',
        rename: 'Renommer',
        copyPath: 'Copier le chemin',
        showInFolder: 'Afficher dans le dossier'
      },
      sideBar: {
        newFile: 'Nouveau fichier',
        newDirectory: 'Nouveau dossier',
        copy: 'Copier',
        cut: 'Couper',
        paste: 'Coller',
        rename: 'Renommer',
        moveToTrash: 'Mettre à la corbeille',
        showInFolder: 'Afficher dans le dossier'
      }
    },
    notification: {
      ok: 'OK'
    },
    imageUpload: {
      title: 'Télécharger une image',
      uploadFailed: 'Échec du téléchargement, l\'image sera copiée dans le dossier d\'images',
      sizeExceeded: 'Impossible de télécharger une image de plus de 5 Mo, l\'image sera copiée dans le dossier d\'images',
      noUploader: 'Aucun service de téléchargement d\'image fourni.',
      copyDeletionUrl: 'Cliquez pour copier l\'URL de suppression de l\'image téléchargée dans le presse-papiers ({url}).'
    }
  },
  fileOperation: {
    newFile: 'Nouveau fichier',
    untitled: 'Sans titre {id}',
    import: {
      title: 'Importer ou Ouvrir',
      dropHere: 'Déposez ici pour importer vos éléments dans Macaron'
    },
    export: {
      successTitle: 'Exportation réussie',
      successMessage: 'Exportation de "{filename}" réussie !',
      failTitle: 'Échec de l\'impression/exportation',
      failMessage: 'L\'impression/exportation de {filename} a échoué'
    }
  },
  about: {
    appName: 'Macaron',
    copyright: 'Copyright © 2017-{year} Luo Ran',
    copyrightContributors: 'Copyright © 2018-{year} Contributeurs de Macaron'
  },
  update: {
    title: 'Mise à jour',
    notAvailable: 'Mise à jour non disponible',
    downloaded: 'Mise à jour téléchargée',
    available: 'Mise à jour disponible'
  },
  searchFolder: {
    placeholder: 'Rechercher dans le dossier...',
    noFolderOpen: 'Aucun dossier ouvert',
    noResults: 'Aucun résultat trouvé.',
    cancel: 'Annuler',
    openFolder: 'Ouvrir un dossier'
  },
  preferences: {
    keybindings: {
      title: 'Raccourcis clavier',
      description: 'Personnalisez les raccourcis de Macaron et cliquez sur le bouton enregistrer ci-dessous pour appliquer tous les changements (nécessite un redémarrage). Tous les raccourcis disponibles et par défaut peuvent être trouvés {link}.',
      onlineLink: 'en ligne',
      columnDescription: 'Description',
      columnKeyCombination: 'Combinaison de touches',
      columnOptions: 'Options',
      buttonEdit: 'Modifier',
      buttonReset: 'Réinitialiser',
      buttonUnbind: 'Dissocier',
      buttonSave: 'Enregistrer',
      buttonRestoreDefaults: 'Restaurer les raccourcis par défaut',
      saveFailedTitle: 'Échec de l\'enregistrement',
      saveFailedMessage: 'Une erreur inattendue s\'est produite lors de l\'enregistrement.',
      keyInputDialog: {
        placeholder: 'Appuyez sur une combinaison de touches',
        hint: 'Appuyez sur Entrée pour continuer ou Échap pour quitter.',
        invalidKey: 'La combinaison de touches actuelle ne peut pas être associée !'
      },
      shortcutInUseTitle: 'Raccourci déjà utilisé',
      shortcutInUseMessage: 'Le raccourci "{accelerator}" est déjà utilisé. Veuillez désactiver le raccourci et réessayer.'
    },
    spellchecker: {
      title: 'Orthographe',
      enableSpellcheck: 'Activer la vérification orthographique',
      hideMarks: 'Masquer les marques d\'erreurs orthographiques',
      autoDetectLanguage: 'Détecter automatiquement la langue du document',
      defaultLanguage: 'Langue par défaut pour la vérification orthographique',
      macOSInfo: 'La langue utilisée sera détectée automatiquement lors de la frappe. Des langues supplémentaires peuvent être ajoutées via "Langue et région" dans les préférences système.',
      customDictionary: 'Dictionnaire personnalisé :',
      customDictionaryDesc: 'Modifier les mots dans le dictionnaire personnalisé.',
      columnWord: 'Mot',
      columnOptions: 'Options',
      buttonDelete: 'Supprimer',
      noWords: 'Aucun mot disponible',
      switchLanguageFailed: 'Échec du changement de langue',
      removeWordFailed: 'Échec de la suppression du mot personnalisé',
      removeWordFailedMessage: 'Une erreur inattendue s\'est produite lors de l\'enregistrement.'
    },
    image: {
      title: 'Image',
      insertActionDesc: 'Action par défaut après l\'insertion d\'une image depuis un dossier local ou le presse-papiers',
      clipboardHint: 'La gestion du presse-papiers n\'est entièrement supportée que sur macOS et Windows.',
      uploader: {
        title: 'Service de téléchargement',
        currentUploader: 'Le service de téléchargement d\'images actuel est {name}.',
        noUploader: 'Aucun service de téléchargement n\'est actuellement sélectionné. Veuillez sélectionner et configurer un service.',
        saveConfigTitle: 'Enregistrer la configuration',
        githubSaved: 'La configuration GitHub a été enregistrée.',
        scriptSaved: 'La configuration du script en ligne de commande a été enregistrée',
        githubWarning: 'GitHub sera supprimé dans une future version, veuillez utiliser picgo',
        picgoNotInstalled: 'Votre système n\'a pas {link} installé, veuillez l\'installer avant utilisation.',
        picgoLink: 'picgo',
        githubToken: 'Jeton GitHub :',
        githubTokenHint: 'Le jeton est enregistré par Keychain sur macOS, Secret Service API/libsecret sur Linux et Credential Vault sur Windows',
        tokenPlaceholder: 'Saisir le jeton',
        ownerPlaceholder: 'propriétaire',
        repoPlaceholder: 'dépôt',
        branchPlaceholder: 'branche',
        ownerName: 'Nom du propriétaire :',
        repoName: 'Nom du dépôt :',
        branchName: 'Nom de la branche (optionnel) :',
        scriptLocation: 'Emplacement du script shell :',
        scriptPathPlaceholder: 'Chemin absolu du script',
        scriptDesc: 'Le script sera exécuté avec le chemin du fichier image comme seul argument et il devrait retourner une valeur valide pour le',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: 'Thème',
      autoSwitch: 'Ajuster automatiquement le thème de l\'application selon les paramètres système',
      openFolder: 'Ouvrir le dossier des thèmes',
      openFolderButton: 'Ouvrir le dossier',
      importTheme: 'Importer des thèmes personnalisés',
      importButton: 'Importer un thème'
    },
    markdown: {
      title: 'Markdown',
      lists: 'Listes :',
      preferLooseList: 'Préférer les éléments de liste lâches',
      bulletMarker: 'Marqueur préféré pour les listes à puces',
      orderDelimiter: 'Marqueur préféré pour les listes ordonnées',
      listIndentation: 'Indentation préférée pour les listes',
      extensions: 'Extensions Markdown :',
      frontmatter: 'Format du front matter',
      superSubScript: 'Activer les exposants et indices de style Pandoc',
      footnotes: 'Activer les notes de bas de page de style Pandoc',
      footnotesNote: 'Nécessite un redémarrage.',
      compatibility: 'Compatibilité :',
      enableHtml: 'Activer le rendu HTML',
      gitlabCompat: 'Activer le mode de compatibilité GitLab',
      diagrams: 'Diagrammes :',
      sequenceTheme: 'Thème des diagrammes de séquence',
      misc: 'Divers :',
      headingStyle: 'Style de titre préféré'
    },
    editor: {
      title: 'Éditeur',
      textEditor: 'Paramètres de l\'éditeur de texte :',
      fontSize: 'Taille de police',
      lineHeight: 'Hauteur de ligne',
      fontFamily: 'Famille de police',
      maxWidth: 'Largeur maximale de l\'éditeur de texte',
      maxWidthNote: 'Laisser vide pour le thème par défaut, sinon utiliser un nombre avec un suffixe d\'unité, parmi "ch" pour les caractères, "px" pour les pixels, ou "%" pour le pourcentage.',
      codeBlock: 'Paramètres des blocs de code :',
      codeFontSize: 'Taille de police',
      codeFontFamily: 'Famille de police',
      lineNumbers: 'Afficher les numéros de ligne',
      trimEmptyLines: 'Supprimer les lignes vides de début et de fin',
      writing: 'Comportement d\'écriture :',
      autoPairBracket: 'Fermer automatiquement les parenthèses lors de l\'écriture',
      autoPairMarkdown: 'Compléter automatiquement la syntaxe Markdown',
      autoPairQuote: 'Fermer automatiquement les guillemets',
      fileRepresentation: 'Représentation des fichiers :',
      tabWidth: 'Largeur de tabulation préférée',
      lineSeparator: 'Type de séparateur de ligne',
      encoding: 'Encodage par défaut',
      detectEncoding: 'Détecter automatiquement l\'encodage des fichiers',
      trailingNewline: 'Gestion des caractères de fin de ligne',
      misc: 'Divers :',
      textDirection: 'Direction du texte',
      hideInsertHint: 'Masquer l\'indice pour le type de nouveau paragraphe',
      hideLinkPopup: 'Masquer la popup quand le curseur est sur un lien',
      autoCheck: 'Vérifier automatiquement les tâches associées'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'À propos de Macaron',
      checkForUpdates: 'Rechercher des mises à jour...',
      preferences: 'Préférences',
      services: 'Services',
      hide: 'Masquer Macaron',
      hideOthers: 'Masquer les autres',
      showAll: 'Tout afficher',
      quit: 'Quitter Macaron'
    },
    file: {
      root: '&Fichier',
      newTab: 'Nouvel onglet',
      newWindow: 'Nouvelle fenêtre',
      openFile: 'Ouvrir un fichier...',
      openFolder: 'Ouvrir un dossier...',
      openRecent: 'Ouvrir récent',
      clearRecentlyUsed: 'Effacer les fichiers récents',
      save: 'Enregistrer',
      saveAs: 'Enregistrer sous...',
      autoSave: 'Enregistrement automatique',
      moveTo: 'Déplacer vers...',
      rename: 'Renommer...',
      import: 'Importer...',
      export: 'Exporter',
      html: 'HTML',
      pdf: 'PDF',
      print: 'Imprimer',
      preferences: 'Préférences...',
      closeTab: 'Fermer l\'onglet',
      closeWindow: 'Fermer la fenêtre',
      quit: 'Quitter'
    },
    edit: {
      root: '&Édition',
      simpleRoot: 'Édition',
      undo: 'Annuler',
      redo: 'Rétablir',
      cut: 'Couper',
      copy: 'Copier',
      paste: 'Coller',
      copyAsMarkdown: 'Copier en Markdown',
      copyAsHtml: 'Copier en HTML',
      pasteAsPlainText: 'Coller en texte brut',
      selectAll: 'Tout sélectionner',
      duplicate: 'Dupliquer',
      createParagraph: 'Créer un paragraphe',
      deleteParagraph: 'Supprimer le paragraphe',
      find: 'Rechercher',
      findNext: 'Rechercher le suivant',
      findPrevious: 'Rechercher le précédent',
      replace: 'Remplacer',
      findInFolder: 'Rechercher dans le dossier',
      screenshot: 'Capture d\'écran',
      lineEnding: 'Fin de ligne',
      lineEndingCrlf: 'Retour chariot et saut de ligne (CRLF)',
      lineEndingLf: 'Saut de ligne (LF)'
    },
    paragraph: {
      root: '&Paragraphe',
      heading1: 'Titre 1',
      heading2: 'Titre 2',
      heading3: 'Titre 3',
      heading4: 'Titre 4',
      heading5: 'Titre 5',
      heading6: 'Titre 6',
      promoteHeading: 'Promouvoir le titre',
      demoteHeading: 'Rétrograder le titre',
      table: 'Tableau',
      codeFences: 'Blocs de code',
      quoteBlock: 'Bloc de citation',
      mathBlock: 'Bloc mathématique',
      htmlBlock: 'Bloc HTML',
      orderedList: 'Liste ordonnée',
      bulletList: 'Liste à puces',
      taskList: 'Liste de tâches',
      looseListItem: 'Élément de liste lâche',
      paragraph: 'Paragraphe',
      horizontalRule: 'Ligne horizontale',
      frontMatter: 'Front matter'
    },
    format: {
      root: 'F&ormat',
      bold: 'Gras',
      italic: 'Italique',
      underline: 'Souligné',
      superscript: 'Exposant',
      subscript: 'Indice',
      highlight: 'Surligné',
      inlineCode: 'Code en ligne',
      inlineMath: 'Math en ligne',
      strikethrough: 'Barré',
      hyperlink: 'Lien hypertexte',
      image: 'Image',
      clearFormatting: 'Effacer le formatage'
    },
    theme: {
      root: '&Thème',
      light: 'Cadmium Light',
      dark: 'Dark',
      graphite: 'Graphite Light',
      materialDark: 'Material Dark',
      oneDark: 'One Dark',
      ulysses: 'Ulysses Light'
    },
    view: {
      root: '&Affichage',
      commandPalette: 'Palette de commandes...',
      sourceCodeMode: 'Mode code source',
      typewriterMode: 'Mode machine à écrire',
      focusMode: 'Mode focus',
      showSidebar: 'Afficher la barre latérale',
      showTabBar: 'Afficher la barre d\'onglets',
      toggleToc: 'Basculer la table des matières',
      reloadImages: 'Recharger les images',
      showDevTools: 'Afficher les outils de développement',
      reloadWindow: 'Recharger la fenêtre'
    },
    window: {
      root: '&Fenêtre',
      minimize: 'Réduire',
      alwaysOnTop: 'Toujours au premier plan',
      zoomIn: 'Zoom avant',
      zoomOut: 'Zoom arrière',
      showInFullScreen: 'Afficher en plein écran',
      bringAllToFront: 'Tout ramener au premier plan'
    },
    help: {
      root: '&Aide',
      quickStart: 'Démarrage rapide...',
      markdownReference: 'Référence Markdown...',
      changelog: 'Journal des modifications...',
      donate: 'Faire un don via Open Collective...',
      feedbackViaTwitter: 'Commentaires via Twitter...',
      reportIssue: 'Signaler un problème ou demander une fonctionnalité...',
      website: 'Site web...',
      watchOnGitHub: 'Regarder sur GitHub...',
      followOnGitHub: 'Nous suivre sur GitHub...',
      followOnTwitter: 'Nous suivre sur Twitter...',
      license: 'Licence...',
      checkForUpdates: 'Rechercher des mises à jour...',
      about: 'À propos de Macaron...'
    },
    dock: {
      open: 'Ouvrir...',
      clearRecent: 'Effacer les récents'
    }
  }
}
