import { app } from 'electron'
import messages from '../../common/i18nMessages'
import { DEFAULT_LOCALE, resolveLocale } from '../../common/i18n'

class I18n {
  constructor () {
    this.locale = DEFAULT_LOCALE
  }

  setLanguage (preferredLanguage, systemLocale) {
    this.locale = resolveLocale(preferredLanguage, systemLocale)
    return this.locale
  }

  getSystemLocale () {
    return app.getLocale()
  }

  t (key) {
    const localeMessages = messages[this.locale] || messages[DEFAULT_LOCALE]
    const fallbackMessages = messages[DEFAULT_LOCALE]
    const value = this._get(localeMessages, key) || this._get(fallbackMessages, key)
    return typeof value === 'string' ? value : key
  }

  _get (obj, key) {
    return key.split('.').reduce((acc, part) => {
      if (acc && typeof acc === 'object') {
        return acc[part]
      }
      return undefined
    }, obj)
  }
}

export default I18n
