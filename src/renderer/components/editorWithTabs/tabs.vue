<template>
  <div class="editor-tabs">
    <div class="tabs-scroll" ref="tabsScroll">
      <div class="tabs-list" ref="tabsList">
        <div
          v-for="file of tabs"
          :key="file.id"
          :class="['tab-item', { active: isActive(file), unsaved: !file.isSaved }]"
          @click="selectFile(file)"
          @click.middle="removeFileInTab(file)"
          @contextmenu.prevent="handleContextMenu($event, file)"
        >
          <span class="tab-title">{{ file.filename }}</span>
          <span class="tab-close" @click.stop="removeFileInTab(file)">
            <svg viewBox="0 0 1024 1024" width="12" height="12">
              <path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2 2.1 12.3 5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="tab-new" @click="newFile">
      <svg viewBox="0 0 1024 1024" width="14" height="14">
        <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m192 480H544v160c0 17.7-14.3 32-32 32s-32-14.3-32-32V544H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h160V320c0-17.7 14.3-32 32-32s32 14.3 32 32v160h160c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
      </svg>
    </div>
  </div>
</template>

<script>
import { shell, clipboard } from 'electron'
import { showContextMenu } from '../../contextMenu/tabs'
import bus from '../../bus'
import Sortable from 'sortablejs'

export default {
  data () {
    return {
      sortable: null,
      _tabs: [],
      _currentFile: {}
    }
  },
  computed: {
    currentFile () {
      return this._currentFile
    },
    tabs () {
      return this._tabs
    }
  },
  methods: {
    isActive (file) {
      const cur = this._currentFile
      return cur && cur.id === file.id
    },
    selectFile (file) {
      if (!file || !file.id) return
      const curId = this._currentFile?.id
      if (file.id !== curId) {
        this.$store.dispatch('UPDATE_CURRENT_FILE', file)
      }
    },
    removeFileInTab (file) {
      const { isSaved } = file
      if (isSaved) {
        this.$store.dispatch('FORCE_CLOSE_TAB', file)
      } else {
        this.$store.dispatch('CLOSE_UNSAVED_TAB', file)
      }
    },
    newFile () {
      this.$store.dispatch('NEW_UNTITLED_TAB', {}).catch(err => console.error('[tabs] NEW_UNTITLED_TAB error:', err))
    },
    closeTab (tabId) {
      const tab = this.tabs.find(f => f.id === tabId)
      if (tab) {
        this.$store.dispatch('CLOSE_TAB', tab)
      }
    },
    closeOthers (tabId) {
      const tab = this.tabs.find(f => f.id === tabId)
      if (tab) {
        this.$store.dispatch('CLOSE_OTHER_TABS', tab)
      }
    },
    closeSaved () {
      this.$store.dispatch('CLOSE_SAVED_TABS')
    },
    closeAll () {
      this.$store.dispatch('CLOSE_ALL_TABS')
    },
    rename (tabId) {
      const tab = this.tabs.find(f => f.id === tabId)
      if (tab && tab.pathname) {
        this.$store.dispatch('RENAME_FILE', tab)
      }
    },
    copyPath (tabId) {
      const tab = this.tabs.find(f => f.id === tabId)
      if (tab && tab.pathname) {
        clipboard.writeText(tab.pathname)
      }
    },
    showInFolder (tabId) {
      const tab = this.tabs.find(f => f.id === tabId)
      if (tab && tab.pathname) {
        shell.showItemInFolder(tab.pathname)
      }
    },
    handleContextMenu (event, tab) {
      if (tab.id) {
        showContextMenu(event, tab)
      }
    },
    initSortable () {
      const el = this.$refs.tabsList
      if (el) {
        this.sortable = Sortable.create(el, {
          animation: 150,
          direction: 'horizontal',
          ghostClass: 'tab-ghost',
          chosenClass: 'tab-chosen',
          dragClass: 'tab-drag',
          filter: '.tab-close',
          preventOnFilter: false,
          fallbackTolerance: 3,
          onEnd: (evt) => {
            const { oldIndex, newIndex } = evt
            if (oldIndex !== newIndex && oldIndex != null && newIndex != null) {
              this.$store.dispatch('SORT_TABS', { oldIndex, newIndex })
            }
          }
        })
      }
    },
    destroySortable () {
      if (this.sortable) {
        this.sortable.destroy()
        this.sortable = null
      }
    }
  },
  created () {
    // Initialize from store
    this._tabs = this.$store.state.editor.tabs
    this._currentFile = this.$store.state.editor.currentFile

    // Subscribe to store changes for tab updates
    this._unsubscribeStore = this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes('TAB') || mutation.type.includes('FILE')) {
        // Create new array references so Vue 3 detects the change
        this._tabs = [...state.editor.tabs]
        this._currentFile = state.editor.currentFile
      }
    })

    this.$nextTick(() => {
      bus.$on('TABS::close-this', this.closeTab)
      bus.$on('TABS::close-others', this.closeOthers)
      bus.$on('TABS::close-saved', this.closeSaved)
      bus.$on('TABS::close-all', this.closeAll)
      bus.$on('TABS::rename', this.rename)
      bus.$on('TABS::copy-path', this.copyPath)
      bus.$on('TABS::show-in-folder', this.showInFolder)
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.initSortable()
    })
  },
  beforeUnmount () {
    this.destroySortable()
    if (this._unsubscribeStore) {
      this._unsubscribeStore()
    }
    bus.$off('TABS::close-this', this.closeTab)
    bus.$off('TABS::close-others', this.closeOthers)
    bus.$off('TABS::close-saved', this.closeSaved)
    bus.$off('TABS::close-all', this.closeAll)
    bus.$off('TABS::rename', this.rename)
    bus.$off('TABS::copy-path', this.copyPath)
    bus.$off('TABS::show-in-folder', this.showInFolder)
  }
}
</script>

<style scoped>
  .editor-tabs {
    display: flex;
    flex-direction: row;
    height: 35px;
    align-items: stretch;
    background: var(--floatBgColor);
    box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, .1);
    overflow: hidden;
    user-select: none;
  }

  .tabs-scroll {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .tabs-scroll::-webkit-scrollbar {
    display: none;
  }

  .tabs-list {
    display: flex;
    flex-direction: row;
    height: 35px;
    min-width: min-content;
  }

  .tab-item {
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 35px;
    color: var(--editorColor50);
    font-size: 12px;
    background: var(--floatBgColor);
    cursor: pointer;
    position: relative;
    max-width: 200px;
    flex-shrink: 0;
  }

  .tab-item:hover {
    background: var(--editorColor10);
  }

  .tab-item.active {
    background: var(--itemBgColor);
    color: var(--themeColor);
  }

  .tab-item.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--themeColor);
  }

  .tab-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .tab-close {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    color: var(--editorColor50);
    flex-shrink: 0;
  }

  .tab-close:hover {
    background: var(--editorColor30);
    color: var(--themeColor);
  }

  .tab-item.unsaved:not(.active) .tab-close {
    display: flex;
  }

  .tab-ghost {
    opacity: 0.4;
    background: var(--editorColor10);
  }

  .tab-chosen {
    box-shadow: 0 0 0 1px var(--themeColor);
  }

  .tab-drag {
    opacity: 0.7;
  }

  .tab-new {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    cursor: pointer;
    color: var(--editorColor50);
    flex-shrink: 0;
  }

  .tab-new:hover {
    color: var(--themeColor);
    background: var(--editorColor10);
  }
</style>
