<template>
  <transition name="dialog-fade">
    <div class="rename-dialog" v-if="renderRename" @click="showRename = false">
      <transition name="dialog-slide" @after-enter="focusInput">
        <div class="rename-dialog-panel" v-if="showRename" @click.stop>
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
      </transition>
      <div class="rename-dialog-overlay"></div>
    </div>
  </transition>
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
    focusInput () {
      if (this.$refs.search) {
        this.$refs.search.focus()
      }
    },
    confirm () {
      this.$store.dispatch('RENAME', this.tempName)
      this.showRename = false
    }
  },
  watch: {
    showRename (val) {
      if (!val) {
        setTimeout(() => {
          this.renderRename = false
        }, 200)
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
  width: min(410px, calc(100vw - 32px));
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
  border-radius: 6px;
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

/* Fade transition for overlay */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
.dialog-fade-enter-active .rename-dialog-overlay,
.dialog-fade-leave-active .rename-dialog-overlay {
  transition: opacity 0.2s ease;
}

/* Slide transition for panel */
.dialog-slide-enter-active {
  transition: all 0.2s ease;
}
.dialog-slide-leave-active {
  transition: all 0.15s ease;
}
.dialog-slide-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.97);
}
.dialog-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}
</style>
