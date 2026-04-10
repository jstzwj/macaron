<template>
  <div class="about-dialog" v-if="renderAboutDialog" @click="showAboutDialog = false">
    <div class="about-dialog-overlay"></div>
    <div class="about-dialog-panel" @click.stop>
      <img class="logo" :src="logo" />
      <el-row>
        <el-col :span="24">
          <h3 class="title">{{ name }}</h3>
        </el-col>
        <el-col :span="24">
          <div class="text">{{ appVersion }}</div>
        </el-col>
        <el-col :span="24">
          <div class="text" style="min-height: auto">{{ copyright }}</div>
        </el-col>
        <el-col :span="24">
          <div class="text">{{ copyrightContributors }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '../../bus'
import MarkTextLogo from '../../assets/images/logo.png'

export default {
  data () {
    this.logo = MarkTextLogo
    const currentYear = new Date().getFullYear()
    return {
      renderAboutDialog: false,
      showAboutDialog: false,
      currentYear
    }
  },
  computed: {
    ...mapState({
      appVersion: state => state.appVersion
    }),
    name () {
      return this.$t('about.appName')
    },
    copyright () {
      return this.$t('about.copyright', { year: this.currentYear })
    },
    copyrightContributors () {
      return this.$t('about.copyrightContributors', { year: this.currentYear })
    }
  },
  created () {
    bus.$on('aboutDialog', this.showDialog)
  },
  beforeUnmount () {
    bus.$off('aboutDialog', this.showDialog)
  },
  methods: {
    showDialog () {
      this.renderAboutDialog = true
      this.$nextTick(() => {
        this.showAboutDialog = true
      })
      bus.$emit('editor-blur')
    },
    hideDialog () {
      this.showAboutDialog = false
      this.renderAboutDialog = false
    }
  },
  watch: {
    showAboutDialog (val) {
      if (!val) {
        this.renderAboutDialog = false
      }
    }
  }
}
</script>

<style scoped>
.about-dialog {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-dialog-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--maskColor);
}

.about-dialog-panel {
  position: relative;
  z-index: 1;
  width: 400px;
  border-radius: 8px;
  box-shadow: var(--floatShadow);
  border: 1px solid var(--floatBorderColor);
  background-color: var(--floatBgColor);
  color: var(--editorColor);
  padding: 32px 20px 24px;
}

.about-dialog-panel img.logo {
  width: 80px;
  height: 80px;
  display: inherit;
  margin: 0 auto;
}

.about-dialog-panel .title,
.about-dialog-panel .text {
  min-height: 32px;
  text-align: center;
}

.about-dialog-panel .title {
  color: var(--floatFontColor);
}

.about-dialog-panel .text {
  color: var(--floatFontColor);
}

.about-dialog-panel el-row,
.about-dialog-panel el-col {
  display: block;
}
</style>
