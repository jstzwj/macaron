<template>
  <div class="key-input-dialog">
    <div v-if="showKeyInputDialog" class="input-overlay"></div>
    <el-dialog
      v-if="renderKeyInputDialog"
      v-model="showKeyInputDialog"
      :teleported="false"
      :show-close="false"
      :modal="false"
      @close="cancelKeybinding"
      @closed="afterDialogClosed"
      class="ag-dialog-table"
      width="350px"
    >
      <template #title>
        <div class="key-input-wrapper">
          <div class="input-wrapper">
            <input
              tabindex="0"
              type="text"
              ref="intputTextbox"
              v-model="keybindingInputValue"
              class="input-textbox"
              @keydown="handleKeyDown"
              @keyup="handleKeyUp"
              :placeholder="placeholderText"
            >
          </div>
          <div class="footer">
            <div class="descriptions">{{ $t('preferences.keybindings.keyInputDialog.hint') }}</div>
            <div
              v-show="!isKeybindingValid"
              class="invalid-keybinding"
            >
              {{ $t('preferences.keybindings.keyInputDialog.invalidKey') }}
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  isCompositionEvent,
  isValidElectronAccelerator,
  getAcceleratorFromKeyboardEvent
} from '@hfelix/electron-localshortcut'

export default {
  data () {
    this.needCommitOnClose = true
    this.currentKeybinding = null
    return {
      renderKeyInputDialog: false,
      showKeyInputDialog: false,
      placeholderText: this.$t('preferences.keybindings.keyInputDialog.placeholder'),
      isKeybindingValid: true,
      keybindingInputValue: ''
    }
  },

  props: {
    onCommit: Function,
    showWithId: {
      type: String,
      default: null
    }
  },

  watch: {
    showWithId: function (value, oldValue) {
      if (value !== oldValue) {
        if (value) {
          this.handleShow()
        } else {
          this.cancelKeybinding()
        }
      }
    }
  },

  methods: {
    handleShow () {
      this.needCommitOnClose = true
      this.renderKeyInputDialog = true
      this.placeholderText = this.$t('preferences.keybindings.keyInputDialog.placeholder')
      this.$nextTick(() => {
        this.showKeyInputDialog = true
        this.$nextTick(() => {
          this.$refs.intputTextbox.focus()
        })
      })
    },
    handleDialogClose () {
      this.currentKeybinding = null
      this.isKeybindingValid = true
      this.keybindingInputValue = ''
      this.showKeyInputDialog = false
    },
    handleKeyDown (event) {
      event.preventDefault()
      event.stopPropagation()
      if (isCompositionEvent(event)) {
        return
      } else if (this.isRawKeyCode(event, 'Escape')) {
        this.cancelKeybinding()
        return
      } else if (this.isRawKeyCode(event, 'Enter')) {
        this.saveKeybinding()
        return
      }

      const keybinding = getAcceleratorFromKeyboardEvent(event)
      this.currentKeybinding = keybinding
      this.isKeybindingValid = keybinding.isValid && isValidElectronAccelerator(keybinding.accelerator)
      this.keybindingInputValue = keybinding.accelerator
    },
    handleKeyUp (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    cancelKeybinding () {
      if (this.needCommitOnClose) {
        this.needCommitOnClose = false
        this.onCommit(null)
        this.handleDialogClose()
      }
    },
    saveKeybinding () {
      if (!this.currentKeybinding) {
        this.cancelKeybinding()
        return
      }

      const { accelerator, isValid } = this.currentKeybinding
      if (!isValid) {
        return
      }

      this.needCommitOnClose = false
      this.onCommit(accelerator)
      this.handleDialogClose()
    },
    isRawKeyCode (event, keyCode) {
      const { code, ctrlKey, altKey, shiftKey, metaKey } = event
      return event && code === keyCode && !ctrlKey && !altKey && !shiftKey && !metaKey
    },
    afterDialogClosed () {
      this.renderKeyInputDialog = false
    }
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar {
    display: none;
  }

  .key-input-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    height: auto;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px;
    margin: 0 auto;
    margin-top: 8px;
    box-sizing: border-box;
    color: var(--editorColor);
    background: var(--floatBgColor);
    border: 1px solid var(--floatBorderColor);
    border-radius: 8px;
    box-shadow: var(--floatShadow);
    z-index: 10000;
  }
  .input-overlay {
    position: fixed;
    inset: 0;
    background: transparent;
    z-index: 9999;
  }
  .input-wrapper {
    display: block;
    width: 100%;
    border: 1px solid var(--inputBgColor);
    background: var(--inputBgColor);
    border-radius: 3px;
  }
  .input-textbox {
    width: 100%;
    height: 30px;
    margin: 0 10px;
    font-size: 14px;
    color: var(--editorColor);
    background: transparent;
    outline: none;
    border: none;
  }
  .footer {
    width: 100%;
    margin-top: 8px;
  }
  .descriptions,
  .invalid-keybinding {
    font-size: 12px;
  }
  .invalid-keybinding {
    color: var(--notificationErrorBg);
    margin-top: 4px;
  }
</style>
<style>
  .key-input-dialog .el-dialog,
  .key-input-dialog .el-dialog.ag-dialog-table {
    box-shadow: none !important;
    border: none !important;
    background: none !important;
  }
  .key-input-dialog .el-dialog__header {
    margin-bottom: 20px;
    padding: 0 !important;
  }
  .key-input-dialog .el-dialog__body {
    display: none !important;
  }
</style>
