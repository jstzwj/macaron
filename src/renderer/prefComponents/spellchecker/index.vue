<template>
  <div class="pref-spellchecker">
    <h4>{{ $t('preferences.spellchecker.title') }}</h4>
    <compound :disable="!spellcheckerEnabled">
      <template #head>
        <bool
          :description="$t('preferences.spellchecker.enableSpellcheck')"
          :bool="spellcheckerEnabled"
          :onChange="handleSpellcheckerEnabled"
        ></bool>
      </template>
      <template #children>
        <bool
          :description="$t('preferences.spellchecker.hideMarks')"
          :bool="spellcheckerNoUnderline"
          :onChange="value => onSelectChange('spellcheckerNoUnderline', value)"
        ></bool>
        <bool
          v-show="isOsx"
          :description="$t('preferences.spellchecker.autoDetectLanguage')"
          :bool="true"
          :disable="true"
        ></bool>
        <cur-select
          v-show="!isOsx"
          :description="$t('preferences.spellchecker.defaultLanguage')"
          :value="spellcheckerLanguage"
          :options="availableDictionaries"
          :onChange="handleSpellcheckerLanguage"
        ></cur-select>
      </template>
    </compound>

    <div v-if="isOsx && spellcheckerEnabled" class="description">
      {{ $t('preferences.spellchecker.macOSInfo') }}
    </div>
  </div>
</template>

<script>
import log from 'electron-log/renderer'
import { mapState } from 'vuex'
import Compound from '../common/compound'
import CurSelect from '../common/select'
import Bool from '../common/bool'
import { isOsx } from '@/util'
import { SpellChecker } from '@/spellchecker'
import { getLanguageName } from '@/spellchecker/languageMap'
import notice from '@/services/notification'
import { translate } from '../../i18n'

export default {
  components: {
    Bool,
    Compound,
    CurSelect
  },
  data () {
    this.isOsx = isOsx
    return {
      availableDictionaries: []
    }
  },
  computed: {
    ...mapState({
      spellcheckerEnabled: state => state.preferences.spellcheckerEnabled,
      spellcheckerNoUnderline: state => state.preferences.spellcheckerNoUnderline,
      spellcheckerLanguage: state => state.preferences.spellcheckerLanguage
    })
  },
  mounted () {
    if (!isOsx) {
      this.getAvailableDictionaries()
        .then(dicts => {
          this.availableDictionaries = dicts
        })
    }
  },
  methods: {
    async getAvailableDictionaries () {
      const dictionaries = await SpellChecker.getAvailableDictionaries()
      return dictionaries.map(selectedItem => {
        return {
          value: selectedItem,
          label: getLanguageName(selectedItem)
        }
      })
    },
    async ensureDictLanguage (lang) {
      if (!this.spellchecker) {
        this.spellchecker = new SpellChecker(true, 'en-US')
      }
      await this.spellchecker.switchLanguage(lang)
    },

    handleSpellcheckerLanguage (languageCode) {
      this.ensureDictLanguage(languageCode)
        .then(() => {
          this.onSelectChange('spellcheckerLanguage', languageCode)
        })
        .catch(error => {
          log.error(error)
          notice.notify({
            title: translate('preferences.spellchecker.switchLanguageFailed'),
            type: 'error',
            message: error.message
          })
        })
    },
    handleSpellcheckerEnabled (isEnabled) {
      this.onSelectChange('spellcheckerEnabled', isEnabled)
    },
    onSelectChange (type, value) {
      this.$store.dispatch('SET_SINGLE_PREFERENCE', { type, value })
    }
  }
}
</script>

<style scoped>
  .pref-spellchecker {
    & div.description {
      margin-top: 10px;
      margin-bottom: 2px;
      color: var(--iconColor);
      font-size: 14px;
    }
    & h6.title {
      font-weight: 400;
      font-size: 1.1em;
      margin-bottom: 0;
    }
  }
  .pref-spellchecker li.el-select-dropdown__item {
    color: var(--editorColor);
    height: 30px;
  }
  .pref-spellchecker li.el-select-dropdown__item.hover, li.el-select-dropdown__item:hover {
    background: var(--floatHoverColor);
  }
  .pref-spellchecker div.el-select-dropdown {
    background: var(--floatBgColor);
    border-color: var(--floatBorderColor);
    & .el-popper__arrow {
      display: none;
    }
  }
  .pref-spellchecker input.el-input__inner {
    height: 30px;
    background: transparent;
    color: var(--editorColor);
    border-color: var(--editorColor10);
  }
  .pref-spellchecker .el-input__icon,
  .pref-spellchecker .el-input__inner {
    line-height: 30px;
  }
</style>
