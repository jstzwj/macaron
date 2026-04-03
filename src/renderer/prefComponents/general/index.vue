<template>
  <div class="pref-general">
    <h4>{{ $t('settings.general.title') }}</h4>
    <compound>
      <template #head>
        <h6 class="title">{{ $t('settings.general.autoSave') }}:</h6>
      </template>
      <template #children>
        <bool
          :description="$t('settings.general.autoSaveDescription')"
          :bool="autoSave"
          :onChange="value => onSelectChange('autoSave', value)"
        ></bool>
        <range
          :description="$t('settings.general.autoSaveDelayDescription')"
          :value="autoSaveDelay"
          :min="1000"
          :max="10000"
          unit="ms"
          :step="100"
          :onChange="value => onSelectChange('autoSaveDelay', value)"
        ></range>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('settings.general.window') }}:</h6>
      </template>
      <template #children>
        <cur-select
          v-if="!isOsx"
          :description="$t('settings.general.titleBarStyle')"
          :notes="$t('settings.general.requiresRestart')"
          :value="titleBarStyle"
          :options="translatedTitleBarStyleOptions"
          :onChange="value => onSelectChange('titleBarStyle', value)"
        ></cur-select>
        <bool
          :description="$t('settings.general.hideScrollbars')"
          :bool="hideScrollbar"
          :onChange="value => onSelectChange('hideScrollbar', value)"
        ></bool>
        <bool
          :description="$t('settings.general.openFilesInNewWindow')"
          :bool="openFilesInNewWindow"
          :onChange="value => onSelectChange('openFilesInNewWindow', value)"
        ></bool>
        <bool
          :description="$t('settings.general.openFoldersInNewWindow')"
          :bool="openFolderInNewWindow"
          :onChange="value => onSelectChange('openFolderInNewWindow', value)"
        ></bool>
        <cur-select
          :description="$t('settings.general.zoom')"
          :value="zoom"
          :options="zoomOptions"
          :onChange="value => onSelectChange('zoom', value)"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('settings.general.sidebar') }}:</h6>
      </template>
      <template #children>
        <bool
          :description="$t('settings.general.wrapTextInToc')"
          :bool="wordWrapInToc"
          :onChange="value => onSelectChange('wordWrapInToc', value)"
        ></bool>

        <cur-select
          :description="$t('settings.general.sortFieldForFilesInOpenFolders')"
          :value="fileSortBy"
          :options="translatedFileSortByOptions"
          :onChange="value => onSelectChange('fileSortBy', value)"
          :disable="true"
        ></cur-select>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('settings.general.startupAction') }}:</h6>
      </template>
      <template #children>
        <section class="startup-action-ctrl">
          <label>
            <input
              type="radio"
              name="startup-action"
              value="folder"
              v-model="startUpAction"
            >
            {{ $t('settings.general.openDefaultDirectory') }}<span>: {{defaultDirectoryToOpen}}</span>
          </label>
          <button type="button" class="select-folder-button" @click="selectDefaultDirectoryToOpen">{{ $t('settings.general.selectFolder') }}</button>
          <label>
            <input
              type="radio"
              name="startup-action"
              value="blank"
              v-model="startUpAction"
            >
            {{ $t('settings.general.openBlankPage') }}
          </label>
        </section>
      </template>
    </compound>

    <compound>
      <template #head>
        <h6 class="title">{{ $t('settings.general.misc') }}:</h6>
      </template>
      <template #children>
        <cur-select
          :description="$t('settings.general.userInterfaceLanguage')"
          :notes="$t('settings.general.requiresRestart')"
          :value="language"
          :options="translatedLanguageOptions"
          :onChange="value => onSelectChange('language', value)"
        ></cur-select>
      </template>
    </compound>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Compound from '../common/compound'
import Range from '../common/range'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import Separator from '../common/separator'
import { isOsx } from '@/util'

import {
  titleBarStyleOptions,
  zoomOptions,
  fileSortByOptions,
  languageOptions
} from './config'

const translateOptions = (translator, options) => {
  return options.map(option => ({
    ...option,
    label: option.labelKey ? translator(option.labelKey) : option.label
  }))
}

export default {
  components: {
    Compound,
    Bool,
    Range,
    CurSelect,
    Separator
  },
  data () {
    this.zoomOptions = zoomOptions
    this.isOsx = isOsx
    return {}
  },
  computed: {
    ...mapState({
      autoSave: state => state.preferences.autoSave,
      autoSaveDelay: state => state.preferences.autoSaveDelay,
      titleBarStyle: state => state.preferences.titleBarStyle,
      defaultDirectoryToOpen: state => state.preferences.defaultDirectoryToOpen,
      openFilesInNewWindow: state => state.preferences.openFilesInNewWindow,
      openFolderInNewWindow: state => state.preferences.openFolderInNewWindow,
      zoom: state => state.preferences.zoom,
      hideScrollbar: state => state.preferences.hideScrollbar,
      wordWrapInToc: state => state.preferences.wordWrapInToc,
      fileSortBy: state => state.preferences.fileSortBy,
      language: state => state.preferences.language
    }),
    translatedTitleBarStyleOptions () {
      return translateOptions(this.$t, titleBarStyleOptions)
    },
    translatedFileSortByOptions () {
      return translateOptions(this.$t, fileSortByOptions)
    },
    translatedLanguageOptions () {
      return translateOptions(this.$t, languageOptions)
    },
    startUpAction: {
      get: function () {
        return this.$store.state.preferences.startUpAction
      },
      set: function (value) {
        const type = 'startUpAction'
        this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
      }
    }
  },
  methods: {
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    },
    selectDefaultDirectoryToOpen () {
      this.$store.dispatch('SELECT_DEFAULT_DIRECTORY_TO_OPEN')
    }
  }
}
</script>

<style scoped>
  .pref-general {
    & .startup-action-ctrl {
      font-size: 14px;
      user-select: none;
      color: var(--editorColor);
      & .el-button--small {
        margin-left: 25px;
      }
      & label {
        display: block;
        margin: 20px 0;
      }
    }
  }
</style>
