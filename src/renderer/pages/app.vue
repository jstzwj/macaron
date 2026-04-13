<template>
  <div
    class="editor-container"
  >
    <side-bar v-if="uiInit"></side-bar>
    <div class="editor-middle">
      <title-bar
        v-show="showTitleBar"
        :project="projectTree"
        :pathname="currentFile.pathname"
        :filename="currentFile.filename"
        :active="windowActive"
        :platform="platform"
        :is-saved="currentFile.isSaved"
      ></title-bar>
      <div class="editor-placeholder" v-if="!uiInit"></div>
      <recent
        v-if="!hasCurrentFile && uiInit"
      ></recent>
      <editor-with-tabs
        v-if="hasCurrentFile && uiInit"
        :markdown="currentFile.markdown"
        :cursor="currentFile.cursor"
        :source-code="sourceCode"
        :show-tab-bar="showTabBar"
        :text-direction="textDirection"
        :platform="platform"
      ></editor-with-tabs>
      <command-palette></command-palette>
      <status-bar v-if="uiInit"></status-bar>
      <about-dialog></about-dialog>
      <export-setting-dialog></export-setting-dialog>
      <rename></rename>
      <tweet></tweet>
      <import-modal></import-modal>
    </div>
    <inline-preferences v-if="showPreferences"></inline-preferences>
  </div>
</template>

<script>
import { addStyles } from '@/util/theme'
import Recent from '@/components/recent'
import EditorWithTabs from '@/components/editorWithTabs'
import TitleBar from '@/components/titleBar'
import SideBar from '@/components/sideBar'
import AboutDialog from '@/components/about'
import CommandPalette from '@/components/commandPalette'
import StatusBar from '@/components/statusBar'
import ExportSettingDialog from '@/components/exportSettings'
import Rename from '@/components/rename'
import Tweet from '@/components/tweet'
import ImportModal from '@/components/import'
import InlinePreferences from '@/components/preferences'
import { loadingPageMixins } from '@/mixins'
import { mapState } from 'vuex'
import bus from '@/bus'
import { DEFAULT_STYLE } from '@/config'
import { ipcRenderer } from 'electron'

