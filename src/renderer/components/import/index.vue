<template>
  <transition name="dialog-fade">
    <div class="import-dialog" v-if="renderImport" @click="showImport = false">
      <transition name="dialog-slide">
        <div class="import-dialog-panel" v-if="showImport" @click.stop>
          <div class="body">
            <div
              class="drop-container"
              :class="{active: isOver}"
              @dragover="dragOverHandler"
              @dragleave="dragLeaveHandler"
              @drop="dropHandler"
            >
              <div class="img-wrapper">
                <img :src="`${importIcon.url}`" alt="import file">
              </div>
              <div>{{ $t('fileOperation.import.title') }}</div>
              <p>{{ $t('fileOperation.import.dropHere') }}</p>
            </div>
            <div class="file-list">
              <div>.md</div>
              <div>.html</div>
              <div>.docx</div>
              <div>.tex</div>
              <div>.wiki</div>
            </div>
          </div>
        </div>
      </transition>
      <div class="import-dialog-overlay"></div>
    </div>
  </transition>
</template>

<script>
import bus from '@/bus'
import { ipcRenderer } from 'electron'
import importIcon from '@/assets/icons/import_file.svg'

export default {
  data () {
    this.importIcon = importIcon
    return {
      renderImport: false,
      showImport: false,
      isOver: false
    }
  },
  created () {
    bus.$on('importDialog', this.showDialog)
  },
  beforeUnmount () {
    bus.$off('importDialog', this.showDialog)
  },
  methods: {
    showDialog (boolean) {
      if (boolean) {
        this.renderImport = true
        this.$nextTick(() => {
          this.showImport = true
        })
      } else if (boolean !== this.showImport) {
        this.showImport = false
      }
    },
    dragOverHandler (e) {
      this.isOver = true
    },
    dragLeaveHandler (e) {
      this.isOver = false
    },
    dropHandler (e) {
      e.preventDefault()
      if (e.dataTransfer.files) {
        const fileList = []
        for (const file of e.dataTransfer.files) {
          fileList.push(file.path)
        }
        ipcRenderer.send('mt::window::drop', fileList)
      }
    }
  },
  watch: {
    showImport (val) {
      if (!val) {
        setTimeout(() => {
          this.renderImport = false
          this.isOver = false
        }, 200)
      }
    }
  }
}
</script>

<style scoped>
.import-dialog {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.import-dialog-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--maskColor);
}

.import-dialog-panel {
  position: relative;
  z-index: 1;
  width: min(450px, calc(100vw - 32px));
  border-radius: 8px;
  box-shadow: var(--floatShadow);
  border: 1px solid var(--floatBorderColor);
  background-color: var(--floatBgColor);
  color: var(--editorColor);
  padding: 16px;
}

.drop-container {
  border-radius: 8px;
  color: var(--sideBarColor);
  border: 1px dashed var(--sideBarTextColor);
}
.drop-container div,
.drop-container p {
  text-align: center;
}
.drop-container.active {
  border: 1px dashed var(--themeColor);
  background-color: var(--itemBgColor);
}
.img-wrapper {
  width: 50px;
  height: 70px;
  margin: 20px auto 0 auto;
}
.img-wrapper img {
  width: 100%;
  height: 100%;
}
.file-list {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.file-list div {
  width: 70px;
  height: 70px;
  border: 1px solid var(--sideBarTextColor);
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  line-height: 70px;
  color: var(--sideBarTitleColor);
}

/* Transitions */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-slide-enter-active {
  transition: all 0.2s ease;
}
.dialog-slide-leave-active {
  transition: all 0.15s ease;
}
.dialog-slide-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
.dialog-slide-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.97);
}
</style>
