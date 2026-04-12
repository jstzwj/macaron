import fs from 'fs-extra'
import path from 'path'
import { app } from 'electron'
import log from 'electron-log/main'
import axios from 'axios'

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/LibreOffice/dictionaries/master'

// Mapping from our language codes to LibreOffice dictionary paths
// Source: https://github.com/LibreOffice/dictionaries
const DICTIONARY_SOURCES = {
  'af-ZA': { dir: 'af_ZA', aff: 'af_ZA.aff', dic: 'af_ZA.dic' },
  'an-ES': { dir: 'an_ES', aff: 'an_ES.aff', dic: 'an_ES.dic' },
  ar: { dir: 'ar', aff: 'ar.aff', dic: 'ar.dic' },
  'as-IN': { dir: 'as_IN', aff: 'as_IN.aff', dic: 'as_IN.dic' },
  'be-BY': { dir: 'be_BY', aff: 'be_BY.aff', dic: 'be_BY.dic' },
  'bg-BG': { dir: 'bg_BG', aff: 'bg_BG.aff', dic: 'bg_BG.dic' },
  'bn-BD': { dir: 'bn_BD', aff: 'bn_BD.aff', dic: 'bn_BD.dic' },
  bo: { dir: 'bo', aff: 'bo.aff', dic: 'bo.dic' },
  'br-FR': { dir: 'br_FR', aff: 'br_FR.aff', dic: 'br_FR.dic' },
  'bs-BA': { dir: 'bs_BA', aff: 'bs_BA.aff', dic: 'bs_BA.dic' },
  'ca-ES': { dir: 'ca/dictionaries', aff: 'ca.aff', dic: 'ca.dic' },
  ckb: { dir: 'ckb', aff: 'ckb.aff', dic: 'ckb.dic' },
  'cs-CZ': { dir: 'cs_CZ', aff: 'cs_CZ.aff', dic: 'cs_CZ.dic' },
  'da-DK': { dir: 'da_DK', aff: 'da_DK.aff', dic: 'da_DK.dic' },
  'de-DE': { dir: 'de', aff: 'de_DE_frami.aff', dic: 'de_DE_frami.dic' },
  'el-GR': { dir: 'el_GR', aff: 'el_GR.aff', dic: 'el_GR.dic' },
  'en-AU': { dir: 'en', aff: 'en_AU.aff', dic: 'en_AU.dic' },
  'en-CA': { dir: 'en', aff: 'en_CA.aff', dic: 'en_CA.dic' },
  'en-GB': { dir: 'en', aff: 'en_GB.aff', dic: 'en_GB.dic' },
  'en-ZA': { dir: 'en', aff: 'en_ZA.aff', dic: 'en_ZA.dic' },
  'en-US': { dir: 'en', aff: 'en_US.aff', dic: 'en_US.dic' },
  eo: { dir: 'eo', aff: 'eo.aff', dic: 'eo.dic' },
  'es-ES': { dir: 'es', aff: 'es_ES.aff', dic: 'es_ES.dic' },
  'es-MX': { dir: 'es', aff: 'es_MX.aff', dic: 'es_MX.dic' },
  'es-US': { dir: 'es', aff: 'es_US.aff', dic: 'es_US.dic' },
  'et-EE': { dir: 'et_EE', aff: 'et_EE.aff', dic: 'et_EE.dic' },
  'fa-IR': { dir: 'fa_IR', aff: 'fa-IR.aff', dic: 'fa-IR.dic' },
  'fo-FO': { dir: 'fo', aff: 'fo_FO.aff', dic: 'fo_FO.dic' },
  'fr-FR': { dir: 'fr_FR', aff: 'fr.aff', dic: 'fr.dic' },
  'gd-GB': { dir: 'gd_GB', aff: 'gd_GB.aff', dic: 'gd_GB.dic' },
  'gl-ES': { dir: 'gl', aff: 'gl.aff', dic: 'gl.dic' },
  'gu-IN': { dir: 'gu_IN', aff: 'gu_IN.aff', dic: 'gu_IN.dic' },
  gug: { dir: 'gug', aff: 'gug.aff', dic: 'gug.dic' },
  'he-IL': { dir: 'he_IL', aff: 'he_IL.aff', dic: 'he_IL.dic' },
  'hi-IN': { dir: 'hi_IN', aff: 'hi_IN.aff', dic: 'hi_IN.dic' },
  'hr-HR': { dir: 'hr_HR', aff: 'hr_HR.aff', dic: 'hr_HR.dic' },
  'hu-HU': { dir: 'hu_HU', aff: 'hu_HU.aff', dic: 'hu_HU.dic' },
  'id-ID': { dir: 'id', aff: 'id_ID.aff', dic: 'id_ID.dic' },
  'is-IS': { dir: 'is', aff: 'is.aff', dic: 'is.dic' },
  'it-IT': { dir: 'it_IT', aff: 'it_IT.aff', dic: 'it_IT.dic' },
  'kn-IN': { dir: 'kn_IN', aff: 'kn_IN.aff', dic: 'kn_IN.dic' },
  'ko-KR': { dir: 'ko_KR', aff: 'ko_KR.aff', dic: 'ko_KR.dic' },
  'kmr-Latn': { dir: 'kmr_Latn', aff: 'kmr-Latn.aff', dic: 'kmr-Latn.dic' },
  'lo-LA': { dir: 'lo_LA', aff: 'lo_LA.aff', dic: 'lo_LA.dic' },
  'lt-LT': { dir: 'lt_LT', aff: 'lt.aff', dic: 'lt.dic' },
  'lv-LV': { dir: 'lv_LV', aff: 'lv_LV.aff', dic: 'lv_LV.dic' },
  'mr-IN': { dir: 'mr_IN', aff: 'mr_IN.aff', dic: 'mr_IN.dic' },
  'mn-MN': { dir: 'mn_MN', aff: 'mn_MN.aff', dic: 'mn_MN.dic' },
  'ne-NP': { dir: 'ne_NP', aff: 'ne_NP.aff', dic: 'ne_NP.dic' },
  'nb-NO': { dir: 'no', aff: 'nb_NO.aff', dic: 'nb_NO.dic' },
  'nl-NL': { dir: 'nl_NL', aff: 'nl_NL.aff', dic: 'nl_NL.dic' },
  'nn-NO': { dir: 'no', aff: 'nn_NO.aff', dic: 'nn_NO.dic' },
  'oc-FR': { dir: 'oc_FR', aff: 'oc_FR.aff', dic: 'oc_FR.dic' },
  'or-IN': { dir: 'or_IN', aff: 'or_IN.aff', dic: 'or_IN.dic' },
  'pa-IN': { dir: 'pa_IN', aff: 'pa_IN.aff', dic: 'pa_IN.dic' },
  'pl-PL': { dir: 'pl_PL', aff: 'pl_PL.aff', dic: 'pl_PL.dic' },
  'pt-BR': { dir: 'pt_BR', aff: 'pt_BR.aff', dic: 'pt_BR.dic' },
  'pt-PT': { dir: 'pt_PT', aff: 'pt_PT.aff', dic: 'pt_PT.dic' },
  'ro-RO': { dir: 'ro', aff: 'ro_RO.aff', dic: 'ro_RO.dic' },
  'ru-RU': { dir: 'ru_RU', aff: 'ru_RU.aff', dic: 'ru_RU.dic' },
  'sa-IN': { dir: 'sa_IN', aff: 'sa_IN.aff', dic: 'sa_IN.dic' },
  'si-LK': { dir: 'si_LK', aff: 'si_LK.aff', dic: 'si_LK.dic' },
  'sk-SK': { dir: 'sk_SK', aff: 'sk_SK.aff', dic: 'sk_SK.dic' },
  'sl-SI': { dir: 'sl_SI', aff: 'sl_SI.aff', dic: 'sl_SI.dic' },
  'sq-AL': { dir: 'sq_AL', aff: 'sq_AL.aff', dic: 'sq_AL.dic' },
  sh: { dir: 'sr', aff: 'sr-Latn.aff', dic: 'sr-Latn.dic' },
  sr: { dir: 'sr', aff: 'sr.aff', dic: 'sr.dic' },
  'sv-SE': { dir: 'sv_SE', aff: 'sv_SE.aff', dic: 'sv_SE.dic' },
  'sw-TZ': { dir: 'sw_TZ', aff: 'sw_TZ.aff', dic: 'sw_TZ.dic' },
  'ta-IN': { dir: 'ta_IN', aff: 'ta_IN.aff', dic: 'ta_IN.dic' },
  'te-IN': { dir: 'te_IN', aff: 'te_IN.aff', dic: 'te_IN.dic' },
  'th-TH': { dir: 'th_TH', aff: 'th_TH.aff', dic: 'th_TH.dic' },
  'tr-TR': { dir: 'tr_TR', aff: 'tr_TR.aff', dic: 'tr_TR.dic' },
  'uk-UA': { dir: 'uk_UA', aff: 'uk_UA.aff', dic: 'uk_UA.dic' },
  ur: { dir: 'ur', aff: 'ur.aff', dic: 'ur.dic' },
  'vi-VN': { dir: 'vi', aff: 'vi_VN.aff', dic: 'vi_VN.dic' },
  'zu-ZA': { dir: 'zu_ZA', aff: 'zu_ZA.aff', dic: 'zu_ZA.dic' }
}

