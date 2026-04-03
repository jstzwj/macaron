<template>
  <section class="pref-text-box-item" :class="{'ag-underdevelop': disable}">
    <div class="description">
      <span>{{description}}:</span>
      <el-icon v-if="more"
        @click="handleMoreClick"
      ><InfoFilled /></el-icon>
    </div>
    <div class="input" :class="{ error: invalidInput }">
      <input
        class="input-inner"
        :placeholder="defaultValue"
        v-model="inputText"
        @input="handleInput($event.target.value)"
        :disabled="disable"
      >
      <button
        v-if="inputText"
        class="clear-button"
        type="button"
        @click="clearInput"
        :disabled="disable"
        aria-label="Clear input"
      >
        ×
      </button>
    </div>
    <div v-if="notes" class="notes">
      {{notes}}
    </div>
  </section>
</template>

<script>
import { shell } from 'electron'

export default {
  data () {
    this.inputTimer = null
    return {
      inputText: this.input,
      invalidInput: false
    }
  },
  props: {
    description: String,
    notes: String,
    input: String,
    onChange: Function,
    more: String,
    disable: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: String,
      default: ''
    },
    emitTime: {
      type: Number,
      default: 800
    },
    regexValidator: {
      type: RegExp,
      default () {
        return /(.*?)/
      }
    }
  },
  watch: {
    input: function (value, oldValue) {
      if (value !== oldValue) {
        this.inputText = value
      }
    }
  },
  methods: {
    handleMoreClick () {
      if (typeof this.more === 'string') {
        shell.openExternal(this.more)
      }
    },
    clearInput () {
      this.inputText = ''
      this.handleInput('')
    },
    handleInput (value) {
      const result = this.regexValidator.test(value)
      this.invalidInput = !result

      if (result) {
        if (this.inputTimer) {
          clearTimeout(this.inputTimer)
        }

        const { emitTime } = this
        if (emitTime === 0) {
          this.onChange(value)
          return
        }

        this.inputTimer = setTimeout(() => {
          this.inputTimer = null
          this.onChange(value)
        }, emitTime)
      }
    }
  }
}
</script>

<style>
  .pref-text-box-item {
    font-size: 14px;
    user-select: none;
    margin: 20px 0;
    color: var(--editorColor);
    width: 100%;
    & .notes {
      margin-top: 10px;
      font-style: italic;
      font-size: 12px;
    }
    & .input {
      width: 100%;
      display: flex;
      align-items: center;
      background: transparent;
      color: var(--editorColor);
      border: 1px solid var(--editorColor10);
      border-radius: 4px;
      box-sizing: border-box;
      padding-right: 8px;
    }
    & .input.error .input-inner {
      color: #f56c6c;
    }
    & .input:focus-within {
      border-color: var(--themeColor);
    }
    & .input-inner {
      flex: 1;
      height: 30px;
      background: transparent;
      color: var(--editorColor);
      border: none;
      padding: 0 12px;
      outline: none;
      box-sizing: border-box;
    }
    & .input-inner::placeholder {
      color: var(--editorColor30);
    }
    & .clear-button {
      border: none;
      background: transparent;
      color: var(--editorColor30);
      cursor: pointer;
      font-size: 18px;
      line-height: 1;
      padding: 0;
    }
    & .description {
      margin-bottom: 10px;
    }
    & i {
      cursor: pointer;
      opacity: .7;
      color: var(--iconColor);
    }
    & i:hover {
      color: var(--themeColor);
    }
  }
</style>
