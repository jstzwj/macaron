<template>
  <div
    class="editor-container"
  >
    <side-bar v-if="uiInit"></side-bar>
    <div class="editor-middle">
      <title-bar
        :project="projectTree"
        :pathname="currentFile.pathname"
        :filename="currentFile.filename"
        :active="windowActive"
        :word-count="currentFile.wordCount"
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
      <about-dialog></about-dialog>
      <export-setting-dialog></export-setting-dialog>
      <rename></rename>
      <tweet></tweet>
      <import-modal></import-modal>
    </div>
  </div>
</template>

<script>
import { addStyles, addThemeStyle } from '@/util/theme'
import Recent from '@/components/recent'
import EditorWithTabs from '@/components/editorWithTabs'
import TitleBar from '@/components/titleBar'
import SideBar from '@/components/sideBar'
import AboutDialog from '@/components/about'
import CommandPalette from '@/components/commandPalette'
import ExportSettingDialog from '@/components/exportSettings'
import Rename from '@/components/rename'
import Tweet from '@/components/tweet'
import ImportModal from '@/components/import'
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
    CommandPalette
  },
  mixins: [loadingPageMixins],
  data () {
    return {
      uiInit: false,
      currentFile: {}
    }
  },
  computed: {
    ...mapState({
      showTabBar: state => state.layout.showTabBar,
      sourceCode: state => state.preferences.sourceCode,
      theme: state => state.preferences.theme,
      textDirection: state => state.preferences.textDirection,
      zoom: state => state.preferences.zoom,
      projectTree: state => state.project.projectTree,
      windowActive: state => state.windowActive,
      platform: state => state.platform
    }),
    hasCurrentFile () {
      return typeof this.currentFile.markdown !== 'undefined'
    }
  },
  watch: {
    theme: function (value, oldValue) {
      if (value !== oldValue) {
        addThemeStyle(value)
      }
    },
    zoom: function (zoom) {
      ipcRenderer.emit('mt::window-zoom', null, zoom)
    }
  },
  created () {
    const { commit, dispatch } = this.$store

    if (global.marktext.initialState) {
      commit('SET_USER_PREFERENCE', global.marktext.initialState)
    }

    this.uiInit = this.$store.state.init
    this.currentFile = this.$store.state.editor.currentFile || {}
    this.unsubscribeStore = this.$store.subscribe((mutation, state) => {
      this.uiInit = state.init
      this.currentFile = state.editor.currentFile || {}
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
  }
}
</script>

<style scoped>
  .editor-placeholder,
  .editor-container {
    display: flex;
    flex-direction: row;
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    min-height: 100vh;
    position: relative;
    & > .editor {
      flex: 1;
    }
  }
</style>
