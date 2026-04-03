import { createApp, h } from 'vue'
import sourceMapSupport from 'source-map-support'
import bootstrapRenderer from './bootstrap'
import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import axios from './axios'
import store from './store'
import services from './services'
import routes from './router'
import { installUiLibrary } from './ui'

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

// -----------------------------------------------
// Be careful when changing code before this line!

const app = createApp({
  render: () => h(RouterView, { class: 'view' })
})

installUiLibrary(app)

app.config.globalProperties.$http = axios

services.forEach(s => {
  app.config.globalProperties['$' + s.name] = s[s.name]
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes(global.marktext.env.type)
})

app.use(store)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
