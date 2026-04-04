const js = require('@eslint/js')
const globals = require('globals')
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      'src/muya/dist/**/*',
      'src/muya/webpack.config.js',
      'test/unit/coverage/**',
      'test/unit/*.js',
      'test/e2e/*.js',
      'src/renderer/assets/symbolIcon/index.js',
      'src/muya/lib/assets/libs/*.js'
    ]
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: false
    }
  },
  ...compat.config({
    root: true,
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        configFile: './babel.config.js'
      },
      ecmaVersion: 11,
      ecmaFeatures: {
        impliedStrict: true
      },
      sourceType: 'module'
    },
    env: {
      browser: true,
      es6: true,
      node: true
    },
    extends: [
      'standard',
      'eslint:recommended',
      'plugin:vue/base',
      'plugin:import/errors',
      'plugin:import/warnings'
    ],
    globals: {
      __static: true
    },
    plugins: ['html', 'vue'],
    overrides: [{
      files: ['*.vue', '**/*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        babelOptions: {
          configFile: './babel.config.js'
        },
        ecmaVersion: 11,
        ecmaFeatures: {
          impliedStrict: true
        },
        sourceType: 'module'
      }
    }],
    rules: {
      indent: ['error', 2, { SwitchCase: 1, ignoreComments: true }],
      semi: [2, 'never'],
      'no-return-await': 'error',
      'no-return-assign': 'error',
      'no-new': 'error',
      'arrow-parens': 'off',
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'require-atomic-updates': 'off',
      'prefer-const': 'off',
      'no-mixed-operators': 'off',
      'no-prototype-builtins': 'off',
      'no-useless-assignment': 'off'
    },
    settings: {
      'import/core-modules': ['@vscode/ripgrep'],
      'import/resolver': {
        alias: {
          map: [
            ['common', './src/common'],
            ['@', './src/renderer'],
            ['muya', './src/muya']
          ],
          extensions: ['.js', '.vue', '.json', '.css', '.node']
        }
      }
    }
  }),
  {
    files: ['test/**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        assert: 'readonly',
        expect: 'readonly',
        should: 'readonly',
        __static: 'readonly'
      }
    }
  }
]