export const HUNSPELL_SUPPORTED_LANGUAGES = Object.keys(DICTIONARY_SOURCES)

class DictionaryManager {
  constructor () {
    this.dictionaryPath = path.join(app.getPath('userData'), 'hunspell-dictionaries')
  }

  /**
   * Check if a dictionary for the given language exists locally.
   */
  async hasDictionary (langCode) {
    const source = DICTIONARY_SOURCES[langCode]
    if (!source) return false
    const affPath = path.join(this.dictionaryPath, langCode, source.aff)
    const dicPath = path.join(this.dictionaryPath, langCode, source.dic)
    return fs.existsSync(affPath) && fs.existsSync(dicPath)
  }

  /**
   * Get the path to the .aff file for a language.
   */
  getAffPath (langCode) {
    const source = DICTIONARY_SOURCES[langCode]
    if (!source) return null
    const affPath = path.join(this.dictionaryPath, langCode, source.aff)
    return fs.existsSync(affPath) ? affPath : null
  }

  /**
   * Get the path to the .dic file for a language.
   */
  getDicPath (langCode) {
    const source = DICTIONARY_SOURCES[langCode]
    if (!source) return null
    const dicPath = path.join(this.dictionaryPath, langCode, source.dic)
    return fs.existsSync(dicPath) ? dicPath : null
  }

