<template>
  <div
    v-show="showSideBar"
    class="side-bar"
    ref="sideBar"
    :style="[ !rightColumn ? { 'min-width': '45px' } : {}, { 'width': `${finalSideBarWidth}px` } ]"
  >
    <div class="left-column">
      <ul>
        <li
          v-for="(c, index) of sideBarIcons"
          :key="index"
          @click="handleLeftIconClick(c.name)"
          :class="{ 'active': c.name === rightColumn }"
        >
          <svg :viewBox="c.icon.viewBox">
            <use :xlink:href="c.icon.url"></use>
          </svg>
        </li>
      </ul>
      <ul class="bottom">
        <li
          v-for="(c, index) of sideBarBottomIcons"
          :key="index"
          @click="handleLeftBottomClick(c.name)"
        >
          <svg :viewBox="c.icon.viewBox">
            <use :xlink:href="c.icon.url"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div class="right-column" v-show="rightColumn">
      <tree
        :project-tree="projectTree"
        :opened-files="openedFiles"
        :tabs="tabs"
        v-if="rightColumn === 'files'"
      ></tree>
      <side-bar-search
        v-else-if="rightColumn === 'search'"
      ></side-bar-search>
      <toc
        v-else-if="rightColumn === 'toc'"
      ></toc>
    </div>
    <div class="drag-bar" ref="dragBar" v-show="rightColumn"></div>
  </div>
</template>

<script>
import { sideBarIcons, sideBarBottomIcons } from './help'
import Tree from './tree.vue'
import SideBarSearch from './search.vue'
import Toc from './toc.vue'

export default {
  data () {
    this.sideBarIcons = sideBarIcons
    this.sideBarBottomIcons = sideBarBottomIcons
    return {
      openedFiles: [],
      sideBarViewWidth: 280,
      // Local mirrored state
      _rightColumn: 'files',
      _showSideBar: false,
      _projectTree: null,
      _sideBarWidth: 280,
      _tabs: []
    }
  },
  components: {
    Tree,
    SideBarSearch,
    Toc
  },
  computed: {
    rightColumn () {
      return this._rightColumn
    },
    showSideBar () {
      return this._showSideBar
    },
    projectTree () {
      return this._projectTree
    },
    sideBarWidth () {
      return this._sideBarWidth
    },
    tabs () {
      return this._tabs
    },
    finalSideBarWidth () {
      const { showSideBar, rightColumn, sideBarViewWidth } = this
      if (!showSideBar) return 0
      if (rightColumn === '') return 45
      return sideBarViewWidth < 220 ? 220 : sideBarViewWidth
    }
  },
  created () {
    // Initialize from store
    this._rightColumn = this.$store.state.layout.rightColumn
    this._showSideBar = this.$store.state.layout.showSideBar
    this._projectTree = this.$store.state.project.projectTree
    this._sideBarWidth = this.$store.state.layout.sideBarWidth
    this._tabs = this.$store.state.editor.tabs

    // Subscribe to store changes
    this._unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'SET_LAYOUT' || mutation.type === 'TOGGLE_LAYOUT_ENTRY') {
        this._rightColumn = state.layout.rightColumn
        this._showSideBar = state.layout.showSideBar
        this._sideBarWidth = state.layout.sideBarWidth
      }
      if (mutation.type === 'SET_PROJECT_TREE') {
        this._projectTree = state.project.projectTree
      }
      if (mutation.type.includes('TAB') || mutation.type.includes('FILE')) {
        this._tabs = state.editor.tabs
      }
    })

    this.$nextTick(() => {
      const dragBar = this.$refs.dragBar
      let startX = 0
      let sideBarWidth = +this.sideBarWidth
      let startWidth = sideBarWidth

      this.sideBarViewWidth = sideBarWidth

      const mouseUpHandler = event => {
        document.removeEventListener('mousemove', mouseMoveHandler, false)
        document.removeEventListener('mouseup', mouseUpHandler, false)
        this.$store.dispatch('CHANGE_SIDE_BAR_WIDTH', sideBarWidth < 220 ? 220 : sideBarWidth)
      }

      const mouseMoveHandler = event => {
        const offset = event.clientX - startX
        sideBarWidth = startWidth + offset
        this.sideBarViewWidth = sideBarWidth
      }

      const mouseDownHandler = event => {
        startX = event.clientX
        startWidth = +this.sideBarWidth
        document.addEventListener('mousemove', mouseMoveHandler, false)
        document.addEventListener('mouseup', mouseUpHandler, false)
      }

      dragBar.addEventListener('mousedown', mouseDownHandler, false)
    })
  },
  beforeUnmount () {
    if (this._unsubscribe) {
      this._unsubscribe()
    }
  },
  methods: {
    handleLeftIconClick (name) {
      if (this.rightColumn === name) {
        this.$store.commit('SET_LAYOUT', { rightColumn: '' })
        this.$store.dispatch('CHANGE_SIDE_BAR_WIDTH', this.finalSideBarWidth)
      } else {
        const needDispatch = this.rightColumn === ''
        this.$store.commit('SET_LAYOUT', { rightColumn: name })
        this.sideBarViewWidth = +this.sideBarWidth
        if (needDispatch) {
          this.$store.dispatch('CHANGE_SIDE_BAR_WIDTH', this.finalSideBarWidth)
        }
      }
    },
    handleLeftBottomClick (name) {
      if (name === 'settings') {
        this.$store.dispatch('OPEN_SETTING_WINDOW')
      }
    }
  }
}
</script>

<style scoped>
  .side-bar {
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    width: 280px;
    height: 100vh;
    min-width: 220px;
    position: relative;
    color: var(--sideBarColor);
    user-select: none;
    background: var(--sideBarBgColor);
    border-right: 1px solid var(--floatBorderColor);
    & .left-column {
      & svg {
        fill: var(--iconColor);
      }
    }
  }

  .left-column {
    height: 100%;
    width: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 0;
    box-sizing: border-box;
    background: var(--itemBgColor);
    border-right: 1px solid var(--floatBorderColor);
    & > ul {
      opacity: 1;
    }
  }

  .left-column ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    & > li {
      width: 37px;
      height: 36px;
      margin: 2px 4px;
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      cursor: pointer;
      border-radius: 6px;
      transition: background-color 0.15s ease;
      & > svg {
        width: 18px;
        height: 18px;
        fill: var(--sideBarIconColor);
        opacity: 0.8;
        transition: transform 0.25s ease-in-out, fill 0.15s ease, opacity 0.15s ease;
      }
      &:hover {
        background: var(--sideBarItemHoverBgColor);
      }
      &:hover > svg {
        opacity: 1;
      }
      &:active > svg {
        transform: scale(0.9);
      }
      &.active > svg {
        fill: var(--themeColor);
        opacity: 1;
      }
    }
  }

  .side-bar:hover .left-column ul li svg {
    opacity: 1;
  }
  .right-column {
    flex: 1;
    width: calc(100% - 50px);
    overflow: hidden;
  }
  .drag-bar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 4px;
    cursor: col-resize;
    transition: background-color 0.15s ease;
    &:hover {
      background: var(--themeColor20);
    }
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2px;
      height: 32px;
      border-left: 1px solid var(--themeColor30);
      border-right: 1px solid var(--themeColor30);
      opacity: 0;
      transition: opacity 0.15s ease;
    }
    &:hover::before {
      opacity: 1;
    }
  }
</style>
