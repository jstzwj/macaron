<template>
  <section class="pref-range-item" :class="{'ag-underdevelop': disable}">
    <div class="description">
      <span>{{description}}:</span> <span class="value" v-if="selectValue !== undefined && selectValue !== null">{{selectValue}} <span v-if="unit">{{unit}}</span></span>
      <el-icon v-if="more"
        @click="handleMoreClick"
      ><InfoFilled /></el-icon>
    </div>
    <input
      class="range-input"
      type="range"
      v-model="selectValue"
      @change="select(Number($event.target.value))"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disable"
    >
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
    value: String | Number,
    min: Number,
    max: Number,
    onChange: Function,
    unit: String,
    step: Number,
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
.pref-range-item {
  margin: 20px 0;
  font-size: 14px;
  color: var(--editorColor);
  width: 100%;
  & .value {
    text-align: right;
    font-style: italic;
    float: right;
    color: var(--editorColor80);
  }
  & .range-input {
    width: 100%;
    accent-color: var(--themeColor);
  }
}
.pref-range-item .description {
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
</style>
