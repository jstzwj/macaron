<template>
  <div class="search-bar"
    @click.stop="noop"
    v-show="showSearch"
  >
    <div
      class="left-arrow"
      @click="toggleSearchType"
    >
      <svg
        class="icon"
        aria-hidden="true"
        :class="{'arrow-right': type === 'search'}"
      >
        <use xlink:href="#icon-arrowdown"></use>
      </svg>
    </div>
    <div class="right-controls">
      <section class="search">
        <div
          class="input-wrapper"
          :class="{'error': !!searchErrorMsg}"
        >
          <input
            type="text"
            v-model="searchValue"
            @keyup="search($event)"
            ref="search"
            :placeholder="$t('search.placeholder')"
          >
          <div class="controls">
            <span class="search-result">{{`${highlightIndex + 1} / ${highlightCount}`}}</span>
            <span
              :title="$t('search.caseSensitive')"
              class="is-case-sensitive"
              :class="{'active': isCaseSensitive}"
              @click.stop="toggleCtrl('isCaseSensitive')"
            >
              <svg :viewBox="FindCaseIcon.viewBox" aria-hidden="true">
                <use :xlink:href="FindCaseIcon.url" />
              </svg>
            </span>
            <span
              :title="$t('search.wholeWord')"
              class="is-whole-word"
              :class="{'active': isWholeWord}"
              @click.stop="toggleCtrl('isWholeWord')"
            >
              <svg :viewBox="FindWordIcon.viewBox" aria-hidden="true">
                <use :xlink:href="FindWordIcon.url" />
              </svg>
            </span>
            <span
              :title="$t('search.regex')"
              class="is-regex"
              :class="{'active': isRegexp}"
              @click.stop="toggleCtrl('isRegexp')"
            >
              <svg :viewBox="FindRegexIcon.viewBox" aria-hidden="true">
                <use :xlink:href="FindRegexIcon.url" />
              </svg>
            </span>
          </div>
          <div class="error-msg" v-if="searchErrorMsg">
            {{searchErrorMsg}}
          </div>
        </div>
        <div class="button-group">
          <button class="button right" @click="find('prev')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow-up"></use>
            </svg>
          </button>
          <button class="button" @click="find('next')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrowdown"></use>
            </svg>
          </button>
        </div>
      </section>
      <section class="replace" v-if="type === 'replace'">
        <div class="input-wrapper replace-input">
          <input type="text" v-model="replaceValue" :placeholder="$t('search.replacementPlaceholder')">
        </div>
        <div class="button-group">
          <div class="item" :title="$t('search.replaceAll')">
            <button class="button right" @click="replace(false)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-all-inclusive"></use>
              </svg>
            </button>
          </div>
          <div class="item" :title="$t('search.replaceSingle')">
            <button class="button" @click="replace(true)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-replace"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import bus from '../../bus'
import { mapState } from 'vuex'
import FindCaseIcon from '@/assets/icons/searchIcons/iconCase.svg'
import FindWordIcon from '@/assets/icons/searchIcons/iconWord.svg'
import FindRegexIcon from '@/assets/icons/searchIcons/iconRegex.svg'

export default {
  data () {
    this.FindCaseIcon = FindCaseIcon
    this.FindWordIcon = FindWordIcon
    this.FindRegexIcon = FindRegexIcon
    return {
      showSearch: false,
      isCaseSensitive: false,
      isWholeWord: false,
      isRegexp: false,
      type: 'search',
      searchValue: '',
      replaceValue: '',
      searchErrorMsg: ''
    }
  },

  watch: {
    searchMatches: function (newValue, oldValue) {
      if (!newValue || !oldValue) return
      const { value } = newValue
      if (value && value !== oldValue.value) {
        this.searchValue = value
      }
    }
  },

  computed: {
    ...mapState({
      searchMatches: state => state.editor.currentFile.searchMatches
    }),
    highlightIndex () {
      if (this.searchMatches) {
        return this.searchMatches.index
      } else {
        return -1
      }
    },
    highlightCount () {
      if (this.searchMatches) {
        return this.searchMatches.matches.length
      } else {
        return 0
      }
    }
  },

  created () {
    bus.$on('find', this.listenFind)
    bus.$on('replace', this.listenReplace)
    bus.$on('findNext', this.listenFindNext)
    bus.$on('findPrev', this.listenFindPrev)
    document.addEventListener('click', this.docClick)
    document.addEventListener('keyup', this.docKeyup)
  },

  beforeUnmount () {
    bus.$off('find', this.listenFind)
    bus.$off('replace', this.listenReplace)
    bus.$off('findNext', this.listenFindNext)
    bus.$off('findPrev', this.listenFindPrev)
    document.removeEventListener('click', this.docClick)
    document.removeEventListener('keyup', this.docKeyup)
  },

  methods: {
    toggleCtrl (ctrl) {
      this[ctrl] = !this[ctrl]
      this.search()
    },

    listenFind () {
      this.showSearch = true
      this.type = 'search'
      this.$nextTick(() => {
        this.$refs.search.focus()
        if (this.searchValue) {
          this.search()
        }
      })
    },

    listenReplace () {
      this.showSearch = true
      this.type = 'replace'
    },

    listenFindNext () {
      this.find('next')
    },

    listenFindPrev () {
      this.find('prev')
    },

    docKeyup (event) {
      if (event.key === 'Escape') {
        this.emptySearch(true)
      }
    },

    docClick () {
      if (!this.showSearch) return
      this.emptySearch(true)
    },

    emptySearch (selectHighlight = false) {
      this.showSearch = false
      const searchValue = this.searchValue = ''
      this.replaceValue = ''
      bus.$emit('searchValue', searchValue, { selectHighlight })
    },

    toggleSearchType () {
      this.type = this.type === 'search' ? 'replace' : 'search'
    },

    /**
     * Find the previous or next search result.
     * action: prev or next
     */
    find (action) {
      bus.$emit('find-action', action)
    },

    search (event) {
      if (event && event.key === 'Escape') {
        return
      }

      if (event && event.key === 'Enter') {
        return this.find('next')
      }

      const { searchValue, isCaseSensitive, isWholeWord, isRegexp } = this
      if (isRegexp) {
        // Handle invalid regexp.
        try {
          // eslint-disable-next-line no-new
          new RegExp(searchValue)
          this.searchErrorMsg = ''
        } catch (err) {
          this.searchErrorMsg = this.$t('search.invalidRegex', { value: searchValue })
          return
        }
        // Handle match empty string, no need to search.
        try {
          const SEARCH_REG = new RegExp(searchValue)
          if (searchValue && SEARCH_REG.test('')) {
            throw new Error()
          }
          this.searchErrorMsg = ''
        } catch (err) {
          this.searchErrorMsg = this.$t('search.regexMatchesEmpty', { value: searchValue })
          return
        }
      }
      bus.$emit('searchValue', searchValue, {
        isCaseSensitive,
        isWholeWord,
        isRegexp
      })
    },

    replace (isSingle = true) {
      const { replaceValue, isCaseSensitive, isWholeWord, isRegexp } = this
      bus.$emit('replaceValue', replaceValue, {
        isSingle,
        isCaseSensitive,
        isWholeWord,
        isRegexp
      })
    },

    noop () {}
  }
}
</script>

