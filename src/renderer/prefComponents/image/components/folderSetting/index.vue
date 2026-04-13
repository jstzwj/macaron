<template>
  <section class="image-folder">
    <h5>{{ $t('preferences.image.folder.globalOrRelative') }}</h5>
    <text-box :description="$t('preferences.image.folder.globalFolder')" :input="imageFolderPath"
      :regexValidator="/^(?:$|([a-zA-Z]:)?[\/\\].*$)/" :defaultValue="folderPathPlaceholder"
      :onChange="value => modifyImageFolderPath(value)"></text-box>
    <div>
      <el-button class="pref-action-button folder-action-button" size="small" @click="modifyImageFolderPath(undefined)">{{ $t('preferences.image.folder.open') }}</el-button>
      <el-button class="pref-action-button folder-action-button" size="small" @click="openImageFolder">{{ $t('preferences.image.folder.showInFolder') }}</el-button>
    </div>
    <compound>
      <template #head>
        <bool :description="$t('preferences.image.folder.preferRelative')"
          more="https://github.com/jstzwj/macaron/blob/develop/docs/IMAGES.md"
          :bool="imagePreferRelativeDirectory"
          :onChange="value => onSelectChange('imagePreferRelativeDirectory', value)"></bool>
      </template>
      <template #children>
        <text-box :description="$t('preferences.image.folder.relativeName')" :input="imageRelativeDirectoryName"
          :regexValidator="/^(?:$|(?![a-zA-Z]:)[^\/\\].*$)/"
          :defaultValue="relativeDirectoryNamePlaceholder"
          :onChange="value => onSelectChange('imageRelativeDirectoryName', value)"></text-box>
        <div class="footnote">
          {{ $t('preferences.image.folder.footnotePrefix') }}<code>${filename}</code>{{ $t('preferences.image.folder.footnoteSuffix') }}
        </div>
      </template>
    </compound>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { shell } from 'electron'
import Bool from '@/prefComponents/common/bool'
import Compound from '@/prefComponents/common/compound'
import TextBox from '@/prefComponents/common/textBox'

export default {
  components: {
    Bool,
    Compound,
    TextBox
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      imageFolderPath: state => state.preferences.imageFolderPath,
      imagePreferRelativeDirectory: state => state.preferences.imagePreferRelativeDirectory,
      imageRelativeDirectoryName: state => state.preferences.imageRelativeDirectoryName
    }),
    imageInsertAction: {
      get: function () {
        return this.$store.state.preferences.imageInsertAction
      }
    },
    folderPathPlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageFolderPath || ''
      }
    },
    relativeDirectoryNamePlaceholder: {
      get: function () {
        return this.$store.state.preferences.imageRelativeDirectoryName || 'assets'
      }
    }
  },
  methods: {
    openImageFolder () {
      shell.openPath(this.imageFolderPath)
    },
    modifyImageFolderPath (value) {
      return this.$store.dispatch('SET_IMAGE_FOLDER_PATH', value)
    },
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style scoped>
.image-folder {
  & .footnote {
    font-size: 13px;
    & code {
      font-size: 13px;
    }
  }
  & > div {
    margin-top: 10px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  & .folder-action-button.el-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 14px;
    border: 1px solid var(--tableBorderColor);
    border-radius: 8px;
    background: var(--buttonBgColor);
    color: var(--buttonFontColor);
    font-size: 13px;
    line-height: 1.2;
    box-shadow: var(--buttonShadow);
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  }
  & .folder-action-button.el-button:hover {
    background: var(--buttonBgColorHover);
    border-color: var(--buttonBorderHover);
    color: var(--buttonFontColorHover);
  }
  & .folder-action-button.el-button:active {
    background: var(--buttonBgColorActive);
    border-color: var(--buttonBorderActive);
    color: var(--buttonFontColorActive);
  }
}
</style>
