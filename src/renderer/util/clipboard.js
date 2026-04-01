import { ipcRenderer } from 'electron'
import { isLinux } from './index'

export const guessClipboardFilePath = async () => {
  if (isLinux) return ''
  return ipcRenderer.invoke('mt::clipboard-get-file-path')
}
