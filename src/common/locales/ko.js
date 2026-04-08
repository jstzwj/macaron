export default {
  app: {
    preferences: '환경설정',
    name: 'Macaron'
  },
  settings: {
    searchPlaceholder: '설정 검색',
    categories: {
      general: '일반',
      editor: '편집기',
      markdown: '마크다운',
      spelling: '맞춤법',
      theme: '테마',
      image: '이미지',
      keybindings: '단축키'
    },
    general: {
      title: '일반',
      autoSave: '자동 저장',
      autoSaveDescription: '문서 변경 사항 자동 저장',
      autoSaveDelayDescription: '문서 편집 후 자동 저장까지의 지연 시간',
      window: '창',
      titleBarStyle: '제목 표시줄 스타일',
      requiresRestart: '재시작이 필요합니다.',
      hideScrollbars: '스크롤바 숨기기',
      openFilesInNewWindow: '새 창에서 파일 열기',
      openFoldersInNewWindow: '새 창에서 폴더 열기',
      zoom: '확대/축소',
      sidebar: '사이드바',
      wrapTextInToc: '목차에서 텍스트 줄바꿈',
      sortFieldForFilesInOpenFolders: '열린 폴더에서 파일 정렬 기준',
      startupAction: '시작 시 동작',
      openDefaultDirectory: '기본 디렉토리 열기',
      selectFolder: '폴더 선택',
      openBlankPage: '빈 페이지 열기',
      misc: '기타',
      userInterfaceLanguage: '사용자 인터페이스 언어'
    },
    options: {
      titleBarStyle: {
        custom: '사용자 지정',
        native: '기본'
      },
      fileSortBy: {
        created: '생성 시간',
        modified: '수정 시간',
        title: '제목'
      },
      language: {
        system: '시스템 설정 따르기',
        en: 'English',
        'zh-CN': '简体中文'
      }
    }
  },
  search: {
    placeholder: '검색',
    replacementPlaceholder: '바꿀 내용',
    caseSensitive: '대소문자 구분',
    wholeWord: '단어 단위 선택',
    regex: '정규식 사용',
    replaceAll: '모두 바꾸기',
    replaceSingle: '개별 바꾸기',
    invalidRegex: '잘못된 정규식: /{value}/.',
    regexMatchesEmpty: '정규식: /{value}/이(가) 빈 문자열과 일치합니다.'
  },
  titleBar: {
    words: '단어',
    characters: '문자',
    paragraphs: '단락',
    stats: {
      word: {
        short: 'W',
        full: '단어'
      },
      character: {
        short: 'C',
        full: '문자'
      },
      paragraph: {
        short: 'P',
        full: '단락'
      },
      all: {
        short: 'A',
        full: '(공백 포함)문자'
      }
    }
  },
  commandPalette: {
    placeholder: '실행할 명령을 입력하세요'
  },
  exportDialog: {
    title: '내보내기 옵션',
    overviewEyebrow: '내보내기 설정',
    htmlEyebrow: 'HTML 내보내기 설정',
    printableSubtitle: '내보내기 전에 페이지 레이아웃, 모양, 머리글/바닥글, 목차를 조정하세요.',
    htmlSubtitle: '내보내기 전에 제목, 모양, 목차를 조정하세요.',
    footerPrintable: '위 설정을 확인한 후 준비가 되면 내보내세요.',
    footerHtml: '위 설정을 확인한 후 준비가 되면 HTML 파일을 내보내세요.',
    tabs: {
      info: '정보',
      page: '페이지',
      style: '스타일',
      theme: '테마',
      header: '머리글 및 바닥글',
      toc: '목차'
    },
    infoText: '페이지 모양을 사용자 지정한 후 "내보내기"를 클릭하여 계속하세요.',
    pageTitle: '페이지 제목:',
    pageSize: '페이지 크기:',
    widthHeightMm: '너비/높이 (mm):',
    landscape: '가로 방향:',
    pageMargin: '페이지 여백 (mm):',
    topBottom: '위/아래:',
    leftRight: '왼쪽/오른쪽:',
    overwriteFontSettings: '테마 글꼴 설정 덮어쓰기:',
    fontFamily: '글꼴:',
    fontSize: '글꼴 크기',
    lineHeight: '줄 높이',
    autoNumberingHeadings: '제목 자동 번호 매기기:',
    showFrontMatter: '프론트 매터 표시:',
    themeText: '테마를 선택하거나 직접 만들어 문서 모양을 변경할 수 있습니다.',
    theme: '테마:',
    headerFooterText: '머리글 및/또는 바닥글이 정의된 경우 모든 페이지에 텍스트가 표시됩니다.',
    headerType: '머리글 유형:',
    leftHeaderText: '왼쪽 머리글 텍스트:',
    mainHeaderText: '중앙 머리글 텍스트:',
    rightHeaderText: '오른쪽 머리글 텍스트:',
    footerType: '바닥글 유형:',
    leftFooterText: '왼쪽 바닥글 텍스트:',
    mainFooterText: '중앙 바닥글 텍스트:',
    rightFooterText: '오른쪽 바닥글 텍스트:',
    customizeStyle: '스타일 사용자 지정:',
    allowStyledHeaderFooter: '스타일이 적용된 머리글 및 바닥글 허용:',
    headerFooterFontSize: '머리글 및 바닥글 글꼴 크기',
    includeTopHeading: '최상위 제목 포함:',
    includeTopHeadingDetail: '첫 번째 제목 수준도 포함합니다.',
    tocTitle: '제목:',
    export: '내보내기...',
    sections: {
      htmlDocument: 'HTML 문서',
      htmlDocumentDescription: '내보낼 HTML 문서의 제목을 설정합니다.',
      pageSetup: '페이지 설정',
      pageSetupDescription: 'PDF 내보내기에 사용할 용지 크기와 방향을 선택합니다.',
      margins: '여백',
      marginsDescription: '인쇄 및 PDF 내보내기에 적용할 페이지 여백을 설정합니다.',
      width: '너비',
      height: '높이',
      marginTop: '위쪽 여백',
      marginBottom: '아래쪽 여백',
      marginLeft: '왼쪽 여백',
      marginRight: '오른쪽 여백',
      typography: '타이포그래피',
      typographyDescription: '내보내기 결과에 사용할 글꼴 및 조판 설정을 덮어씁니다.',
      documentDetails: '문서 세부 정보',
      documentDetailsDescription: '내보내기에 추가 구조 정보를 포함할지 선택합니다.',
      theme: '테마',
      header: '머리글',
      footer: '바닥글',
      footerDescription: '바닥글 레이아웃을 선택하고 표시할 텍스트를 사용자 지정합니다.',
      headerFooterStyle: '머리글 및 바닥글 스타일',
      headerFooterStyleDescription: '인쇄 머리글 및 바닥글 영역에 사용할 타이포그래피를 사용자 지정합니다.',
      toc: '목차',
      tocDescription: '목차 제목과 포함할 제목 범위를 제어합니다.'
    },
    option: {
      custom: '사용자 지정',
      none: '없음',
      singleCell: '단일 셀',
      threeCells: '세 개 셀',
      default: '기본',
      simple: '단순',
      styled: '스타일 적용'
    }
  },
  notification: {
    information: '정보',
    defaultMessage: '이 메시지가 표시되면 안 됩니다',
    spelling: '맞춤법',
    spellcheckerDisabled: '맞춤법 검사기가 비활성화되어 있어 언어를 변경할 수 없습니다.'
  },
  editor: {
    insertTable: {
      title: '표 삽입',
      rows: '행',
      columns: '열',
      cancel: '취소',
      ok: '확인'
    },
    contextMenu: {
      tabs: {
        close: '닫기',
        closeOthers: '다른 탭 닫기',
        closeSavedTabs: '저장된 탭 닫기',
        closeAllTabs: '모든 탭 닫기',
        rename: '이름 바꾸기',
        copyPath: '경로 복사',
        showInFolder: '폴더에서 보기'
      },
      sideBar: {
        newFile: '새 파일',
        newDirectory: '새 디렉토리',
        copy: '복사',
        cut: '잘라내기',
        paste: '붙여넣기',
        rename: '이름 바꾸기',
        moveToTrash: '휴지통으로 이동',
        showInFolder: '폴더에서 보기'
      },
      tree: {
        openedFiles: '열린 파일',
        saveAll: '모두 저장',
        closeAll: '모두 닫기',
        emptyProject: '빈 프로젝트',
        createFile: '파일 만들기',
        openFolder: '폴더 열기'
      }
    },
    notification: {
      ok: '확인'
    },
    imageUpload: {
      title: '이미지 업로드',
      uploadFailed: '업로드에 실패했습니다. 이미지가 이미지 폴더로 복사됩니다.',
      sizeExceeded: '5MB 이상의 이미지는 업로드할 수 없습니다. 이미지가 이미지 폴더로 복사됩니다.',
      noUploader: '제공된 이미지 업로더가 없습니다.',
      copyDeletionUrl: '클릭하여 업로드된 이미지의 삭제 URL을 클립보드에 복사합니다 ({url}).'
    },
    frontMenu: {
      duplicate: '복제',
      turnInto: '변환',
      newParagraph: '새 단락',
      delete: '삭제'
    },
    quickInsert: {
      basicBlock: '기본 블록',
      header: '제목',
      advancedBlock: '고급 블록',
      listBlock: '목록 블록',
      diagram: '다이어그램',
      paragraph: '단락',
      horizontalLine: '수평선',
      frontMatter: 'Front Matter',
      header1: '제목 1',
      header2: '제목 2',
      header3: '제목 3',
      header4: '제목 4',
      header5: '제목 5',
      header6: '제목 6',
      tableBlock: '표 블록',
      displayMath: '수식 블록',
      htmlBlock: 'HTML 블록',
      codeBlock: '코드 블록',
      quoteBlock: '인용 블록',
      orderList: '순서가 있는 목록',
      bulletList: '글머리 기호 목록',
      todoList: '작업 목록',
      vegaChart: 'Vega 차트',
      flowChart: '순서도',
      sequenceDiagram: '시퀀스 다이어그램',
      plantuml: 'PlantUML 다이어그램',
      mermaid: 'Mermaid 다이어그램'
    }
  },
  fileOperation: {
    newFile: '새 파일',
    untitled: '제목 없음 {id}',
    import: {
      title: '가져오기 또는 열기',
      dropHere: '여기에 놓아 Macaron으로 가져오세요'
    },
    export: {
      successTitle: '내보내기 성공',
      successMessage: '"{filename}"을(를) 성공적으로 내보냈습니다!',
      failTitle: '인쇄/내보내기 실패',
      failMessage: '{filename} 내보내기에 실패했습니다'
    }
  },
  about: {
    appName: 'Macaron',
    copyright: 'Copyright © 2017-{year} Luo Ran',
    copyrightContributors: 'Copyright © 2018-{year} Macaron Contributors'
  },
  update: {
    title: '업데이트',
    notAvailable: '업데이트 없음',
    downloaded: '업데이트 다운로드 완료',
    available: '업데이트 사용 가능'
  },
  searchFolder: {
    placeholder: '폴더에서 검색...',
    noFolderOpen: '열린 폴더 없음',
    noResults: '결과를 찾을 수 없습니다.',
    cancel: '취소',
    openFolder: '폴더 열기'
  },
  preferences: {
    keybindings: {
      title: '단축키',
      description: 'Macaron 단축키를 사용자 지정하고 아래 저장 버튼을 클릭하여 모든 변경 사항을 적용하세요 (재시작 필요). 사용 가능한 모든 단축키와 기본 키 바인딩은 {link}에서 찾을 수 있습니다.',
      onlineLink: '온라인',
      columnDescription: '설명',
      columnKeyCombination: '키 조합',
      columnOptions: '옵션',
      buttonEdit: '편집',
      buttonReset: '재설정',
      buttonUnbind: '바인딩 해제',
      buttonSave: '저장',
      buttonRestoreDefaults: '기본 단축키 복원',
      saveFailedTitle: '저장 실패',
      saveFailedMessage: '저장 중 예기치 않은 오류가 발생했습니다.',
      keyInputDialog: {
        placeholder: '키 조합을 누르세요',
        hint: '계속하려면 Enter를, 종료하려면 ESC를 누르세요.',
        invalidKey: '현재 키 조합은 바인딩할 수 없습니다!'
      },
      shortcutInUseTitle: '단축키가 이미 사용 중입니다',
      shortcutInUseMessage: '"{accelerator}" 단축키는 이미 사용 중입니다. 단축키를 해제한 후 다시 시도하세요.'
    },
    spellchecker: {
      title: '맞춤법',
      enableSpellcheck: '맞춤법 검사 활성화',
      hideMarks: '맞춤법 오류 표시 숨기기',
      autoDetectLanguage: '문서 언어 자동 감지',
      defaultLanguage: '맞춤법 검사 기본 언어',
      macOSInfo: '입력하는 동안 사용된 언어가 자동으로 감지됩니다. 시스템 환경설정의 "언어 및 지역"을 통해 추가 언어를 추가할 수 있습니다.',
      customDictionary: '사용자 사전:',
      customDictionaryDesc: '사용자 사전의 단어 편집.',
      columnWord: '단어',
      columnOptions: '옵션',
      buttonDelete: '삭제',
      noWords: '사용 가능한 단어 없음',
      switchLanguageFailed: '언어 전환 실패',
      removeWordFailed: '사용자 단어 제거 실패',
      removeWordFailedMessage: '저장 중 예기치 않은 오류가 발생했습니다.'
    },
    image: {
      title: '이미지',
      insertActionDesc: '로컬 폴더 또는 클립보드에서 이미지를 삽입한 후의 기본 동작',
      clipboardHint: '클립보드 처리는 macOS와 Windows에서만 완전히 지원됩니다.',
      uploader: {
        title: '업로더',
        currentUploader: '현재 이미지 업로더는 {name}입니다.',
        noUploader: '현재 선택된 업로더가 없습니다. 업로더를 선택하고 구성하세요.',
        saveConfigTitle: '설정 저장',
        githubSaved: 'GitHub 설정이 저장되었습니다.',
        scriptSaved: '명령줄 스크립트 설정이 저장되었습니다.',
        githubWarning: 'GitHub은 향후 버전에서 제거될 예정입니다. picgo를 사용하세요.',
        picgoNotInstalled: '시스템에 {link}이(가) 설치되어 있지 않습니다. 사용하기 전에 설치하세요.',
        picgoLink: 'picgo',
        githubToken: 'GitHub 토큰:',
        githubTokenHint: '토큰은 macOS의 키체인, Linux의 Secret Service API/libsecret, Windows의 자격 증명 보관소에 저장됩니다.',
        tokenPlaceholder: '토큰 입력',
        ownerPlaceholder: '소유자',
        repoPlaceholder: '저장소',
        branchPlaceholder: '브랜치',
        ownerName: '소유자 이름:',
        repoName: '저장소 이름:',
        branchName: '브랜치 이름 (선택사항):',
        scriptLocation: '셸 스크립트 위치:',
        scriptPathPlaceholder: '스크립트 절대 경로',
        scriptDesc: '이 스크립트는 이미지 파일 경로를 유일한 인수로 실행되며,',
        scriptDescHtml: 'HTMLImageElement'
      }
    },
    theme: {
      title: '테마',
      autoSwitch: '시스템 설정에 따라 애플리케이션 테마 자동 조정',
      openFolder: '테마 폴더 열기',
      openFolderButton: '폴더 열기',
      importTheme: '사용자 지정 테마 가져오기',
      importButton: '테마 가져오기'
    },
    markdown: {
      title: '마크다운',
      lists: '목록:',
      preferLooseList: '느슨한 목록 항목 선호',
      bulletMarker: '글머리 기호 목록의 기본 마커',
      orderDelimiter: '순서가 있는 목록의 기본 마커',
      listIndentation: '목록 들여쓰기 기본 설정',
      extensions: '마크다운 확장:',
      frontmatter: '프론트 매터 형식',
      superSubScript: 'Pandoc 스타일 위첨자 및 아래첨자 활성화',
      footnotes: 'Pandoc 스타일 각주 활성화',
      footnotesNote: '재시작이 필요합니다.',
      compatibility: '호환성:',
      enableHtml: 'HTML 렌더링 활성화',
      gitlabCompat: 'GitLab 호환 모드 활성화',
      diagrams: '다이어그램:',
      sequenceTheme: '시퀀스 다이어그램 테마',
      misc: '기타:',
      headingStyle: '제목 스타일 기본 설정'
    },
    editor: {
      title: '편집기',
      textEditor: '텍스트 편집기 설정:',
      fontSize: '글꼴 크기',
      lineHeight: '줄 높이',
      fontFamily: '글꼴',
      maxWidth: '텍스트 편집기 최대 너비',
      maxWidthNote: "테마 기본값을 사용하려면 비워두고, 그렇지 않으면 단위 접미사가 있는 숫자를 사용하세요. 'ch'(문자), 'px'(픽셀), '%'(백분율) 중 하나입니다.",
      codeBlock: '코드 블록 설정:',
      codeFontSize: '글꼴 크기',
      codeFontFamily: '글꼴',
      lineNumbers: '줄 번호 표시',
      trimEmptyLines: '앞뒤 빈 줄 제거',
      writing: '쓰기 동작:',
      autoPairBracket: '작성 시 괄호 자동 닫기',
      autoPairMarkdown: '마크다운 구문 자동 완성',
      autoPairQuote: '인용 부호 자동 닫기',
      fileRepresentation: '파일 표현:',
      tabWidth: '탭 너비 기본 설정',
      lineSeparator: '줄 구분자 유형',
      encoding: '기본 인코딩',
      detectEncoding: '파일 인코딩 자동 감지',
      trailingNewline: '후행 줄바꿈 문자 처리',
      misc: '기타:',
      textDirection: '텍스트 방향',
      hideInsertHint: '새 단락 유형 선택 힌트 숨기기',
      hideLinkPopup: '링크 위에 커서가 있을 때 팝업 숨기기',
      autoCheck: '관련 작업 자동 확인 여부'
    }
  },
  menu: {
    macaron: {
      root: 'Macaron',
      about: 'Macaron 정보',
      checkForUpdates: '업데이트 확인...',
      preferences: '환경설정',
      services: '서비스',
      hide: 'Macaron 숨기기',
      hideOthers: '다른 앱 숨기기',
      showAll: '모두 표시',
      quit: 'Macaron 종료'
    },
    file: {
      root: '파일(&F)',
      newTab: '새 탭',
      newWindow: '새 창',
      openFile: '파일 열기...',
      openFolder: '폴더 열기...',
      openRecent: '최근 항목 열기',
      clearRecentlyUsed: '최근 사용 항목 지우기',
      save: '저장',
      saveAs: '다른 이름으로 저장...',
      autoSave: '자동 저장',
      moveTo: '이동...',
      rename: '이름 바꾸기...',
      import: '가져오기...',
      export: '내보내기',
      html: 'HTML',
      pdf: 'PDF',
      print: '인쇄',
      preferences: '환경설정...',
      closeTab: '탭 닫기',
      closeWindow: '창 닫기',
      quit: '종료'
    },
    edit: {
      root: '편집(&E)',
      simpleRoot: '편집',
      undo: '실행 취소',
      redo: '다시 실행',
      cut: '잘라내기',
      copy: '복사',
      paste: '붙여넣기',
      copyAsMarkdown: '마크다운으로 복사',
      copyAsHtml: 'HTML로 복사',
      pasteAsPlainText: '일반 텍스트로 붙여넣기',
      selectAll: '모두 선택',
      duplicate: '복제',
      createParagraph: '단락 만들기',
      deleteParagraph: '단락 삭제',
      find: '찾기',
      findNext: '다음 찾기',
      findPrevious: '이전 찾기',
      replace: '바꾸기',
      findInFolder: '폴더에서 찾기',
      screenshot: '스크린샷',
      lineEnding: '줄 끝',
      lineEndingCrlf: '캐리지 리턴 및 줄 바꿈 (CRLF)',
      lineEndingLf: '줄 바꿈 (LF)'
    },
    paragraph: {
      root: '단락(&P)',
      heading1: '제목 1',
      heading2: '제목 2',
      heading3: '제목 3',
      heading4: '제목 4',
      heading5: '제목 5',
      heading6: '제목 6',
      promoteHeading: '제목 승격',
      demoteHeading: '제목 강등',
      table: '표',
      codeFences: '코드 펜스',
      quoteBlock: '인용 블록',
      mathBlock: '수식 블록',
      htmlBlock: 'HTML 블록',
      orderedList: '순서가 있는 목록',
      bulletList: '글머리 기호 목록',
      taskList: '작업 목록',
      looseListItem: '느슨한 목록 항목',
      paragraph: '단락',
      horizontalRule: '수평선',
      frontMatter: '프론트 매터'
    },
    format: {
      root: '서식(&O)',
      bold: '굵게',
      italic: '기울임꼴',
      underline: '밑줄',
      superscript: '위첨자',
      subscript: '아래첨자',
      highlight: '강조',
      inlineCode: '인라인 코드',
      inlineMath: '인라인 수식',
      strikethrough: '취소선',
      hyperlink: '하이퍼링크',
      image: '이미지',
      clearFormatting: '서식 지우기'
    },
    theme: {
      root: '테마(&T)',
      light: '카드뮴 라이트',
      dark: '다크',
      graphite: '그래파이트 라이트',
      materialDark: '머티리얼 다크',
      oneDark: '원 다크',
      ulysses: '율리시스 라이트'
    },
    view: {
      root: '보기(&V)',
      commandPalette: '명령 팔레트...',
      sourceCodeMode: '소스 코드 모드',
      typewriterMode: '타자기 모드',
      focusMode: '집중 모드',
      showSidebar: '사이드바 표시',
      showTabBar: '탭 표시줄 표시',
      toggleToc: '목차 전환',
      reloadImages: '이미지 다시 로드',
      showDevTools: '개발자 도구 표시',
      reloadWindow: '창 다시 로드'
    },
    window: {
      root: '창(&W)',
      minimize: '최소화',
      alwaysOnTop: '항상 위에',
      zoomIn: '확대',
      zoomOut: '축소',
      showInFullScreen: '전체 화면으로 표시',
      bringAllToFront: '모두 앞으로 가져오기'
    },
    help: {
      root: '도움말(&H)',
      quickStart: '빠른 시작...',
      markdownReference: '마크다운 참조...',
      changelog: '변경 로그...',
      donate: 'Open Collective로 기부...',
      feedbackViaTwitter: 'Twitter로 피드백...',
      reportIssue: '문제 보고 또는 기능 요청...',
      website: '웹사이트...',
      watchOnGitHub: 'GitHub에서 보기...',
      followOnGitHub: 'GitHub에서 팔로우...',
      followOnTwitter: 'Twitter에서 팔로우...',
      license: '라이센스...',
      checkForUpdates: '업데이트 확인...',
      about: 'Macaron 정보...'
    },
    dock: {
      open: '열기...',
      clearRecent: '최근 항목 지우기'
    }
  }
}
