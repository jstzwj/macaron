<template>
  <section class="pref-switch-item" :class="{'ag-underdevelop': disable, disabled: disable}">
    <div class="description">
      <span>{{description}}:</span>
      <el-icon v-if="more"
        @click="handleMoreClick"
      ><InfoFilled /></el-icon>
      <span
        v-else-if="detailedDescription"
        class="detail-hint"
        :title="detailedDescription"
        aria-label="Detailed description"
      >i</span>
      <span v-if="notes" class="notes">
        {{notes}}
      </span>
    </div>
    <label class="switch" :class="{ checked: status, disabled: disable }">
      <input
        type="checkbox"
        v-model="status"
        @change="handleSwitchChange(status)"
        :disabled="disable"
      >
      <span class="switch-track">
        <span class="switch-thumb"></span>
      </span>
    </label>
  </section>
</template>

<script>
import { shell } from 'electron'

export default {
  data () {
    return {
      status: this.bool
    }
  },
  props: {
    description: String,
    notes: String,
    bool: Boolean,
    onChange: Function,
    more: String,
    detailedDescription: String,
    disable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    bool: function (value, oldValue) {
      if (value !== oldValue) {
        this.status = value
      }
    }
  },
  methods: {
    handleMoreClick () {
      if (typeof this.more === 'string') {
        shell.openExternal(this.more)
      }
    },
    handleSwitchChange (value) {
      this.onChange(value)
    }
  }
}
</script>

<style>
  .pref-switch-item {
    font-size: 14px;
    user-select: none;
    margin: 20px 0;
    color: var(--editorColor);
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .description {
      & i,
      & .detail-hint {
        cursor: pointer;
        opacity: .7;
        color: var(--iconColor);
      }
      & i:hover,
      & .detail-hint:hover {
        color: var(--themeColor);
      }
    }

    & .notes {
      font-style: italic;
      font-size: 12px;
    }
  }

  .detail-hint {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: 1px solid currentColor;
    border-radius: 50%;
    font-size: 11px;
    margin-left: 4px;
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .switch.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .pref-switch-item.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .switch input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .switch-track {
    width: 38px;
    height: 22px;
    border: 2px solid var(--iconColor);
    border-radius: 999px;
    background: transparent;
    box-sizing: border-box;
    position: relative;
    transition: border-color .2s ease, background-color .2s ease;
  }

  .switch-thumb {
    position: absolute;
    top: 3px;
    left: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--iconColor);
    transition: transform .2s ease, background-color .2s ease;
  }

  .switch.checked .switch-track {
    border-color: var(--themeColor);
  }

  .switch.checked .switch-thumb {
    background: var(--themeColor);
    transform: translateX(14px);
  }
</style>
