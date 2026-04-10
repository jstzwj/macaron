<template>
  <div class="rename-dialog" v-if="renderRename" @click="showRename = false">
    <div class="rename-dialog-overlay"></div>
    <div class="rename-dialog-panel" @click.stop>
      <div class="search-wrapper">
        <div class="input-wrapper">
          <input
            type="text" v-model="tempName" class="search"
            @keyup.13="confirm"
            ref="search"
          >
          <svg class="icon" aria-hidden="true" @click="confirm">
            <use xlink:href="#icon-markdown"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../bus'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      renderRename: false,
      showRename: false,
      tempName: ''
    }
  },
  created () {
    this.$nextTick(() => {
      bus.$on('rename', this.handleRename)
    })
  },
  beforeUnmount () {
    bus.$off('rename', this.handleRename)
  },
  computed: {
    ...mapState({
      filename: state => state.editor.currentFile.filename
    })
  },
  methods: {
    handleRename () {
      this.renderRename = true
      this.tempName = this.filename
      this.$nextTick(() => {
        this.showRename = true
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      })
    },
    confirm () {
      this.$store.dispatch('RENAME', this.tempName)
      this.showRename = false
    }
  },
  watch: {
    showRename (val) {
      if (!val) {
        this.renderRename = false
      }
    }
  }
}
</script>

<style scoped>
.rename-dialog {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
}

.rename-dialog-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--maskColor);
}

.rename-dialog-panel {
  position: relative;
  z-index: 1;
  width: 410px;
  border-radius: 8px;
  box-shadow: var(--floatShadow);
  border: 1px solid var(--floatBorderColor);
  background-color: var(--floatBgColor);
}

.rename-dialog-panel .search-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
}

.rename-dialog-panel .input-wrapper {
  display: flex;
  width: 100%;
  border: 1px solid var(--inputBgColor);
  background: var(--inputBgColor);
  border-radius: 4px;
}

.rename-dialog-panel .input-wrapper input {
  background: transparent;
}

.search {
  width: 100%;
  height: 30px;
  outline: none;
  border: none;
  font-size: 14px;
  padding: 0 8px;
  margin: 0 10px;
  color: var(--sideBarColor);
}

.rename-dialog-panel .input-wrapper svg {
  cursor: pointer;
  margin: 0 5px;
  width: 30px;
  height: 30px;
  color: var(--iconColor);
  transition: all .3s ease-in-out;
}

.rename-dialog-panel .input-wrapper svg:hover {
  color: var(--themeColor);
}
</style>
