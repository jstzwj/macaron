<template>
  <div class="editor-tabs">
    <div class="tabs-scroll" ref="tabsScroll">
      <div class="tabs-list" ref="tabsList" role="tablist" aria-label="Open files">
        <div
          v-for="file of tabs"
          :key="file.id"
          :class="['tab-item', { active: isActive(file), unsaved: !file.isSaved }]"
          @click.middle="removeFileInTab(file)"
          @contextmenu.prevent="handleContextMenu($event, file)"
        >
          <button
            type="button"
            class="tab-button"
            role="tab"
            :aria-selected="isActive(file)"
            @click="selectFile(file)"
          >
            <span :class="getFileIconClass(file)" class="tab-icon"></span>
            <span class="tab-title">{{ file.filename }}</span>
          </button>
          <button type="button" class="tab-close" :aria-label="`Close ${file.filename}`" :title="`Close ${file.filename}`" @click.stop="removeFileInTab(file)">
            <svg viewBox="0 0 1024 1024" width="12" height="12">
              <path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2 2.1 12.3 5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <button type="button" class="tab-new" aria-label="Create new file" title="Create new file" @click="newFile">
      <svg viewBox="0 0 1024 1024" width="14" height="14">
        <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m192 480H544v160c0 17.7-14.3 32-32 32s-32-14.3-32-32V544H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h160V320c0-17.7 14.3-32 32-32s32 14.3 32 32v160h160c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
      </svg>
    </button>
  </div>
</template>

<script>
import { shell, clipboard } from 'electron'
import { showContextMenu } from '../../contextMenu/tabs'
import bus from '../../bus'
import Sortable from 'sortablejs'
import fileIcons from 'muya/lib/ui/fileIcons'

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
    getFileIconClass (file) {
      const name = file.filename || 'mock.md'
      let classNames = fileIcons.getClassByName(name)
      if (!classNames) {
        classNames = fileIcons.getClassByName('mock.md')
      }
      return classNames
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
    height: 40px;
    align-items: stretch;
    background: var(--editorBgColor);
    border-bottom: 1px solid var(--editorColor10);
    overflow: hidden;
    user-select: none;
  }

  .tabs-scroll {
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .tabs-scroll::-webkit-scrollbar {
    display: none;
  }

  .tabs-list {
    display: flex;
    flex-direction: row;
    height: 40px;
    min-width: min-content;
    gap: 1px;
    padding: 4px 8px 0;
  }

  .tab-item {
    display: flex;
    align-items: stretch;
    height: 36px;
    color: var(--editorColor50);
    font-size: 12.5px;
    background: transparent;
    cursor: pointer;
    position: relative;
    max-width: 200px;
    flex-shrink: 0;
    border-radius: 6px 6px 0 0;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .tab-button,
  .tab-close,
  .tab-new {
    border: none;
    background: transparent;
    color: inherit;
    font: inherit;
    padding: 0;
  }

  .tab-button {
    display: flex;
    align-items: center;
    min-width: 0;
    flex: 1;
    padding: 0 12px;
    cursor: pointer;
    text-align: left;
  }

  .tab-icon {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin-right: 5px;
    font-size: 12px;
    line-height: 1;
    opacity: 0.7;
  }

  .tab-item.active .tab-icon {
    opacity: 1;
  }

  .tab-item:hover {
    background: var(--editorColor04);
  }

  .tab-item.active {
    background: var(--editorBgColor);
    color: var(--themeColor);
    font-weight: 500;
  }

  .tab-item.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: var(--themeColor);
    border-radius: 0 0 2px 2px;
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
    margin: 8px 8px 8px 0;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    color: var(--editorColor40);
    flex-shrink: 0;
    transition: background-color 0.15s ease, color 0.15s ease;
    cursor: pointer;
  }

  .tab-close:hover {
    background: var(--editorColor10);
    color: var(--editorColor);
  }

  .tab-item.unsaved:not(.active) .tab-close {
    display: flex;
  }

  .tab-ghost {
    opacity: 1;
    background: var(--themeColor10);
    border-radius: 6px;
    border-left: 2px solid var(--themeColor);
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
    width: 40px;
    height: 40px;
    cursor: pointer;
    color: var(--editorColor40);
    flex-shrink: 0;
    transition: color 0.15s ease, background-color 0.15s ease;
  }

  .tab-new:hover {
    color: var(--themeColor);
    background: var(--editorColor04);
  }
</style>
