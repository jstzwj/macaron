import { ipcRenderer } from 'electron'
import log from 'electron-log/renderer'
import RendererPaths from './node/paths'

let exceptionLogger = s => console.error(s)

const configureLogger = () => {
  // In electron-log v5, the renderer forwards all logs to the main process via IPC.
  // Transport configuration is handled in the main process only.
  exceptionLogger = log.error
}

const parseUrlArgs = () => {
  const params = new URLSearchParams(window.location.search)
  const codeFontFamily = params.get('cff')
  const codeFontSize = params.get('cfs')
  const debug = params.get('debug') === '1'
  const hideScrollbar = params.get('hsb') === '1'
  const theme = params.get('theme')
  const titleBarStyle = params.get('tbs')
  const userDataPath = params.get('udp')
  const windowId = Number(params.get('wid'))
  const type = params.get('type')

  if (Number.isNaN(windowId)) {
    throw new Error('Error while parsing URL arguments: windowId!')
  }

  return {
    type,
    debug,
    userDataPath,
    windowId,
    initialState: {
      codeFontFamily,
      codeFontSize,
      hideScrollbar,
      theme,
      titleBarStyle
    }
  }
}

const bootstrapRenderer = () => {
  // Register renderer exception handler
  window.addEventListener('error', event => {
    if (event.error) {
      const { message, name, stack } = event.error
      const copy = {
        message,
        name,
        stack
      }

      exceptionLogger(event.error)

      // Pass exception to main process exception handler to show a error dialog.
      ipcRenderer.send('mt::handle-renderer-error', copy)
    } else {
      console.error(event)
    }
  })

  const {
    debug,
    initialState,
    userDataPath,
    windowId,
    type
  } = parseUrlArgs()
  const paths = new RendererPaths(userDataPath)
  const marktext = {
    initialState,
    env: {
      debug,
      paths,
      windowId,
      type
    },
    paths
  }
  global.marktext = marktext

  configureLogger()
}

export default bootstrapRenderer
