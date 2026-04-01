import { ipcRenderer } from 'electron'
import * as contextMenu from './actions'

let isListening = false

const handleMenuAction = (event, { type }) => {
  switch (type) {
    case 'new-file':
      contextMenu.newFile()
      break
    case 'new-directory':
      contextMenu.newDirectory()
      break
    case 'copy':
      contextMenu.copy()
      break
    case 'cut':
      contextMenu.cut()
      break
    case 'paste':
      contextMenu.paste()
      break
    case 'rename':
      contextMenu.rename()
      break
    case 'delete':
      contextMenu.remove()
      break
    case 'show-in-folder':
      contextMenu.showInFolder()
      break
  }
}

const ensureMenuListener = () => {
  if (!isListening) {
    ipcRenderer.on('mt::context-menu-sidebar-action', handleMenuAction)
    isListening = true
  }
}

export const showContextMenu = (event, hasPathCache) => {
  ensureMenuListener()
  ipcRenderer.send('mt::popup-sidebar-context-menu', {
    x: event.clientX,
    y: event.clientY,
    hasPathCache
  })
}
