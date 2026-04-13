<template>
  <section class="image-folder">
    <h5>{{ $t('preferences.image.folder.globalOrRelative') }}</h5>
    <text-box :description="$t('preferences.image.folder.globalFolder')" :input="imageFolderPath"
      :regexValidator="/^(?:$|([a-zA-Z]:)?[\/\\].*$)/" :defaultValue="folderPathPlaceholder"
      :onChange="value => modifyImageFolderPath(value)"></text-box>
    <div>
      <el-button size="small" @click="modifyImageFolderPath(undefined)">{{ $t('preferences.image.folder.open') }}</el-button>
      <el-button size="small" @click="openImageFolder">{{ $t('preferences.image.folder.showInFolder') }}</el-button>
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
  }
  & .el-button--small {
    color: var(--editorColor);
    background: transparent;
    border-color: var(--editorColor10);
    font-size: 13px;
  }
  & .el-button--small:hover {
    background: var(--floatHoverColor);
    border-color: var(--editorColor30);
  }
}
</style>
