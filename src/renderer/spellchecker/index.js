import { ipcRenderer } from 'electron'
import { isOsx } from '@/util'

/**
 * High level spell checker API based on Hunspell.
 * All languages use Hunspell for consistent behavior.
 */
export class SpellChecker {
  /**
   * ctor
   *
   * @param {boolean} enabled Whether spell checking is enabled in settings.
   */
  constructor (enabled = true, lang) {
    this.enabled = enabled
    this.currentSpellcheckerLanguage = lang

    // Whether the Hunspell provider is available and initialized
    this.isProviderAvailable = true
  }

  /**
   * Whether the spell checker is available and enabled.
   */
  get isEnabled () {
    return this.isProviderAvailable && this.enabled
  }

  /**
   * Enable the spell checker and sets the language.
   *
   * @param {string} lang The language to set.
   * @returns {Promise<boolean>}
   */
  async activateSpellchecker (lang) {
    try {
      this.enabled = true
      this.isProviderAvailable = true

      // Keep native spellcheck enabled for underline rendering.
      await ipcRenderer.invoke('mt::spellchecker-set-enabled', true)

      if (isOsx) {
        // On macOS the OS spell checker is used and will detect the language automatically.
        return true
      }

      const targetLang = lang || this.currentSpellcheckerLanguage
      if (!targetLang) {
        throw new Error('Expected non-empty language for spell checker.')
      }

      // Best-effort: configure Chromium spellchecker language for red underline rendering.
      await ipcRenderer.invoke('mt::spellchecker-switch-language', targetLang)

      // Use Hunspell for all languages on Windows/Linux
      const success = await ipcRenderer.invoke('mt::hunspell-switch-language', targetLang)
      if (!success) {
        // Dictionary not available locally - try to download
        const hasDict = await ipcRenderer.invoke('mt::hunspell-has-dictionary', targetLang)
        if (!hasDict) {
          const downloaded = await ipcRenderer.invoke('mt::hunspell-download-dictionary', targetLang)
          if (downloaded) {
            await ipcRenderer.invoke('mt::hunspell-switch-language', targetLang)
          } else {
            this.isProviderAvailable = false
            return false
          }
        } else {
          this.isProviderAvailable = false
          return false
        }
      }
      this.lang = targetLang
      return true
    } catch (error) {
      this.deactivateSpellchecker()
      throw error
    }
  }

  /**
   * Disables the spell checker.
   */
  deactivateSpellchecker () {
    this.enabled = false
    this.isProviderAvailable = false
    ipcRenderer.invoke('mt::spellchecker-set-enabled', false).catch(() => {})
  }

  /**
   * Return the current language.
   */
  get lang () {
    if (this.isEnabled) {
      return this.currentSpellcheckerLanguage
    }
    return ''
  }

  set lang (lang) {
    this.currentSpellcheckerLanguage = lang
  }

  /**
   * Explicitly switch the language to a specific language.
   *
   * NOTE: This function can throw an exception.
   *
   * @param {string} lang The language code
   * @returns {Promise<boolean>} Return true on success or false.
   */
  async switchLanguage (lang) {
    if (isOsx) {
      // NB: On macOS the OS spell checker is used and will detect the language automatically.
      return true
    } else if (!lang) {
      throw new Error('Expected non-empty language for spell checker.')
    } else if (this.isEnabled) {
      return this.activateSpellchecker(lang)
    }
    return false
  }

  /**
   * Check if a word is misspelled.
   * @param {string} word
   * @returns {Promise<boolean>}
   */
  async checkWord (word) {
    return ipcRenderer.invoke('mt::hunspell-is-misspelled', word)
  }

  /**
   * Get spelling suggestions for a word.
   * @param {string} word
   * @returns {Promise<string[]>}
   */
  async getSuggestions (word) {
    return ipcRenderer.invoke('mt::hunspell-get-suggestions', word) || []
  }

  /**
   * Add word to Hunspell user dictionary.
   * @param {string} word
   * @returns {Promise<boolean>}
   */
  async addToDictionary (word) {
    return ipcRenderer.invoke('mt::hunspell-add-to-dictionary', word)
  }

  /**
   * Returns a list of available (downloaded) Hunspell dictionaries.
   * @returns {Promise<string[]>} Available dictionary languages.
   */
  static async getAvailableDictionaries () {
    if (isOsx) {
      // NB: On macOS the OS spell checker is used and will detect the language automatically.
      return []
    }
    return ipcRenderer.invoke('mt::hunspell-get-available-dictionaries')
  }

  /**
   * Returns all supported Hunspell language codes.
   * @returns {Promise<string[]>}
   */
  static async getAllLanguages () {
    try {
      return ipcRenderer.invoke('mt::hunspell-all-languages')
    } catch (error) {
      return []
    }
  }

  /**
   * Download a Hunspell dictionary.
   * @param {string} lang
   * @returns {Promise<boolean>}
   */
  static async downloadDictionary (lang) {
    return ipcRenderer.invoke('mt::hunspell-download-dictionary', lang)
  }

  /**
   * Check if a Hunspell dictionary is available locally.
   * @param {string} lang
   * @returns {Promise<boolean>}
   */
  static async hasDictionary (lang) {
    return ipcRenderer.invoke('mt::hunspell-has-dictionary', lang)
  }
}
