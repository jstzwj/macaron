<template>
  <section class="pref-select-item" :class="{'ag-underdevelop': disable, disabled: disable}">
    <div class="description" v-if="description">
      <span>{{description}}:</span>
      <el-icon
        v-if="more"
        @click="handleMoreClick"
      ><InfoFilled /></el-icon>
    </div>
    <select
      class="select-input"
      v-model="selectValue"
      @change="select($event.target.value)"
      :disabled="disable"
    >
      <option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
      >
        {{ item.labelKey ? $t(item.labelKey) : item.label }}
      </option>
    </select>
    <div v-if="notes" class="notes">
      {{notes}}
    </div>
  </section>
</template>

<script>
import { shell } from 'electron'

export default {
  data () {
    return {
      selectValue: this.value
    }
  },
  props: {
    description: String,
    notes: String,
    value: String | Number,
    options: Array,
    onChange: Function,
    more: String,
    disable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function (value, oldValue) {
      if (value !== oldValue) {
        this.selectValue = value
      }
    }
  },
  methods: {
    handleMoreClick () {
      if (typeof this.more === 'string') {
        shell.openExternal(this.more)
      }
    },
    select (value) {
      this.onChange(value)
    }
  }
}
</script>

<style>
.pref-select-item {
  margin: 20px 0;
  font-size: 14px;
  color: var(--editorColor);
  & .notes {
    margin-top: 10px;
    font-style: italic;
    font-size: 12px;
  }
  & .select-input {
    width: 100%;
    height: 30px;
    background: transparent;
    color: var(--editorColor);
    border: 1px solid var(--editorColor10);
    border-radius: 4px;
    padding: 0 10px;
    box-sizing: border-box;
    outline: none;
  }
  & .select-input:focus {
    border-color: var(--themeColor);
  }
}
.pref-select-item .description {
  margin-bottom: 10px;
  & i {
    cursor: pointer;
    opacity: .7;
    color: var(--iconColor);
  }
  & i:hover {
    color: var(--themeColor);
  }
}
.pref-select-item.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
