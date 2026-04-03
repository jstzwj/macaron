export const DEFAULT_LOCALE = 'en'
export const SYSTEM_LANGUAGE = 'system'
export const SUPPORTED_LOCALES = [
  'en',
  'zh-CN',
  'zh-TW',
  'ja',
  'ko',
  'fr',
  'es',
  'pt',
  'pl',
  'tr',
  'ar'
]

export const LANGUAGE_LABELS = {
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

const BASE_LANGUAGE_MAP = {
  en: 'en',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  ja: 'ja',
  ko: 'ko',
  fr: 'fr',
  es: 'es',
  pt: 'pt',
  pl: 'pl',
  tr: 'tr',
  ar: 'ar'
}

const normalizeLocale = locale => {
  if (!locale || typeof locale !== 'string') {
    return ''
  }

  const trimmed = locale.replace(/_/g, '-').trim()
  if (!trimmed) {
    return ''
  }

  const parts = trimmed.split('-').filter(Boolean)
  if (parts.length === 0) {
    return ''
  }

  const [language, ...rest] = parts
  const normalizedLanguage = language.toLowerCase()
  const normalizedRest = rest.map(part => part.length === 2 ? part.toUpperCase() : part)
  return [normalizedLanguage, ...normalizedRest].join('-')
}

export const resolveLocale = (preferredLanguage, systemLocale) => {
  const normalizedPreferred = normalizeLocale(preferredLanguage)
  const normalizedSystem = normalizeLocale(systemLocale)

  if (normalizedPreferred && normalizedPreferred !== SYSTEM_LANGUAGE) {
    if (SUPPORTED_LOCALES.includes(normalizedPreferred)) {
      return normalizedPreferred
    }

    const preferredBase = normalizedPreferred.split('-')[0]
    if (BASE_LANGUAGE_MAP[preferredBase]) {
      return BASE_LANGUAGE_MAP[preferredBase]
    }
  }

  if (!normalizedPreferred || normalizedPreferred === SYSTEM_LANGUAGE) {
    if (SUPPORTED_LOCALES.includes(normalizedSystem)) {
      return normalizedSystem
    }

    const systemBase = normalizedSystem.split('-')[0]
    if (BASE_LANGUAGE_MAP[systemBase]) {
      return BASE_LANGUAGE_MAP[systemBase]
    }
  }

  return DEFAULT_LOCALE
}

export const getSupportedLanguageOptions = () => {
  return [SYSTEM_LANGUAGE, ...SUPPORTED_LOCALES]
}

export const getLanguageLabel = locale => {
  return LANGUAGE_LABELS[locale] || locale
}
