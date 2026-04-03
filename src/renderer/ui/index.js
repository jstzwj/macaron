import ElementPlus from 'element-plus'
import lang from 'element-plus/dist/locale/en.mjs'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export const installUiLibrary = app => {
  app.use(ElementPlus, { locale: lang })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
