<template>
  <div class="pref-container">
    <title-bar v-if="showCustomTitleBar"></title-bar>
    <side-bar></side-bar>
    <div
      class="pref-content"
      :class="{ 'frameless': titleBarStyle === 'custom' || isOsx }"
    >
      <div class="title-bar" v-if="!showCustomTitleBar"></div>
      <div class="pref-setting-shell">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/prefComponents/common/titlebar'
import SideBar from '@/prefComponents/sideBar'
import { loadingPageMixins } from '@/mixins'
import { addThemeStyle } from '@/util/theme'
import { DEFAULT_STYLE } from '@/config'
import { isOsx } from '@/util'

export default {
  data () {
    this.isOsx = isOsx
    return {
      _titleBarStyle: '',
      _theme: ''
    }
  },
  mixins: [loadingPageMixins],
  components: {
    TitleBar,
    SideBar
  },
  computed: {
    titleBarStyle () {
      return this._titleBarStyle
    },
    showCustomTitleBar () {
      return this._titleBarStyle === 'custom' && !this.isOsx
    }
  },
  watch: {
    _theme: function (value, oldValue) {
      if (value !== oldValue) {
        addThemeStyle(value)
      }
    }
  },
  created () {
    this.$nextTick(() => {
      const state = global.marktext.initialState || DEFAULT_STYLE
      addThemeStyle(state.theme)

      // Use store subscriber for reliable Vue 3 reactivity
      this._titleBarStyle = this.$store.state.preferences.titleBarStyle
      this._theme = this.$store.state.preferences.theme
      this._unsub = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'SET_USER_PREFERENCE') {
          this._titleBarStyle = state.preferences.titleBarStyle
          this._theme = state.preferences.theme
        }
      })

      this.$store.dispatch('ASK_FOR_USER_PREFERENCE')
      this.hideLoadingPage()
    })
  },
  beforeUnmount () {
    if (this._unsub) {
      this._unsub()
    }
  }
}
</script>

<style>
.pref-container {
  --prefSideBarWidth: 280px;
  --prefButtonHeight: 34px;
  --prefButtonPaddingX: 14px;
  --prefButtonRadius: 8px;
  --prefButtonFontSize: 13px;
  --prefButtonGap: 8px;

  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background: var(--editorBgColor);

  & h4 {
    margin: 0;
    font-weight: normal;
  }

  & h5 {
    font-weight: normal;
  }

  & .pref-content {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: calc(100vw - var(--prefSideBarWidth));
    & .title-bar {
      width: 100%;
      height: var(--titleBarHeight);
      position: fixed;
      top: 0;
      right: 0;
      -webkit-app-region: drag;
    }
    & .pref-setting-shell {
      padding: 50px 20px;
      padding-top: var(--titleBarHeight);
      flex: 1;
      height: calc(100vh - var(--titleBarHeight));
      overflow: auto;
    }
    & span, & div,
    & h1, & h2, & h3, & h4, & h5 {
      user-select: none;
    }
  }
  & .pref-content.frameless .pref-setting-shell {
    /* Move the scrollbar below the titlebar */
    margin-top: var(--titleBarHeight);
    padding-top: 0;
  }

  /* Keep el-icon small in preference items */
  & .el-icon {
    width: 12px;
    height: 12px;
    font-size: 12px;
  }
  & .el-icon svg {
    width: 1em;
    height: 1em;
  }

  & .pref-setting-shell .pref-action-button,
  & .pref-setting-shell button.pref-action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: var(--prefButtonHeight);
    padding: 0 var(--prefButtonPaddingX);
    border: 1px solid var(--tableBorderColor);
    border-radius: var(--prefButtonRadius);
    background: var(--buttonBgColor);
    color: var(--buttonFontColor);
    font-size: var(--prefButtonFontSize);
    line-height: 1.2;
    box-shadow: var(--buttonShadow);
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  }

  & .pref-setting-shell .pref-action-button:hover,
  & .pref-setting-shell button.pref-action-button:hover {
    background: var(--buttonBgColorHover);
    border-color: var(--buttonBorderHover);
    color: var(--buttonFontColorHover);
  }

  & .pref-setting-shell .pref-action-button:active,
  & .pref-setting-shell button.pref-action-button:active {
    background: var(--buttonBgColorActive);
    border-color: var(--buttonBorderActive);
    color: var(--buttonFontColorActive);
  }

  & .pref-setting-shell .pref-action-button.is-disabled,
  & .pref-setting-shell .pref-action-button.is-disabled:hover,
  & .pref-setting-shell .pref-action-button.is-disabled:focus,
  & .pref-setting-shell button.pref-action-button[disabled] {
    box-shadow: none;
    opacity: .7;
    cursor: not-allowed;
  }

  & .pref-setting-shell button.button:not(.search-result-item):not(.keybinding-action-button) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--prefButtonGap);
    border-radius: var(--prefButtonRadius);
  }

  & .pref-setting-shell .link,
  & .pref-setting-shell a,
  & .pref-setting-shell .el-button.is-link,
  & .pref-setting-shell .el-button--link {
    color: var(--themeColor);
    text-decoration: none;
    transition: color 0.15s ease, opacity 0.15s ease;
  }

  & .pref-setting-shell .link:hover,
  & .pref-setting-shell a:hover,
  & .pref-setting-shell .el-button.is-link:hover,
  & .pref-setting-shell .el-button--link:hover {
    color: var(--buttonPrimaryBgColorHover);
  }

  & .pref-setting-shell .link:focus-visible,
  & .pref-setting-shell a:focus-visible,
  & .pref-setting-shell .el-button.is-link:focus-visible,
  & .pref-setting-shell .el-button--link:focus-visible {
    border-radius: 4px;
  }
}
</style>