<style scoped>
  .search-bar {
    position: absolute;
    width: min(420px, calc(100vw - 32px));
    padding: 8px;
    top: 8px;
    right: 20px;
    border-radius: 8px;
    box-shadow: var(--floatShadow);
    background: var(--floatBgColor);
    display: flex;
    flex-direction: row;
    animation: searchSlideIn 0.2s ease;
    border: 1px solid var(--floatBorderColor);
  }

  @keyframes searchSlideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .search-bar .left-arrow {
    width: 28px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.15s ease;
  }
  .search-bar .left-arrow:hover {
    background: var(--floatHoverColor);
  }
  .search-bar .left-arrow svg {
    height: 12px;
    width: 12px;
  }
  .search-bar .left-arrow svg.arrow-right {
    transform: rotate(-90deg);
  }

  .search-bar .right-controls {
    flex: 1;
  }
  .search, .replace {
    height: 32px;
    display: flex;
    padding: 0 4px;
    margin-bottom: 4px;
    gap: 6px;
  }

  .search-bar .button {
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    height: 32px;
    width: 32px;
    text-align: center;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: var(--sideBarIconColor);
    border-radius: 6px;
    border: 1px solid var(--floatBorderColor);
    background: var(--buttonBgColor);
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    &.left {
      margin-right: 0;
    }
    &.right {
      margin-left: 0;
    }
  }
  .search-bar .button:hover {
    background: var(--buttonBgColorHover);
    border-color: var(--buttonBorderHover);
  }
  .button.active {
    color: var(--themeColor);
  }
  .search-bar .button > svg {
    width: 16px;
    height: 16px;
  }
  .search-bar .button-group {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }
  .search-bar .button-group .item {
    display: flex;
    align-items: center;
  }
  .search-bar .button:active {
    opacity: .5;
  }
  .input-wrapper {
    display: flex;
    flex: 1;
    position: relative;
    border: 1px solid var(--floatBorderColor);
    background: var(--inputBgColor);
    border-radius: 6px;
    overflow: visible;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .input-wrapper:focus-within {
    border-color: var(--themeColor);
    box-shadow: 0 0 0 3px var(--themeColor10);
  }
  .input-wrapper.error {
    border: 1px solid var(--notificationErrorBg);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .input-wrapper .controls {
    position: absolute;
    top: 6px;
    right: 10px;
    font-size: 12px;
    display: flex;
    color: var(--sideBarTitleColor);
    & > span.search-result {
      height: 20px;
      margin-right: 5px;
      line-height: 17px;
    }
    & > span:not(.search-result) {
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin-left: 2px;
        margin-right: 2px;
        &:hover {
          color: var(--sideBarIconColor);
        }
        & > svg {
          fill: var(--sideBarIconColor);
          &:hover {
            fill: var(--highlightThemeColor);
          }
        }
        &.active svg {
            fill: var(--highlightThemeColor);
        }
      }
  }

  .input-wrapper .error-msg {
    position: absolute;
    top: 31px;
    width: calc(100% + 2px);
    height: 28px;
    left: -1px;
    padding: 0 8px;
    box-sizing: border-box;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background: var(--notificationErrorBg);
    line-height: 28px;
    color: #ffffff;
    font-size: 13px;
    z-index: 1;
  }

  .input-wrapper input {
    flex: 1;
    padding: 0 10px;
    height: 30px;
    outline: none;
    border: none;
    box-sizing: border-box;
    font-size: 13px;
    color: var(--editorColor);
    background: transparent;
  }
</style>
