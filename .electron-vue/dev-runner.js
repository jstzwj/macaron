'use strict'

const chalk = require('chalk').default
const electron = require('electron')
const path = require('path')
const { say } = require('cfonts')
const { spawn } = require('child_process')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const net = require('net')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

const devServerHost = process.env.MARKTEXT_DEV_SERVER_HOST || '127.0.0.1'
const devServerBindHost = process.env.MARKTEXT_DEV_SERVER_BIND_HOST || '0.0.0.0'
const preferredDevServerPort = Number(process.env.MARKTEXT_DEV_SERVER_PORT || 9081)
let devServerPort = preferredDevServerPort

let electronProcess = null
let manualRestart = false
let hotMiddleware

function pickAvailablePort (host, startPort) {
  return new Promise((resolve, reject) => {
    const tryPort = port => {
      const server = net.createServer()
      server.unref()
      server.on('error', err => {
        if (err && (err.code === 'EADDRINUSE' || err.code === 'EACCES')) {
          tryPort(port + 1)
        } else {
          reject(err)
        }
      })
      server.listen(port, host, () => {
        const address = server.address()
        const freePort = address && typeof address === 'object' ? address.port : port
        server.close(() => resolve(freePort))
      })
    }

    tryPort(startPort)
  })
}

function logStats (proc, data) {
  let log = ''

  log += chalk.yellow.bold(`┏ ${proc} Process ${new Array((19 - proc.length) + 1).join('-')}`)
  log += '\n\n'

  if (typeof data === 'object') {
    data.toString({
      colors: true,
      chunks: false
    }).split(/\r?\n/).forEach(line => {
      log += '  ' + line + '\n'
    })
  } else {
    log += `  ${data}\n`
  }

  log += '\n' + chalk.yellow.bold(`┗ ${new Array(28 + 1).join('-')}`) + '\n'

  console.log(log)
}

function startRenderer () {
  return new Promise((resolve, reject) => {
    process.env.MARKTEXT_DEV_HIDE_BROWSER_ANALYZER = '1'
    rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer)

    const compiler = webpack(rendererConfig)
    let resolved = false
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500
    })

    compiler.hooks.compilation.tap('HtmlWebpackPluginAfterEmit', compilation => {
      HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
        'AfterPlugin',
        (data, cb) => {
          hotMiddleware.publish({ action: 'reload' })
          cb(null, data)
        }
      )
    })

    compiler.hooks.done.tap('AfterCompiler', stats => {
      logStats('Renderer', stats)
      if (!resolved && !stats.hasErrors()) {
        resolved = true
        resolve()
      }
    })

    const server = new WebpackDevServer({
      host: devServerBindHost,
      port: devServerPort,
      hot: true,
      liveReload: true,
      compress: true,
      static: [
        {
          directory: path.join(__dirname, '../node_modules/codemirror/mode'),
          publicPath: '/codemirror/mode',
          watch: false
        }
      ],
      setupMiddlewares (middlewares, devServer) {
        devServer.app.use(hotMiddleware)
        return middlewares
      }
    }, compiler)

    server.start().catch(reject)
  })
}

function startMain () {
  return new Promise((resolve, reject) => {
    mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main)

    const compiler = webpack(mainConfig)

    compiler.hooks.watchRun.tapAsync('Compiling', (_, done) => {
      logStats('Main', chalk.white.bold('compiling...'))
      if (hotMiddleware) {
        hotMiddleware.publish({ action: 'compiling' })
      }
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }

      logStats('Main', stats)

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => {
          manualRestart = false
        }, 5000)
      }

      resolve()
    })
  })
}

function startElectron () {
  electronProcess = spawn(electron, [
    '--inspect=5858',
    '--remote-debugging-port=8315',
    '--nolazy',
    path.join(__dirname, '../dist/electron/main.js')
  ], {
    env: {
      ...process.env,
      MARKTEXT_DEV_SERVER_HOST: devServerHost,
      MARKTEXT_DEV_SERVER_PORT: String(devServerPort),
      MARKTEXT_DEV_HIDE_BROWSER_ANALYZER: '1'
    }
  })

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red')
  })

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function electronLog (data, color) {
  let log = ''
  data = data.toString().split(/\r?\n/)
  data.forEach(line => {
    log += `  ${line}\n`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      '\n\n' +
      log +
      chalk[color].bold('┗ ----------------------------') +
      '\n'
    )
  }
}

function greeting () {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 155) text = 'building macaron'
  else if (cols > 76) text = 'building|macaron'
  else text = false

  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else {
    console.log(chalk.yellow.bold('\n  building macaron'))
  }
  console.log(chalk.blue('  getting ready...') + '\n')
}

async function init () {
  greeting()
  devServerPort = await pickAvailablePort(devServerBindHost, preferredDevServerPort)
  process.env.MARKTEXT_DEV_SERVER_PORT = String(devServerPort)
  process.env.MARKTEXT_DEV_HIDE_BROWSER_ANALYZER = '1'

  Promise.all([startRenderer(), startMain()])
    .then(() => {
      startElectron()
    })
    .catch(err => {
      console.error(err)
    })
}

init()