export default {
  name: 'marktext',
  components: {
    Recent,
    EditorWithTabs,
    TitleBar,
    SideBar,
    AboutDialog,
    ExportSettingDialog,
    Rename,
    Tweet,
    ImportModal,
    CommandPalette,
    StatusBar,
    InlinePreferences
  },
  mixins: [loadingPageMixins],
  data () {
    return {
      uiInit: false,
      currentFile: {},
      unsubscribeStore: null,
      // Manually mirror store state as data properties for reactivity
      _sourceCode: false,
      _showTabBar: false,
      _showSideBar: false,
      _theme: 'light',
      _textDirection: 'ltr',
      _zoom: 1.0,
      _projectTree: null,
      _windowActive: true,
      _showPreferences: false,
      _showTitleBar: false
    }
  },
  computed: {
    ...mapState({
      platform: state => state.platform
    }),
    sourceCode () {
      return this._sourceCode
    },
    showTabBar () {
      return this._showTabBar
    },
    showSideBar () {
      return this._showSideBar
    },
    theme () {
      return this._theme
    },
    textDirection () {
      return this._textDirection
    },
    zoom () {
      return this._zoom
    },
    projectTree () {
      return this._projectTree
    },
    windowActive () {
      return this._windowActive
    },
    hasCurrentFile () {
      return typeof this.currentFile.markdown !== 'undefined'
    },
    showPreferences () {
      return this._showPreferences
    },
    showTitleBar () {
      return this._showTitleBar
    }
  },
  watch: {
    zoom: function (zoom) {
      ipcRenderer.emit('mt::window-zoom', null, zoom)
    }
  },
  created () {
    const { commit, dispatch, state: storeState } = this.$store

    if (global.marktext.initialState) {
      commit('SET_USER_PREFERENCE', global.marktext.initialState)
    }

    this.uiInit = storeState.init
    this.currentFile = storeState.editor.currentFile || {}
    // Initialize mirrored state
    this._sourceCode = storeState.preferences.sourceCode
    this._showTabBar = storeState.layout.showTabBar
    this._showSideBar = storeState.layout.showSideBar
    this._theme = storeState.preferences.theme
    this._textDirection = storeState.preferences.textDirection
    this._zoom = storeState.preferences.zoom
    this._projectTree = storeState.project.projectTree
    this._windowActive = storeState.windowActive
    this._showPreferences = storeState.layout.showPreferences
    this._showTitleBar = storeState.layout.showTitleBar

    this.unsubscribeStore = this.$store.subscribe((mutation, state) => {
      this.uiInit = state.init
      this.currentFile = state.editor.currentFile || {}
      // Mirror all relevant store state into data properties
      this._sourceCode = state.preferences.sourceCode
      this._showTabBar = state.layout.showTabBar
      this._showSideBar = state.layout.showSideBar
      this._theme = state.preferences.theme
      this._textDirection = state.preferences.textDirection
      this._zoom = state.preferences.zoom
      this._projectTree = state.project.projectTree
      this._windowActive = state.windowActive
      this._showPreferences = state.layout.showPreferences
      this._showTitleBar = state.layout.showTitleBar
    })

    dispatch('LINTEN_WIN_STATUS')
    dispatch('LISTEN_COMMAND_CENTER_BUS')
    dispatch('LISTEN_FOR_TWEET')
    dispatch('LISTEN_FOR_LAYOUT')
    dispatch('LISTEN_FOR_EDIT')
    dispatch('LISTEN_FOR_VIEW')
    dispatch('LISTEN_FOR_SHOW_DIALOG')
    dispatch('LISTEN_FOR_PARAGRAPH_INLINE_STYLE')
    dispatch('LISTEN_FOR_UPDATE_PROJECT')
    dispatch('LISTEN_FOR_LOAD_PROJECT')
    dispatch('LISTEN_FOR_SIDEBAR_CONTEXT_MENU')
    dispatch('LISTEN_FOR_UPDATE')
    dispatch('LISTEN_SCREEN_SHOT')
    dispatch('ASK_FOR_USER_PREFERENCE')
    dispatch('LISTEN_TOGGLE_VIEW')
    dispatch('LISTEN_FOR_CLOSE')
    dispatch('LISTEN_FOR_SAVE_AS')
    dispatch('LISTEN_FOR_MOVE_TO')
    dispatch('LISTEN_FOR_SAVE')
    dispatch('LISTEN_FOR_SET_PATHNAME')
    dispatch('LISTEN_FOR_BOOTSTRAP_WINDOW')
    dispatch('LISTEN_FOR_SAVE_CLOSE')
    dispatch('LISTEN_FOR_RENAME')
    dispatch('LINTEN_FOR_SET_LINE_ENDING')
    dispatch('LINTEN_FOR_SET_ENCODING')
    dispatch('LINTEN_FOR_SET_FINAL_NEWLINE')
    dispatch('LISTEN_FOR_NEW_TAB')
    dispatch('LISTEN_FOR_CLOSE_TAB')
    dispatch('LISTEN_FOR_TAB_CYCLE')
    dispatch('LISTEN_FOR_SWITCH_TABS')
    dispatch('LINTEN_FOR_PRINT_SERVICE_CLEARUP')
    dispatch('LINTEN_FOR_EXPORT_SUCCESS')
    dispatch('LISTEN_FOR_FILE_CHANGE')
    dispatch('LISTEN_WINDOW_ZOOM')
    dispatch('LISTEN_FOR_RELOAD_IMAGES')
    dispatch('LISTEN_FOR_CONTEXT_MENU')
    dispatch('LISTEN_FOR_NOTIFICATION')

    // Listen for inline preferences trigger from main process
    ipcRenderer.on('mt::show-inline-preferences', (e, category) => {
      this.$store.dispatch('OPEN_PREFERENCES')
      if (category) {
        bus.$emit('preferences::change-category', category)
      }
    })

    window.addEventListener('dragover', e => {
      if (!e.dataTransfer.types.length) return

      if (e.dataTransfer.types.indexOf('Files') >= 0) {
        if (!(e.dataTransfer.items.length === 1 && e.dataTransfer.items[0].type.indexOf('image') > -1)) {
          e.preventDefault()
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            bus.$emit('importDialog', false)
          }, 300)
          bus.$emit('importDialog', true)
        }

        e.dataTransfer.dropEffect = 'copy'
      } else {
        e.stopPropagation()
        e.dataTransfer.dropEffect = 'none'
      }
    }, false)

    this.$nextTick(() => {
      const style = global.marktext.initialState || DEFAULT_STYLE
      addStyles(style)
      this.hideLoadingPage()
    })
  },
  beforeUnmount () {
    if (this.unsubscribeStore) {
      this.unsubscribeStore()
    }
    ipcRenderer.removeListener('mt::show-inline-preferences', () => {})
  }
}
</script>

<style scoped>
  .editor-placeholder,
  .editor-container {
    display: flex;
    flex-direction: row;
    position: fixed;
    inset: 0;
    width: auto;
    height: auto;
    min-width: 0;
    min-height: 0;
  }
  .editor-container .hide {
    z-index: -1;
    opacity: 0;
    position: absolute;
    left: -10000px;
  }
  .editor-placeholder {
    background: var(--editorBgColor);
  }
  .editor-middle {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    min-height: 0;
    position: relative;
    & > .editor {
      flex: 1;
      min-height: 0;
    }
  }
</style>
