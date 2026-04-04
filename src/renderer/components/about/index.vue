<template>
  <div class="about-dialog">
    <el-dialog
      v-if="renderAboutDialog"
      v-model="showAboutDialog"
      :teleported="false"
      :show-close="false"
      :modal="true"
      @closed="afterDialogClosed"
      class="ag-dialog-table"
      width="400px"
    >
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
    </el-dialog>
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
    afterDialogClosed () {
      this.renderAboutDialog = false
    }
  }
}
</script>

<style>
  .about-dialog el-row,
  .about-dialog el-col {
    display: block;
  }

  .about-dialog img.logo {
    width: 80px;
    height: 80px;
    display: inherit;
    margin: 0 auto;
  }

  .about-dialog .title,
  .about-dialog .text {
    min-height: 32px;
    text-align: center;
  }

  .about-dialog .title {
    color: var(--floatFontColor);
  }

  .about-dialog .text {
    color: var(--floatFontColor);
  }
</style>
