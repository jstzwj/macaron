import { createApp, h } from 'vue'
import sourceMapSupport from 'source-map-support'
import bootstrapRenderer from './bootstrap'
import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import axios from './axios'
import store from './store'
import services from './services'
import routes from './router'
import { installUiLibrary } from './ui'
import { elementLocale, setupI18n } from './i18n'

import './assets/symbolIcon'
import './assets/styles/index.css'
import './assets/styles/printService.css'

// -----------------------------------------------

// Decode source map in production - must be registered first
sourceMapSupport.install({
  environment: 'node',
  handleUncaughtExceptions: false,
  hookRequire: false
})

global.marktext = {}
bootstrapRenderer()

// Suppress benign ResizeObserver loop error (browser limitation, not a real error)
const debounceResizeObserverError = e => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    e.stopImmediatePropagation()
  }
}
window.addEventListener('error', debounceResizeObserverError)
window.addEventListener('unhandledrejection', debounceResizeObserverError)

// -----------------------------------------------
// Be careful when changing code before this line!

const Root = {
  setup () {
    return () => h(RouterView, { class: 'view' })
  }
}

const app = createApp(Root)

const i18n = setupI18n({
  preferredLanguage: global.marktext.initialState.language,
  systemLocale: global.marktext.initialState.systemLocale
})

installUiLibrary(app, elementLocale.value)

app.config.globalProperties.$http = axios

services.forEach(s => {
  app.config.globalProperties['$' + s.name] = s[s.name]
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes(global.marktext.env.type)
})

app.use(store)
app.use(i18n)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
