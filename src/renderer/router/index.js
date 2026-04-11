const parseSettingsPage = type => {
  let pageUrl = '/preference'
  if (/\/spelling$/.test(type)) {
    pageUrl += '/spelling'
  }
  return pageUrl
}

const routes = type => ([{
  path: '/', redirect: type === 'editor' ? '/editor' : parseSettingsPage(type)
}, {
  path: '/editor',
  component: () => import(/* webpackChunkName: "app" */ '@/pages/app')
}, {
  path: '/preference',
  component: () => import(/* webpackChunkName: "preference" */ '@/pages/preference'),
  children: [{
    path: '',
    component: () => import(/* webpackChunkName: "pref-general" */ '@/prefComponents/general')
  }, {
    path: 'general', component: () => import(/* webpackChunkName: "pref-general" */ '@/prefComponents/general'), name: 'general'
  }, {
    path: 'editor', component: () => import(/* webpackChunkName: "pref-editor" */ '@/prefComponents/editor'), name: 'editor'
  }, {
    path: 'markdown', component: () => import(/* webpackChunkName: "pref-markdown" */ '@/prefComponents/markdown'), name: 'markdown'
  }, {
    path: 'spelling', component: () => import(/* webpackChunkName: "pref-spelling" */ '@/prefComponents/spellchecker'), name: 'spelling'
  }, {
    path: 'theme', component: () => import(/* webpackChunkName: "pref-theme" */ '@/prefComponents/theme'), name: 'theme'
  }, {
    path: 'image', component: () => import(/* webpackChunkName: "pref-image" */ '@/prefComponents/image'), name: 'image'
  }, {
    path: 'keybindings', component: () => import(/* webpackChunkName: "pref-keybindings" */ '@/prefComponents/keybindings'), name: 'keybindings'
  }]
}])

export default routes
