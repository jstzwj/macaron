'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const SpritePlugin = require('svg-sprite-loader/plugin')
const postcssPresetEnv = require('postcss-preset-env')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ESLintPlugin = require('eslint-webpack-plugin')

const { getRendererEnvironmentDefinitions } = require('./marktextEnvironment')
const { dependencies } = require('../package.json')

const isProduction = process.env.NODE_ENV === 'production'
/**
 * List of node_modules to include in webpack bundle
 * Required for specific packages like Vue UI libraries
 * that provide pure *.vue files that need compiling
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
 */
const whiteListedModules = ['vue', 'vue-router', 'element-plus', '@element-plus/icons-vue', 'vega', 'vega-lite', 'vega-embed']

/** @type {import('webpack').Configuration} */
const rendererConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    emitOnErrors: false
  },
  infrastructureLogging: {
    level: 'warn',
  },
  entry: {
    renderer: path.join(__dirname, '../src/renderer/main.js')
  },
  externals: [
    ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
  ],
  module: {
    rules: [
      {
        test: require.resolve(path.join(__dirname, '../src/muya/lib/assets/libs/snap.svg-min.js')),
        use: {
          loader: 'imports-loader',
          options: {
            additionalCode: 'var fix = module.exports = 0;',
            wrapper: 'window'
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            sourceMap: true
          }
        }
      },
      {
        test: /(element\-plus(?:\/|\\)dist(?:\/|\\)index|exportStyle|katex|github\-markdown|prism[\-a-z]*|\.theme|headerFooterStyle)\.css$/,
        use: [
          'to-string-loader',
          'css-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /(element\-plus(?:\/|\\)dist(?:\/|\\)index|exportStyle|katex|github\-markdown|prism[\-a-z]*|\.theme|headerFooterStyle)\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPresetEnv({ stage: 0 })
                ],
              },
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: './static/'
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.md$/,
        type: 'asset/source'
      }
    ]
  },
  node: {
    __dirname: !isProduction,
    __filename: !isProduction
  },
  plugins: [
    new ESLintPlugin({
      configType: 'eslintrc',
      cache: false,
      extensions: ['js', 'vue'],
      files: [
        'src',
        'test'
      ],
      exclude: [
        'node_modules'
      ],
      emitError: true,
      failOnError: true,
      // NB: Threads must be disabled, otherwise no errors are emitted.
      threads: false,
      formatter: require('eslint-friendly-formatter'),
      context: path.resolve(__dirname, '../'),
      overrideConfigFile: '.eslintrc.js'
    }),
    new SpritePlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      },
      isBrowser: false,
      isDevelopment: !isProduction,
      nodeModules: !isProduction
        ? path.resolve(__dirname, '../node_modules')
        : false
    }),
    new webpack.DefinePlugin(getRendererEnvironmentDefinitions()),
    new VueLoaderPlugin()
  ],
  cache: false,
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron'),
    assetModuleFilename: 'assets/[name].[contenthash:8][ext]',
    asyncChunks: true
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 250000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 10
        },
        muya: {
          test: /[\\/]muya[\\/]/,
          name: 'muya-core',
          priority: 5
        }
      }
    }
  },
  resolve: {
    alias: {
      'main': path.join(__dirname, '../src/main'),
      '@': path.join(__dirname, '../src/renderer'),
      'common': path.join(__dirname, '../src/common'),
      'muya': path.join(__dirname, '../src/muya'),
      snapsvg: path.join(__dirname, '../src/muya/lib/assets/libs/snap.svg-min.js'),
      'vue$': 'vue',
      // Work around a vue-router 4.5.x dev-only RouterView crash in Electron/HMR.
      // The production build removes the faulty devtools marker path.
      'vue-router$': path.join(__dirname, '../node_modules/vue-router/dist/vue-router.prod.cjs'),
      'vega-canvas$': path.join(__dirname, '../node_modules/vega-canvas/build/vega-canvas.browser.js')
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node']
  },
  target: 'electron-renderer'
}

/**
 * Adjust rendererConfig for development settings
 */
if (!isProduction) {
  rendererConfig.cache = { type: 'memory' }
  // NOTE: Caching between builds is currently not possible because all SVGs are invalid on second build due to svgo-loader.
  // rendererConfig.cache = {
  //   name: 'renderer-dev',
  //   type: 'filesystem'
  // }
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
    })
  )
}

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' &&
  process.env.MARKTEXT_DEV_SHOW_BROWSER_ANALYZER === '1') {
  rendererConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: Number(process.env.MARKTEXT_DEV_ANALYZER_PORT || 8899)
    })
  )
}

// Fix debugger breakpoints
if (!isProduction && process.env.MARKTEXT_BUILD_VSCODE_DEBUG) {
  rendererConfig.devtool = 'inline-source-map'
}

/**
 * Adjust rendererConfig for production settings
 */
if (isProduction) {
  rendererConfig.devtool = 'nosources-source-map'
  rendererConfig.mode = 'production'
  rendererConfig.optimization.minimize = true

  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.UNSPLASH_ACCESS_KEY': JSON.stringify(process.env.UNSPLASH_ACCESS_KEY)
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static'),
          to: path.join(__dirname, '../dist/electron/static'),
          globOptions: {
            ignore: ['.*']
          }
        }
      ]
    })
  )
}

module.exports = rendererConfig
