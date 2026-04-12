<template>
  <div class="status-bar" @click.stop>
    <div class="status-bar-left">
      <button
        class="status-bar-item"
        :class="{ active: showSideBar }"
        :title="$t('statusBar.toggleSidebar')"
        @click="toggleSidebar"
      >
        <svg v-if="showSideBar" viewBox="0 0 1024 1024" width="14" height="14">
          <path fill="currentColor" d="M658.975 155.648l-327.637 327.637c-12.497 12.497-12.497 32.758 0 45.255l327.637 327.637c12.497 12.497 32.758 12.497 45.255 0s12.497-32.758 0-45.255l-305.109-305.109 305.109-305.109c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0z" />
        </svg>
        <svg v-else viewBox="0 0 1024 1024" width="14" height="14">
          <circle :cx="512" :cy="512" :r="400" fill="currentColor" />
        </svg>
      </button>
      <button
        class="status-bar-item"
        :class="{ active: sourceCode }"
        :title="$t('statusBar.sourceCodeMode')"
        @click="toggleSourceCode"
      >
        &lt;/&gt;
      </button>
    </div>
    <div class="status-bar-right">
      <button
        class="status-bar-item"
        :class="{ active: spellcheckerEnabled }"
        :title="$t('statusBar.spellcheck')"
        @click="toggleSpellcheck"
      >
        <svg viewBox="0 0 1024 1024" width="14" height="14">
          <path fill="currentColor" d="M128 128h256l64 128h448v512H128V128z m64 64v512h640V320H384l-64-128H192z" />
          <path v-if="spellcheckerEnabled" fill="currentColor" d="M400 640l-120-120 56-56 64 64 144-144 56 56-200 200z" />
        </svg>
      </button>
      <div class="status-bar-item status-bar-dropdown" v-if="!isMacOS">
        <button
          class="dropdown-trigger"
          @click.stop="toggleSpellLangMenu"
          :title="$t('statusBar.spellcheckLanguage')"
        >
          {{ spellLangLabel }}
        </button>
        <div
          class="dropdown-menu"
          v-show="showSpellLangMenu"
          @click.stop
        >
          <div
            v-for="lang in spellcheckLanguages"
            :key="lang"
            class="dropdown-item"
            :class="{ active: spellcheckerLanguage === lang }"
            @click="selectSpellLang(lang)"
          >
            {{ spellLangLabels[lang] || lang }}
          </div>
        </div>
      </div>
      <div
        class="status-bar-item status-bar-dropdown"
        v-if="wordCount"
      >
        <span
          class="dropdown-trigger"
          @click.stop="toggleWordCountMenu"
          :title="$t('statusBar.wordCount')"
        >
          {{ defaultWordCountText }}
        </span>
        <div
          class="dropdown-menu word-count-menu"
          v-show="showWordCountMenu"
          @click.stop
        >
          <div class="dropdown-item" v-for="key in wordCountKeys" :key="key">
            {{ wordCountLabels[key] }} {{ wordCount[key] || 0 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/bus'
import { SpellChecker } from '@/spellchecker'
import { getLanguageName } from '@/spellchecker/languageMap'
import { isOsx } from '@/util'

export default {
  data () {
    return {
      showSideBar: false,
      sourceCode: false,
      spellcheckerEnabled: false,
      spellcheckerLanguage: 'en-US',
      wordCount: null,
      showSpellLangMenu: false,
      showWordCountMenu: false,
      spellcheckLanguages: [],
      spellLangLabels: {},
      isMacOS: isOsx
    }
  },
  computed: {
    spellLangLabel () {
      return this.spellLangLabels[this.spellcheckerLanguage] || this.spellcheckerLanguage
    },
    defaultWordCountText () {
      if (!this.wordCount) return ''
      const label = this.wordCountLabels.word
      return `${label} ${this.wordCount.word || 0}`
    },
    wordCountKeys () {
      return ['paragraph', 'word', 'character', 'all']
    },
    wordCountLabels () {
      const stats = this.$tm('titleBar.stats') || {}
      return {
        word: (stats.word && stats.word.full) || 'words',
        paragraph: (stats.paragraph && stats.paragraph.full) || 'paragraphs',
        character: (stats.character && stats.character.full) || 'characters',
        all: (stats.all && stats.all.full) || 'all characters'
      }
    }
  },
  created () {
    this._unsub = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'TOGGLE_LAYOUT_ENTRY') {
        this.showSideBar = state.layout.showSideBar
      }
      if (mutation.type === 'TOGGLE_VIEW_MODE') {
        this.sourceCode = state.preferences.sourceCode
      }
      if (mutation.type === 'SET_USER_PREFERENCE') {
        this.spellcheckerEnabled = state.preferences.spellcheckerEnabled
        this.spellcheckerLanguage = state.preferences.spellcheckerLanguage
      }
      if (mutation.type === 'SET_WORD_COUNT' || mutation.type === 'SET_CURRENT_FILE') {
        this.wordCount = state.editor.currentFile.wordCount || null
      }
    })

    const state = this.$store.state
    this.showSideBar = state.layout.showSideBar
    this.sourceCode = state.preferences.sourceCode
    this.spellcheckerEnabled = state.preferences.spellcheckerEnabled
    this.spellcheckerLanguage = state.preferences.spellcheckerLanguage
    this.wordCount = state.editor.currentFile.wordCount || null

    document.addEventListener('click', this.handleDocClick)
  },
  async mounted () {
    // Load available spellcheck languages dynamically
    try {
      const dicts = await SpellChecker.getAllLanguages()
      this.spellcheckLanguages = dicts
      this.spellLangLabels = dicts.reduce((acc, lang) => {
        acc[lang] = getLanguageName(lang) || lang
        return acc
      }, {})
    } catch (error) {
      // Fallback: if nothing loads, at least show the current language
      this.spellcheckLanguages = [this.spellcheckerLanguage]
      this.spellLangLabels[this.spellcheckerLanguage] = getLanguageName(this.spellcheckerLanguage) || this.spellcheckerLanguage
    }
  },
  beforeUnmount () {
    if (this._unsub) this._unsub()
    document.removeEventListener('click', this.handleDocClick)
  },
  methods: {
    toggleSidebar () {
      this.$store.commit('TOGGLE_LAYOUT_ENTRY', 'showSideBar')
      this.$store.dispatch('DISPATCH_LAYOUT_MENU_ITEMS')
    },
    toggleSourceCode () {
      bus.$emit('view:toggle-view-entry', 'sourceCode')
    },
    toggleSpellcheck () {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', {
        type: 'spellcheckerEnabled',
        value: !this.spellcheckerEnabled
      })
    },
    toggleSpellLangMenu () {
      this.showSpellLangMenu = !this.showSpellLangMenu
    },
    async selectSpellLang (lang) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type: 'spellcheckerLanguage', value: lang })
      // Apply immediately via unified SpellChecker API (routes to Hunspell or Electron)
      const sc = new SpellChecker(true, lang)
      try {
        await sc.activateSpellchecker(lang)
      } catch (error) {
        console.error('Failed to switch spellchecker language:', error)
      }
      this.showSpellLangMenu = false
    },
    toggleWordCountMenu () {
      this.showWordCountMenu = !this.showWordCountMenu
    },
    handleDocClick () {
      if (this.showSpellLangMenu) {
        this.showSpellLangMenu = false
      }
      if (this.showWordCountMenu) {
        this.showWordCountMenu = false
      }
    }
  }
}
</script>

