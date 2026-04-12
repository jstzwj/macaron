<template>
  <div class="pref-inline-overlay">
    <div class="pref-inline-container">
      <pref-side-bar
        :use-router="false"
        :active-category="activeCategory"
        @category-change="handleCategoryChange"
      />
      <div class="pref-inline-content">
        <div class="pref-inline-body">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>
    <button class="pref-close-btn" @click="close">
      <svg viewBox="0 0 1024 1024" width="16" height="16">
        <path fill="currentColor" d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3 5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
      </svg>
    </button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { ipcRenderer } from 'electron'
import PrefSideBar from '@/prefComponents/sideBar'
import bus from '@/bus'

export default {
  components: {
    PrefSideBar,
    PrefGeneral: defineAsyncComponent(() => import('@/prefComponents/general')),
    PrefEditor: defineAsyncComponent(() => import('@/prefComponents/editor')),
    PrefMarkdown: defineAsyncComponent(() => import('@/prefComponents/markdown')),
    PrefSpelling: defineAsyncComponent(() => import('@/prefComponents/spellchecker')),
    PrefTheme: defineAsyncComponent(() => import('@/prefComponents/theme')),
    PrefImage: defineAsyncComponent(() => import('@/prefComponents/image')),
    PrefKeybindings: defineAsyncComponent(() => import('@/prefComponents/keybindings'))
  },
  data () {
    return {
      activeCategory: 'general'
    }
  },
  computed: {
    activeComponent () {
      const map = {
        general: 'PrefGeneral',
        editor: 'PrefEditor',
        markdown: 'PrefMarkdown',
        spelling: 'PrefSpelling',
        theme: 'PrefTheme',
        image: 'PrefImage',
        keybindings: 'PrefKeybindings'
      }
      return map[this.activeCategory] || 'PrefGeneral'
    }
  },
  methods: {
    close () {
      this.$store.dispatch('CLOSE_PREFERENCES')
    },
    handleCategoryChange (category) {
      this.activeCategory = category
    },
    onIpcCategoryChange (event, category) {
      if (category) {
        this.activeCategory = category
      }
    },
    onBusCategoryChange (category) {
      if (category) {
        this.activeCategory = category
      }
    },
    handleKeydown (e) {
      if (e.key === 'Escape') {
        this.close()
      }
    }
  },
  mounted () {
    ipcRenderer.on('settings::change-tab', this.onIpcCategoryChange)
    bus.$on('preferences::change-category', this.onBusCategoryChange)
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount () {
    ipcRenderer.removeListener('settings::change-tab', this.onIpcCategoryChange)
    bus.$off('preferences::change-category', this.onBusCategoryChange)
    window.removeEventListener('keydown', this.handleKeydown)
  }
}
</script>

<style scoped>
  .pref-inline-overlay {
    position: absolute;
    inset: 0;
    z-index: 1000;
    background: var(--editorBgColor);
  }

  .pref-inline-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }

  .pref-inline-content {
    flex: 1;
    position: relative;
    overflow-y: auto;
    padding-top: var(--titleBarHeight, 32px);
  }

  .pref-close-btn {
    position: absolute;
    top: 6px;
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--editorColor50);
    border-radius: 4px;
    z-index: 10;
  }

  .pref-close-btn:hover {
    background: var(--editorColor10);
    color: var(--themeColor);
  }

  .pref-inline-body {
    padding: 20px 30px 40px;
    max-width: 800px;
  }
</style>

<style>
  /* Keep el-icon small in preference items */
  .pref-inline-overlay .el-icon {
    width: 12px;
    height: 12px;
    font-size: 12px;
  }
  .pref-inline-overlay .el-icon svg {
    width: 1em;
    height: 1em;
  }
</style>
