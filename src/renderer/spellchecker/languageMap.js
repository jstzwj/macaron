import langMap from 'iso-639-1'

/**
 * Return the native language name by language code.
 *
 * @param {string} langCode The ISO two or four-letter language code (e.g. en, en-US) or BCP-47 code.
 */
export const getLanguageName = languageCode => {
  if (!languageCode || languageCode.length < 2) {
    return null
  }

  let language = ''

  // First try to get an exact language via 4-letter ISO code.
  if (languageCode.length === 5) {
    language = getHunspellLanguageName(languageCode)
    if (language) {
      return language
    }
  }

  language = langMap.getNativeName(languageCode.substr(0, 2))
  if (language) {
    // Add language code to distinguish between native name (en-US, en-GB, ...).
    return `${language} (${languageCode})`
  }
  return `Unknown (${languageCode})`
}

/**
 * Return the native language name by language code for supported Hunspell languages.
 *
 * @param {string} langCode The ISO 4-letter language code.
 */
const getHunspellLanguageName = langCode => {
  const item = HUNSPELL_DICTIONARY_LANGUAGE_MAP.find(item => item.value === langCode)
  if (!item) {
    return null
  }
  return item.label
}

// All available Hunspell dictionary languages (sourced from LibreOffice/dictionaries).
const HUNSPELL_DICTIONARY_LANGUAGE_MAP = Object.freeze([{
  label: 'Afrikaans',
  value: 'af-ZA'
}, {
  label: 'Aragonés',
  value: 'an-ES'
}, {
  label: 'العربية',
  value: 'ar'
}, {
  label: 'অসমীয়া',
  value: 'as-IN'
}, {
  label: 'Беларуская',
  value: 'be-BY'
}, {
  label: 'Български език',
  value: 'bg-BG'
}, {
  label: 'বাংলা',
  value: 'bn-BD'
}, {
  label: 'བོད་སྐད',
  value: 'bo'
}, {
  label: 'Brezhoneg',
  value: 'br-FR'
}, {
  label: 'Bosanski',
  value: 'bs-BA'
}, {
  label: 'Català',
  value: 'ca-ES'
}, {
  label: 'Central Kurdish (Sorani)',
  value: 'ckb'
}, {
  label: 'Čeština',
  value: 'cs-CZ'
}, {
  label: 'Dansk',
  value: 'da-DK'
}, {
  label: 'Deutsch',
  value: 'de-DE'
}, {
  label: 'Ελληνικά',
  value: 'el-GR'
}, {
  label: 'English (en-AU)',
  value: 'en-AU'
}, {
  label: 'English (en-CA)',
  value: 'en-CA'
}, {
  label: 'English (en-GB)',
  value: 'en-GB'
}, {
  label: 'English (en-ZA)',
  value: 'en-ZA'
}, {
  label: 'English (en-US)',
  value: 'en-US'
}, {
  label: 'Esperanto',
  value: 'eo'
}, {
  label: 'Español',
  value: 'es-ES'
}, {
  label: 'Español (México)',
  value: 'es-MX'
}, {
  label: 'Español (Estados Unidos)',
  value: 'es-US'
}, {
  label: 'Eesti',
  value: 'et-EE'
}, {
  label: 'فارسی',
  value: 'fa-IR'
}, {
  label: 'Føroyskt',
  value: 'fo-FO'
}, {
  label: 'Français',
  value: 'fr-FR'
}, {
  label: 'Gàidhlig',
  value: 'gd-GB'
}, {
  label: 'Galego',
  value: 'gl-ES'
}, {
  label: 'ગુજરાતી',
  value: 'gu-IN'
}, {
  label: 'Avañe\'ẽ',
  value: 'gug'
}, {
  label: 'עברית',
  value: 'he-IL'
}, {
  label: 'हिन्दी',
  value: 'hi-IN'
}, {
  label: 'Hrvatski',
  value: 'hr-HR'
}, {
  label: 'Magyar',
  value: 'hu-HU'
}, {
  label: 'Bahasa Indonesia',
  value: 'id-ID'
}, {
  label: 'Íslenska',
  value: 'is-IS'
}, {
  label: 'Italiano',
  value: 'it-IT'
}, {
  label: 'ಕನ್ನಡ',
  value: 'kn-IN'
}, {
  label: '한국어',
  value: 'ko-KR'
}, {
  label: 'Kurdî (Kurmancî)',
  value: 'kmr-Latn'
}, {
  label: 'ພາສາລາວ',
  value: 'lo-LA'
}, {
  label: 'Lietuvių',
  value: 'lt-LT'
}, {
  label: 'Latviešu',
  value: 'lv-LV'
}, {
  label: 'मराठी',
  value: 'mr-IN'
}, {
  label: 'Монгол хэл',
  value: 'mn-MN'
}, {
  label: 'नेपाली',
  value: 'ne-NP'
}, {
  label: 'Norsk bokmål',
  value: 'nb-NO'
}, {
  label: 'Nederlands',
  value: 'nl-NL'
}, {
  label: 'Norsk nynorsk',
  value: 'nn-NO'
}, {
  label: 'Occitan',
  value: 'oc-FR'
}, {
  label: 'ଓଡ଼ିଆ',
  value: 'or-IN'
}, {
  label: 'ਪੰਜਾਬੀ',
  value: 'pa-IN'
}, {
  label: 'Polski',
  value: 'pl-PL'
}, {
  label: 'Português (pt-BR)',
  value: 'pt-BR'
}, {
  label: 'Português (pt-PT)',
  value: 'pt-PT'
}, {
  label: 'Română',
  value: 'ro-RO'
}, {
  label: 'Русский',
  value: 'ru-RU'
}, {
  label: 'संस्कृतम्',
  value: 'sa-IN'
}, {
  label: 'සිංහල',
  value: 'si-LK'
}, {
  label: 'Slovenčina',
  value: 'sk-SK'
}, {
  label: 'Slovenščina',
  value: 'sl-SI'
}, {
  label: 'Shqip',
  value: 'sq-AL'
}, {
  label: 'Српски језик (Latin)',
  value: 'sh'
}, {
  label: 'Српски језик',
  value: 'sr'
}, {
  label: 'Svenska',
  value: 'sv-SE'
}, {
  label: 'Kiswahili',
  value: 'sw-TZ'
}, {
  label: 'தமிழ்',
  value: 'ta-IN'
}, {
  label: 'తెలుగు',
  value: 'te-IN'
}, {
  label: 'ภาษาไทย',
  value: 'th-TH'
}, {
  label: 'Türkçe',
  value: 'tr-TR'
}, {
  label: 'Українська',
  value: 'uk-UA'
}, {
  label: 'اردو',
  value: 'ur'
}, {
  label: 'Tiếng Việt',
  value: 'vi-VN'
}, {
  label: 'isiZulu',
  value: 'zu-ZA'
}])
