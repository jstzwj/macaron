import { ipcRenderer } from 'electron'
import * as contextMenu from './actions'

let isListening = false

const handleMenuAction = (event, { type, tabId }) => {
  switch (type) {
    case 'close-this':
      contextMenu.closeThis(tabId)
      break
    case 'close-others':
      contextMenu.closeOthers(tabId)
      break
    case 'close-saved':
      contextMenu.closeSaved()
      break
    case 'close-all':
      contextMenu.closeAll()
      break
    case 'rename':
      contextMenu.rename(tabId)
      break
    case 'copy-path':
      contextMenu.copyPath(tabId)
      break
    case 'show-in-folder':
      contextMenu.showInFolder(tabId)
      break
  }
}

const ensureMenuListener = () => {
  if (!isListening) {
    ipcRenderer.on('mt::context-menu-tabs-action', handleMenuAction)
    isListening = true
  }
}

export const showContextMenu = (event, tab) => {
  ensureMenuListener()
  ipcRenderer.send('mt::popup-tabs-context-menu', {
    x: event.clientX,
    y: event.clientY,
    tab: {
      id: tab.id,
      pathname: tab.pathname
    }
  })
}