<style scoped>
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    min-height: 28px;
    padding: 0 12px;
    background: var(--sideBarBgColor);
    border-top: 1px solid var(--floatBorderColor);
    color: var(--editorColor50);
    font-size: 12px;
    user-select: none;
    -webkit-app-region: drag;
    transition: background-color 0.3s ease;
  }

  .status-bar-left,
  .status-bar-right {
    display: flex;
    align-items: center;
    gap: 2px;
    -webkit-app-region: no-drag;
  }

  .status-bar-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--editorColor50);
    background: transparent;
    border: none;
    outline: none;
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .status-bar-item:hover {
    background: var(--editorColor04);
    color: var(--editorColor);
  }

  .status-bar-item.active {
    color: var(--themeColor);
    background: var(--themeColor10);
  }

  .status-bar-dropdown {
    position: relative;
  }

  .dropdown-trigger {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--editorColor50);
    background: transparent;
    border: none;
    outline: none;
    font-size: 12px;
    line-height: 1;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .dropdown-trigger:hover {
    background: var(--editorColor04);
    color: var(--editorColor);
  }

  .dropdown-menu {
    position: absolute;
    bottom: 100%;
    right: 0;
    min-width: 140px;
    max-height: 320px;
    overflow-y: auto;
    margin-bottom: 6px;
    padding: 4px 0;
    background: var(--floatBgColor);
    border: 1px solid var(--floatBorderColor);
    border-radius: 6px;
    box-shadow: var(--floatShadow);
    z-index: 9999;
    animation: menuFadeIn 0.15s ease;
  }

  @keyframes menuFadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dropdown-item {
    padding: 5px 12px;
    cursor: pointer;
    font-size: 12px;
    color: var(--editorColor);
    white-space: nowrap;
  }

  .dropdown-item:hover {
    background: var(--floatHoverColor);
  }

  .dropdown-item.active {
    color: var(--themeColor);
  }

  .word-count-menu {
    min-width: 160px;
  }
</style>
