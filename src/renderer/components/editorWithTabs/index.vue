<template>
    <div
      class="editor-with-tabs"
      :style="{'max-width': showSideBar ? `calc(100vw - ${sideBarWidth}px)` : '100vw' }"
    >
      <tabs v-show="showTabBar"></tabs>
      <div class="container">
        <editor
          :markdown="markdown"
          :cursor="cursor"
          :text-direction="textDirection"
          :platform="platform"
        ></editor>
        <source-code
          v-if="sourceCode"
          :markdown="markdown"
          :cursor="cursor"
          :text-direction="textDirection"
        ></source-code>
      </div>
      <tab-notifications></tab-notifications>
    </div>
</template>

<script>
import Tabs from './tabs.vue'
import Editor from './editor.vue'
import SourceCode from './sourceCode.vue'
import TabNotifications from './notifications.vue'

export default {
  props: {
    markdown: {
      type: String,
      required: true
    },
    cursor: {
      validator (value) {
        return typeof value === 'object'
      },
      required: true
    },
    sourceCode: {
      type: Boolean,
      required: true
    },
    showTabBar: {
      type: Boolean,
      required: true
    },
    textDirection: {
      type: String,
      required: true
    },
    platform: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      _showSideBar: false,
      _sideBarWidth: 280
    }
  },
  computed: {
    showSideBar () {
      return this._showSideBar
    },
    sideBarWidth () {
      return this._sideBarWidth
    }
  },
  watch: {
    // Watch store changes via bus events
  },
  created () {
    // Initialize from store
    this._showSideBar = this.$store.state.layout.showSideBar
    this._sideBarWidth = this.$store.state.layout.sideBarWidth

    // Subscribe to store changes
    this._unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SET_LAYOUT' || mutation.type === 'TOGGLE_LAYOUT_ENTRY') {
        this._showSideBar = state.layout.showSideBar
      }
      if (mutation.type === 'SET_SIDE_BAR_WIDTH') {
        this._sideBarWidth = state.layout.sideBarWidth
      }
    })
  },
  beforeUnmount () {
    if (this._unsubscribe) {
      this._unsubscribe()
    }
  },
  components: {
    Tabs,
    Editor,
    SourceCode,
    TabNotifications
  }
}
</script>

<style scoped>
  .editor-with-tabs {
    position: relative;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;

    overflow: hidden;
    background: var(--editorBgColor);
    & > .container {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
