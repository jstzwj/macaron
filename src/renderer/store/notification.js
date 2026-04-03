import { ipcRenderer, shell } from 'electron'
import notice from '../services/notification'
import { translate } from '../i18n'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  LISTEN_FOR_NOTIFICATION ({ commit }) {
    const DEFAULT_OPTS = {
      title: translate('notification.information'),
      type: 'primary',
      time: 10000,
      message: translate('notification.defaultMessage')
    }

    ipcRenderer.on('mt::show-notification', (e, opts) => {
      const options = Object.assign({}, DEFAULT_OPTS, opts)

      notice.notify(options)
    })

    ipcRenderer.on('mt::pandoc-not-exists', async (e, opts) => {
      const options = Object.assign({}, DEFAULT_OPTS, opts)
      options.showConfirm = true
      await notice.notify(options)
      shell.openExternal('http://pandoc.org')
    })
  }
}

export default { state, getters, mutations, actions }
