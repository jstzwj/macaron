<template>
  <div class="pref-keybindings">
    <h4>{{ $t('preferences.keybindings.title') }}</h4>
    <section class="keybindings">
      <div class="text">
        {{ $t('preferences.keybindings.description', { link: $t('preferences.keybindings.onlineLink') }) }}
        <a class="link" @click="openKeybindingWiki">{{ $t('preferences.keybindings.onlineLink') }}</a>
      </div>
      <el-table
        :data="keybindingList"
        style="width: 100%"
      >
        <el-table-column prop="description" :label="$t('preferences.keybindings.columnDescription')">
        </el-table-column>
        <el-table-column prop="accelerator" :label="$t('preferences.keybindings.columnKeyCombination')" width="220">
        </el-table-column>
        <el-table-column fixed="right" :label="$t('preferences.keybindings.columnOptions')" width="90">
          <template #default="scope">
            <el-button @click="handleEditClick(scope.$index, scope.row)" link size="small" :title="$t('preferences.keybindings.buttonEdit')">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button @click="handleResetClick(scope.$index, scope.row)" link size="small" :title="$t('preferences.keybindings.buttonReset')">
              <el-icon><RefreshRight /></el-icon>
            </el-button>
            <el-button @click="handleUnbindClick(scope.$index, scope.row)" link size="small" :title="$t('preferences.keybindings.buttonUnbind')">
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="footer">
      <separator></separator>
      <el-button size="medium" @click="saveKeybindings">{{ $t('preferences.keybindings.buttonSave') }}</el-button>
      <el-button size="medium" @click="restoreDefaults">{{ $t('preferences.keybindings.buttonRestoreDefaults') }}</el-button>
    </section>
    <section v-if="showDebugTools" class="keyboard-debug">
      <separator></separator>
      <div><strong>Debug options:</strong></div>
      <el-button size="medium" @click="dumpKeyboardInformation">Dump keyboard information</el-button>
    </section>
    <key-input-dialog
      :showWithId="selectedShortcutId"
      :onCommit="onKeybinding"
    ></key-input-dialog>
  </div>
</template>

<script>
import { ipcRenderer, shell } from 'electron'
import log from 'electron-log/renderer'
import { setKeyboardLayout } from '@hfelix/electron-localshortcut'
import Compound from '../common/compound'
import Separator from '../common/separator'
import KeyInputDialog from './key-input-dialog.vue'
import KeybindingConfigurator from './KeybindingConfigurator'
import notice from '@/services/notification'
import { translate } from '../../i18n'

