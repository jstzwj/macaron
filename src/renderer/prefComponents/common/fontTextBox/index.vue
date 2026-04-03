<template>
  <section class="pref-font-input-item" :class="{'ag-underdevelop': disable}">
    <div class="description">
      <span>{{description}}:</span>
      <el-icon v-if="more" @click="handleMoreClick"><InfoFilled /></el-icon>
    </div>
    <div class="font-autocomplete">
      <div class="input-wrapper">
        <input
          class="input-inner"
          v-model="selectValue"
          placeholder="Select font..."
          :disabled="disable"
          @focus="openList"
          @input="openList"
        >
        <button
          class="toggle-button"
          type="button"
          @click="toggleList"
          :disabled="disable"
          aria-label="Toggle font list"
        >
          ▾
        </button>
      </div>
      <ul v-if="showList && filteredFonts.length" class="font-list">
        <li
          v-for="item in filteredFonts"
          :key="item"
          class="font-item"
          @mousedown.prevent="handleSelect(item)"
        >
          <div class="family">{{ item }}</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { shell } from 'electron'

export default {
  data () {
    this.defaultValue = this.value
    return {
      fontFamilies: [],
      selectValue: this.value,
      showList: false
    }
  },
  props: {
    description: String,
    value: String,
    onChange: Function,
    more: String,
    disable: {
      type: Boolean,
      default: false
    },
    onlyMonospace: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    filteredFonts () {
      const query = (this.selectValue || '').trim().toLowerCase()
      return query && this.defaultValue !== this.selectValue
        ? this.fontFamilies.filter(f => f.toLowerCase().indexOf(query) === 0)
        : this.fontFamilies
    }
  },

  watch: {
    value: function (value, oldValue) {
      if (value !== oldValue) {
        this.defaultValue = value
        this.selectValue = value
      }
    }
  },

  methods: {
    openList () {
      if (!this.disable) {
        this.showList = true
      }
    },
    toggleList () {
      if (!this.disable) {
        this.showList = !this.showList
      }
    },
    handleSelect (value) {
      if (/^[^\s]+((-|\s)*[^\s])*$/.test(value)) {
        this.selectValue = value
        this.showList = false
        this.onChange(value)
      }
    },
    handleMoreClick () {
      if (typeof this.more === 'string') {
        shell.openExternal(this.more)
      }
    },
    handleDocumentClick (event) {
      if (this.$el && !this.$el.contains(event.target)) {
        this.showList = false
      }
    }
  },
  mounted () {
    const fontManager = require('fontmanager-redux')
    const { onlyMonospace } = this
    const buf = fontManager.getAvailableFontsSync()
      .filter(f => f.family && (!onlyMonospace || (onlyMonospace && f.monospace)))
      .map(f => f.family)
    this.fontFamilies = [...new Set(buf)].sort((a, b) => a.localeCompare(b))
    document.addEventListener('click', this.handleDocumentClick)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.handleDocumentClick)
  }
}
</script>

<style>
.pref-font-input-item {
  margin: 20px 0;
  font-size: 14px;
  color: var(--editorColor);
  position: relative;
  & .font-autocomplete {
    width: 100%;
    position: relative;
  }
  & .input-wrapper {
    display: flex;
    align-items: center;
    border: 1px solid var(--editorColor10);
    border-radius: 4px;
    background: transparent;
  }
  & .input-wrapper:focus-within {
    border-color: var(--themeColor);
  }
  & .input-inner {
    flex: 1;
    height: 30px;
    background: transparent;
    color: var(--editorColor);
    border: none;
    padding: 0 10px;
    outline: none;
  }
  & .toggle-button {
    border: none;
    background: transparent;
    color: var(--iconColor);
    cursor: pointer;
    padding: 0 10px;
    height: 30px;
  }
}
.pref-font-input-item .description {
  margin-bottom: 10px;
  & i {
    cursor: pointer;
    opacity: 0.7;
    color: var(--iconColor);
  }
  & i:hover {
    color: var(--themeColor);
  }
}
.font-list {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  margin: 4px 0 0 0;
  padding: 4px 0;
  list-style: none;
  border: 1px solid var(--floatBorderColor);
  background-color: var(--floatBgColor);
  border-radius: 4px;
  max-height: 240px;
  overflow-y: auto;
}
.font-item {
  color: var(--editorColor);
  padding: 7px 10px;
  cursor: pointer;
}
.font-item:hover {
  background: var(--floatHoverColor);
}
</style>
