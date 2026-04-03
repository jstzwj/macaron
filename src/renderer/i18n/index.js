import { shallowRef } from 'vue'
import { createI18n } from 'vue-i18n'
// Element Plus locales
import enElement from 'element-plus/dist/locale/en.mjs'
import zhCnElement from 'element-plus/dist/locale/zh-cn.mjs'
import zhTwElement from 'element-plus/dist/locale/zh-tw.mjs'
import jaElement from 'element-plus/dist/locale/ja.mjs'
import koElement from 'element-plus/dist/locale/ko.mjs'
import frElement from 'element-plus/dist/locale/fr.mjs'
import esElement from 'element-plus/dist/locale/es.mjs'
import ptElement from 'element-plus/dist/locale/pt.mjs'
import plElement from 'element-plus/dist/locale/pl.mjs'
import trElement from 'element-plus/dist/locale/tr.mjs'
import arElement from 'element-plus/dist/locale/ar.mjs'
import messages from '../../common/i18nMessages'
import { DEFAULT_LOCALE, resolveLocale } from '../../common/i18n'

const elementLocaleMap = {
  en: enElement,
  'zh-CN': zhCnElement,
  'zh-TW': zhTwElement,
  ja: jaElement,
  ko: koElement,
  fr: frElement,
  es: esElement,
  pt: ptElement,
  pl: plElement,
  tr: trElement,
  ar: arElement
}

export const elementLocale = shallowRef(elementLocaleMap[DEFAULT_LOCALE])

let i18n

const syncElementLocale = locale => {
  elementLocale.value = elementLocaleMap[locale] || elementLocaleMap[DEFAULT_LOCALE]
}

export const setupI18n = ({ preferredLanguage, systemLocale }) => {
  const locale = resolveLocale(preferredLanguage, systemLocale)

  i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    messages
  })

  syncElementLocale(locale)
  return i18n
}

export const setRendererLanguage = (preferredLanguage, systemLocale) => {
  const locale = resolveLocale(preferredLanguage, systemLocale)
  if (i18n) {
    i18n.global.locale.value = locale
  }
  syncElementLocale(locale)
  return locale
}

export const translate = key => {
  if (!i18n) {
    return key
  }
  return i18n.global.t(key)
}