export default {
  components: {
    Compound,
    Separator,
    KeyInputDialog
  },
  data () {
    return {
      showDebugTools: false,
      keybindingConfigurator: null,
      selectedShortcutId: null,
      keybindingList: []
    }
  },

  mounted () {
    ipcRenderer.invoke('mt::keybinding-get-keyboard-info')
      .then(({ layout, keymap }) => {
        // Update the key mapper to prevent problems on non-US keyboards.
        setKeyboardLayout(layout, keymap)
      })
      .catch(error => log.error('Error while loading keyboard information for settings:', error))

    ipcRenderer.invoke('mt::keybinding-get-pref-keybindings')
      .then(({ defaultKeybindings, userKeybindings }) => {
        this.keybindingConfigurator = new KeybindingConfigurator(defaultKeybindings, userKeybindings)
        this.keybindingList = this.keybindingConfigurator.getKeybindings()
      })
      .catch(error => log.error('Error while loading keyboard information for settings:', error))

    // Show keyboard debugging tools which has been moved from CLI because we
    // need an active window on Windows.
    this.showDebugTools = global.marktext.env.debug
  },

  unmounted () {
    this.keybindingList = []
    this.keybindingConfigurator = null
  },

  methods: {
    openKeybindingWiki () {
      shell.openExternal('https://github.com/marktext/marktext/blob/master/docs/KEYBINDINGS.md')
    },
    saveKeybindings () {
      if (this.keybindingConfigurator && this.keybindingList.length > 0) {
        this.keybindingConfigurator.save()
          .then(success => {
            if (!success) {
              notice.notify({
                title: translate('preferences.keybindings.saveFailedTitle'),
                type: 'error',
                message: translate('preferences.keybindings.saveFailedMessage')
              })
            }
          })
          .catch(error => log.error(error))
      }
    },
    restoreDefaults () {
      this.keybindingConfigurator.resetAll()
        .then(success => {
          if (!success) {
            notice.notify({
              title: translate('preferences.keybindings.saveFailedTitle'),
              type: 'error',
              message: translate('preferences.keybindings.saveFailedMessage')
            })
          }
        })
        .catch(error => log.error(error))
    },
    handleEditClick (index, entry) {
      if (index >= 0 && entry) {
        this.selectedShortcutId = entry.id
      }
    },
    handleResetClick (index, entry) {
      const { keybindingConfigurator } = this
      const { id } = entry
      const success = keybindingConfigurator.resetToDefault(id)
      if (!success) {
        this.handleDuplicateShortcut(id, keybindingConfigurator.getDefaultAccelerator(id))
      }
    },
    handleUnbindClick (index, entry) {
      this.keybindingConfigurator.unbind(entry.id)
    },
    onKeybinding (value) {
      const selectedId = this.selectedShortcutId
      if (value && selectedId) {
        const success = this.keybindingConfigurator.change(selectedId, value)
        if (!success) {
          this.handleDuplicateShortcut(selectedId, value)
        }
      }
      this.selectedShortcutId = null
    },
    handleDuplicateShortcut (id, accelerator) {
      notice.notify({
        title: translate('preferences.keybindings.shortcutInUseTitle'),
        type: 'warning',
        message: translate('preferences.keybindings.shortcutInUseMessage', { accelerator })
      })
    },
    dumpKeyboardInformation () {
      ipcRenderer.send('mt::keybinding-debug-dump-keyboard-info')
    }
  }
}
</script>

<style scoped>
.pref-keybindings {
  & .keyboard-debug,
  & .keybindings {
    font-size: 14px;
    margin: 20px 0;
    color: var(--editorColor);
    & .link {
      cursor: pointer;
    }
  }
  & .keybindings > div.text {
    margin-bottom: 10px;
  }
  & .link {
    color: var(--themeColor);
    cursor: pointer;
  }
  & button.el-button {
    font-size: 13px;
  }
}
.el-table, .el-table__expanded-cell {
  background: var(--editorBgColor);
}
.el-table button {
  padding: 2px 2px;
  margin: 4px 0px;
  color: var(--themeColor);
  background: none;
  border: none;
}
.el-table button:not(:last-child) {
  margin-right: 4px;
}
.el-table button:hover,
.el-table button:active {
  opacity: 0.9;
  background: none;
}
</style>
<style>
.pref-keybindings .el-table table {
  margin: 0;
  border: none;
}
.pref-keybindings .el-table th,
.pref-keybindings .el-table tr {
  background: var(--editorBgColor);
}
.pref-keybindings .el-table th.el-table__cell.is-leaf,
.pref-keybindings .el-table th,
.pref-keybindings .el-table td {
  border: none;
}
.pref-keybindings .el-table th.el-table__cell.is-leaf:last-child,
.pref-keybindings .el-table th:last-child,
.pref-keybindings .el-table td:last-child {
  border-right: 1px solid var(--tableBorderColor);
}
.pref-keybindings .el-table--border::after,
.pref-keybindings .el-table--group::after,
.pref-keybindings .el-table::before,
.pref-keybindings .el-table__fixed-right::before,
.pref-keybindings .el-table__fixed::before {
  background: var(--tableBorderColor);
}
.pref-keybindings .el-table__body tr.hover-row.current-row>td,
.pref-keybindings .el-table__body tr.hover-row.el-table__row--striped.current-row>td,
.pref-keybindings .el-table__body tr.hover-row.el-table__row--striped>td,
.pref-keybindings .el-table__body tr.hover-row>td {
  background: var(--selectionColor);
}
.pref-keybindings .el-table .el-table__cell {
  padding: 2px 0;
  margin: 0;
}
</style>
