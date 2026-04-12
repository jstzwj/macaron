import Nodehun from 'nodehun'
import fs from 'fs-extra'
import path from 'path'
import { app } from 'electron'
import log from 'electron-log/main'
import DictionaryManager, { HUNSPELL_SUPPORTED_LANGUAGES } from './DictionaryManager'

const USER_DICT_FILE = 'user-dictionary.json'

class HunspellService {
  constructor () {
    this.dictionaryManager = new DictionaryManager()
    this.spellchecker = null
    this.currentLanguage = null
    this.userDictionary = new Set()
    this.userDictionaryPath = path.join(app.getPath('userData'), USER_DICT_FILE)
    this._loadUserDictionary()
  }

  /**
   * Load the user dictionary from disk.
   */
  _loadUserDictionary () {
    try {
      if (fs.existsSync(this.userDictionaryPath)) {
        const data = fs.readJsonSync(this.userDictionaryPath)
        if (data && Array.isArray(data.words)) {
          this.userDictionary = new Set(data.words.map(w => w.normalize()))
          log.info(`[HunspellService] Loaded ${this.userDictionary.size} words from user dictionary`)
        }
      }
    } catch (error) {
      log.error('[HunspellService] Failed to load user dictionary:', error.message)
      this.userDictionary = new Set()
    }
  }

  /**
   * Persist the user dictionary to disk.
   */
  _saveUserDictionary () {
    try {
      fs.writeJsonSync(this.userDictionaryPath, {
        words: Array.from(this.userDictionary)
      }, { spaces: 2 })
    } catch (error) {
      log.error('[HunspellService] Failed to save user dictionary:', error.message)
    }
  }

  /**
   * Create a nodehun Spellchecker instance for the given language.
   * @returns {Promise<object|null>}
   */
  async _createSpellchecker (langCode) {
    const affPath = this.dictionaryManager.getAffPath(langCode)
    const dicPath = this.dictionaryManager.getDicPath(langCode)

    if (!affPath || !dicPath) {
      log.warn(`[HunspellService] Dictionary files not found for ${langCode}`)
      return null
    }

    try {
      const affBuffer = await fs.readFile(affPath)
      const dicBuffer = await fs.readFile(dicPath)
      const spellchecker = new Nodehun(affBuffer, dicBuffer)
      log.info(`[HunspellService] Created Hunspell spellchecker for ${langCode}`)
      return spellchecker
    } catch (error) {
      log.error(`[HunspellService] Failed to create Hunspell spellchecker for ${langCode}:`, error.message)
      return null
    }
  }

  /**
   * Initialize the service with a language. Downloads dictionary if needed.
   * @param {string} langCode
   * @param {function} [progressCb]
   * @returns {Promise<boolean>}
   */
  async initialize (langCode, progressCb) {
    if (!HUNSPELL_SUPPORTED_LANGUAGES.includes(langCode)) {
      log.warn(`[HunspellService] Language ${langCode} is not supported by Hunspell`)
      return false
    }

    if (!await this.dictionaryManager.hasDictionary(langCode)) {
      log.info(`[HunspellService] Dictionary for ${langCode} not found, downloading...`)
      const success = await this.dictionaryManager.downloadDictionary(langCode, progressCb)
      if (!success) {
        log.error(`[HunspellService] Failed to download dictionary for ${langCode}`)
        return false
      }
    }

    return this.setLanguage(langCode)
  }

  /**
   * Set the active spellcheck language.
   * @param {string} langCode
   * @returns {Promise<boolean>}
   */
  async setLanguage (langCode) {
    if (!HUNSPELL_SUPPORTED_LANGUAGES.includes(langCode)) {
      log.warn(`[HunspellService] Language ${langCode} is not supported by Hunspell`)
      return false
    }

    if (!await this.dictionaryManager.hasDictionary(langCode)) {
      log.warn(`[HunspellService] Dictionary for ${langCode} not available locally`)
      return false
    }

    const spellchecker = await this._createSpellchecker(langCode)
    if (!spellchecker) {
      return false
    }

    this.spellchecker = spellchecker
    this.currentLanguage = langCode
    log.info(`[HunspellService] Switched to language: ${langCode}`)
    return true
  }

  /**
   * Check if a word is misspelled.
   * @param {string} word
   * @returns {boolean}
   */
  isMisspelled (word) {
    if (!this.spellchecker) return false
    const normalized = word.normalize()
    if (this.userDictionary.has(normalized)) return false
    try {
      return !this.spellchecker.spellCorrect(normalized)
    } catch (error) {
      log.error('[HunspellService] spellCorrect error:', error.message)
      return false
    }
  }

  /**
   * Get spelling suggestions for a word.
   * @param {string} word
   * @returns {string[]|null}
   */
  getSuggestions (word) {
    if (!this.spellchecker) return null
    const normalized = word.normalize()
    try {
      return this.spellchecker.suggest(normalized) || []
    } catch (error) {
      log.error('[HunspellService] suggest error:', error.message)
      return []
    }
  }

  /**
   * Add a word to the user dictionary.
   * @param {string} word
   * @returns {boolean}
   */
  addToDictionary (word) {
    const normalized = word.normalize()
    this.userDictionary.add(normalized)
    this._saveUserDictionary()
    log.info(`[HunspellService] Added to user dictionary: ${normalized}`)
    return true
  }

  /**
   * Remove a word from the user dictionary.
   * @param {string} word
   * @returns {boolean}
   */
  removeFromDictionary (word) {
    const normalized = word.normalize()
    const deleted = this.userDictionary.delete(normalized)
    if (deleted) {
      this._saveUserDictionary()
      log.info(`[HunspellService] Removed from user dictionary: ${normalized}`)
    }
    return deleted
  }

  /**
   * Check if a word is correct (in user dict or main dict).
   * @param {string} word
   * @returns {boolean}
   */
  isWordCorrect (word) {
    const normalized = word.normalize()
    if (this.userDictionary.has(normalized)) return true
    if (!this.spellchecker) return true
    try {
      return this.spellchecker.spellCorrect(normalized)
    } catch (error) {
      return true
    }
  }

  /**
   * Get list of locally available dictionaries.
   * @returns {Promise<string[]>}
   */
  async getAvailableDictionaries () {
    return this.dictionaryManager.getAvailableDictionaries()
  }

  /**
   * Check if a language has a dictionary available.
   * @param {string} langCode
   * @returns {Promise<boolean>}
   */
  async hasDictionary (langCode) {
    return this.dictionaryManager.hasDictionary(langCode)
  }

  /**
   * Download a dictionary.
   * @param {string} langCode
   * @param {function} [progressCb]
   * @returns {Promise<boolean>}
   */
  async downloadDictionary (langCode, progressCb) {
    return this.dictionaryManager.downloadDictionary(langCode, progressCb)
  }

  /**
   * Get all supported language codes.
   */
  getAllSupportedLanguages () {
    return this.dictionaryManager.getAllSupportedLanguages()
  }

  /**
   * Get the current active language.
   */
  getCurrentLanguage () {
    return this.currentLanguage
  }

  /**
   * Check if the service is initialized with a spellchecker.
   */
  isReady () {
    return this.spellchecker !== null
  }

  /**
   * Get the user dictionary.
   * @returns {string[]}
   */
  getUserDictionary () {
    return Array.from(this.userDictionary)
  }

  /**
   * Get user dictionary path.
   */
  getUserDictionaryPath () {
    return this.userDictionaryPath
  }
}

export const hunspellService = new HunspellService()
export default hunspellService
