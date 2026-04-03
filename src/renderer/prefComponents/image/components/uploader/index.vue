<template>
  <div class="pref-image-uploader">
    <h5>{{ $t('preferences.image.uploader.title') }}</h5>
    <section class="current-uploader">
      <div v-if="isValidUploaderService(currentUploader)">{{ $t('preferences.image.uploader.currentUploader', { name: getServiceNameById(currentUploader) }) }}</div>
      <span v-else>{{ $t('preferences.image.uploader.noUploader') }}</span>
    </section>
    <section class="configration">
      <cur-select :value="currentUploader" :options="uploaderOptions"
        :onChange="value => setCurrentUploader(value)"></cur-select>
      <div class="picgo" v-if="currentUploader === 'picgo'">
        <div v-if="!picgoExists" class="warning">
          {{ $t('preferences.image.uploader.picgoNotInstalled', { link: $t('preferences.image.uploader.picgoLink') }) }}
          <span class="link"
            @click="open('https://github.com/PicGo/PicGo-Core')">{{ $t('preferences.image.uploader.picgoLink') }}</span>
        </div>
      </div>
      <div class="github" v-if="currentUploader === 'github'">
        <div class="warning">{{ $t('preferences.image.uploader.githubWarning') }}</div>
        <div class="form-group">
          <div class="label">
            {{ $t('preferences.image.uploader.githubToken') }}
            <span
              class="item github-token-help"
              :title="$t('preferences.image.uploader.githubTokenHint')"
            >
              <el-icon><InfoFilled /></el-icon>
            </span>
          </div>
          <el-input v-model="githubToken" :placeholder="$t('preferences.image.uploader.tokenPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <div class="label">{{ $t('preferences.image.uploader.ownerName') }}</div>
          <el-input v-model="github.owner" :placeholder="$t('preferences.image.uploader.ownerPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <div class="label">{{ $t('preferences.image.uploader.repoName') }}</div>
          <el-input v-model="github.repo" :placeholder="$t('preferences.image.uploader.repoPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <div class="label">{{ $t('preferences.image.uploader.branchName') }}</div>
          <el-input v-model="github.branch" :placeholder="$t('preferences.image.uploader.branchPlaceholder')" size="mini"></el-input>
        </div>
        <legal-notices-checkbox class="github"
          :class="[{ 'error': legalNoticesErrorStates.github }]"
          :uploaderService="uploadServices.github"></legal-notices-checkbox>
        <div class="form-group">
          <el-button size="mini" :disabled="githubDisable" @click="save('github')">{{ $t('preferences.image.uploader.saveConfigTitle') }}
          </el-button>
        </div>
      </div>
      <div class="script" v-else-if="currentUploader === 'cliScript'">
        <div class="description">{{ $t('preferences.image.uploader.scriptDesc') }}
          <code>src</code> {{ $t('preferences.image.uploader.scriptDescHtml') }}.
        </div>
        <div class="form-group">
          <div class="label">{{ $t('preferences.image.uploader.scriptLocation') }}</div>
          <el-input v-model="cliScript" :placeholder="$t('preferences.image.uploader.scriptPathPlaceholder')" size="mini"></el-input>
        </div>
        <div class="form-group">
          <el-button size="mini" :disabled="cliScriptDisable" @click="save('cliScript')">{{ $t('preferences.image.uploader.saveConfigTitle') }}
          </el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { shell } from 'electron'
import services, { isValidService } from './services.js'
import legalNoticesCheckbox from './legalNoticesCheckbox'
import { isFileExecutableSync } from '@/util/fileSystem'
import CurSelect from '@/prefComponents/common/select'
import commandExists from 'command-exists'
import notice from '@/services/notification'
import { translate } from '../../../../i18n'

export default {
  components: {
    legalNoticesCheckbox,
    CurSelect
  },
  data () {
    this.uploaderOptions = Object.keys(services).map(name => {
      const { name: label } = services[name]
      return {
        label,
        value: name
      }
    })
    return {
      githubToken: '',
      github: {
        owner: '',
        repo: '',
        branch: ''
      },
      cliScript: '',
      picgoExists: true,
      uploadServices: services,
      legalNoticesErrorStates: {
        github: false
      }
    }
  },
  computed: {
    currentUploader: {
      get: function () {
        return this.$store.state.preferences.currentUploader
      }
    },
    imageBed: {
      get: function () {
        return this.$store.state.preferences.imageBed
      }
    },
    prefGithubToken: {
      get: function () {
        return this.$store.state.preferences.githubToken
      }
    },
    prefCliScript: {
      get: function () {
        return this.$store.state.preferences.cliScript
      }
    },
    githubDisable () {
      return !this.githubToken || !this.github.owner || !this.github.repo
    },
    cliScriptDisable () {
      if (!this.cliScript) {
        return true
      }
      return !isFileExecutableSync(this.cliScript)
    }
  },
  watch: {
    imageBed: function (value, oldValue) {
      if (value !== oldValue) {
        this.github = value.github
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.github = this.imageBed.github
      this.githubToken = this.prefGithubToken
      this.cliScript = this.prefCliScript
      this.testPicgo()

      if (services.hasOwnProperty(this.currentUploader)) {
        services[this.currentUploader].agreedToLegalNotices = true
      }
    })
  },
  methods: {
    isValidUploaderService (name) {
      return isValidService(name)
    },

    getServiceNameById (id) {
      const service = services[id]
      return service ? service.name : id
    },

    open (link) {
      shell.openExternal(link)
    },

    save (type) {
      if (!this.validate(type)) {
        return
      }
      const newImageBedConfig = Object.assign({}, this.imageBed, { [type]: this[type] })
      this.$store.dispatch('SET_USER_DATA', {
        type: 'imageBed',
        value: newImageBedConfig
      })
      if (type === 'github') {
        this.$store.dispatch('SET_USER_DATA', {
          type: 'githubToken',
          value: this.githubToken
        })
      }
      if (type === 'cliScript') {
        this.$store.dispatch('SET_USER_DATA', {
          type: 'cliScript',
          value: this.cliScript
        })
      }
      notice.notify({
        title: translate('preferences.image.uploader.saveConfigTitle'),
        message: type === 'github' ? translate('preferences.image.uploader.githubSaved') : translate('preferences.image.uploader.scriptSaved'),
        type: 'primary'
      })
    },

    setCurrentUploader (value) {
      const type = 'currentUploader'
      this.$store.dispatch('SET_USER_DATA', { type, value })
    },

    testPicgo () {
      this.picgoExists = commandExists.sync('picgo')
    },

    validate (value) {
      const service = services[value]
      const { agreedToLegalNotices } = service
      if (!agreedToLegalNotices) {
        this.legalNoticesErrorStates[value] = true
        return false
      }
      if (this.legalNoticesErrorStates[value] !== undefined) {
        this.legalNoticesErrorStates[value] = false
      }

      return true
    }
  }
}
</script>

<style>
.pref-image-uploader {
  color: var(--editorColor);
  font-size: 14px;

  & .current-uploader {
    margin: 20px 0;
  }
  & .warning {
    color: var(--deleteColor);
  }
  & .link {
    color: var(--themeColor);
    cursor: pointer;
  }
  & .description {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  & .form-group {
    margin: 20px 0 0 0;
  }
  & .label {
    margin-bottom: 10px;
  }
  & .el-input__inner {
    background: transparent;
  }
  & .el-button.btn-reset,
  & .button-group {
    margin-top: 30px;
  }
  & .pref-cb-legal-notices {
    &.github {
      margin-top: 30px;
    }
    &.error {
      border: 1px solid var(--deleteColor);
    }
  }
}
</style>