  /**
   * Download a dictionary from LibreOffice GitHub repository.
   * @param {string} langCode - Language code
   * @param {function} [progressCb] - Optional progress callback (bytesDownloaded, totalBytes)
   * @returns {Promise<boolean>}
   */
  async downloadDictionary (langCode, progressCb) {
    const source = DICTIONARY_SOURCES[langCode]
    if (!source) {
      log.error(`[DictionaryManager] No dictionary source for language: ${langCode}`)
      return false
    }

    const destDir = path.join(this.dictionaryPath, langCode)
    await fs.ensureDir(destDir)

    const baseUrl = `${GITHUB_RAW_BASE}/${source.dir}`

    try {
      await this._downloadFile(`${baseUrl}/${source.aff}`, path.join(destDir, source.aff), progressCb)
      await this._downloadFile(`${baseUrl}/${source.dic}`, path.join(destDir, source.dic), progressCb)
      log.info(`[DictionaryManager] Downloaded dictionary for ${langCode}`)
      return true
    } catch (error) {
      log.error(`[DictionaryManager] Failed to download dictionary for ${langCode}:`, error.message)
      // Clean up partial download
      await fs.remove(destDir).catch(() => {})
      return false
    }
  }

  /**
   * List all locally available dictionaries.
   * @returns {Promise<string[]>}
   */
  async getAvailableDictionaries () {
    const available = []
    for (const langCode of HUNSPELL_SUPPORTED_LANGUAGES) {
      if (await this.hasDictionary(langCode)) {
        available.push(langCode)
      }
    }
    return available
  }

  /**
   * Remove a downloaded dictionary.
   */
  async removeDictionary (langCode) {
    const destDir = path.join(this.dictionaryPath, langCode)
    await fs.remove(destDir)
  }

  /**
   * Get all supported language codes.
   */
  getAllSupportedLanguages () {
    return [...HUNSPELL_SUPPORTED_LANGUAGES]
  }

  /**
   * Internal: download a single file with optional progress callback.
   */
  async _downloadFile (url, destPath, progressCb) {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000
    })

    const totalBytes = parseInt(response.headers['content-length'], 10)
    let downloadedBytes = 0

    const writer = fs.createWriteStream(destPath)

    response.data.on('data', (chunk) => {
      downloadedBytes += chunk.length
      if (progressCb && totalBytes) {
        progressCb(downloadedBytes, totalBytes)
      }
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
      response.data.on('error', reject)
    })
  }
}

export default DictionaryManager
