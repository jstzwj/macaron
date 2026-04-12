<template>
  <div class="pref-sidebar">
    <section class="search-wrapper">
      <input
        class="search-input"
        v-model="state"
        :placeholder="$t('settings.searchPlaceholder')"
      >
      <div v-if="state && filteredResults.length" class="search-results">
        <button
          v-for="item of filteredResults"
          :key="`${item.category}-${item.preference}`"
          class="search-result-item"
          type="button"
          @click="handleSelect(item)"
        >
          <div class="name">{{ item.category }}</div>
          <span class="addr">{{ item.preference }}</span>
        </button>
      </div>
    </section>
    <section class="category">
      <div v-for="c of translatedCategory" :key="c.label" class="item"
        @click="handleCategoryItemClick(c)"
        :class="{active: c.label === currentCategory}"
      >
        <svg :viewBox="c.icon.viewBox">
          <use :xlink:href="c.icon.url"></use>
        </svg>
        <span>{{ c.name }}</span>
      </div>
    </section>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import { category, searchContent } from './config'

export default {
  props: {
    useRouter: {
      type: Boolean,
      default: true
    },
    activeCategory: {
      type: String,
      default: 'general'
    }
  },
  data () {
    this.category = category
    return {
      currentCategory: 'general',
      searchItems: [],
      state: ''
    }
  },
  computed: {
    filteredResults () {
      const query = this.state.trim().toLowerCase()
      if (!query) {
        return []
      }

      return this.searchItems.filter(item => {
        return item.preference.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      })
    },
    translatedCategory () {
      return this.category.map(item => ({
        ...item,
        name: this.$t(item.nameKey)
      }))
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.useRouter && to.name !== from.name) {
        this.currentCategory = to.name
      }
    },
    activeCategory (val) {
      if (!this.useRouter && val) {
        this.currentCategory = val
      }
    }
  },
  methods: {
    handleSelect (item) {
      if (this.useRouter) {
        this.$router.push({
          path: `/preference/${item.category.toLowerCase()}`
        })
      } else {
        const label = item.category.toLowerCase()
        this.currentCategory = label
        this.$emit('category-change', label)
      }
    },
    handleCategoryItemClick (item) {
      const { currentCategory } = this
      if (item.label !== currentCategory) {
        if (this.useRouter) {
          this.$router.push({
            path: item.path
          })
        } else {
          this.currentCategory = item.label
          this.$emit('category-change', item.label)
        }
      }
    },
    onIpcCategoryChange (event, category) {
      const validCategory = category && this.category.some(c => c.label === category)
      if (validCategory) {
        if (this.useRouter) {
          this.$router.push({
            path: `/preference/${category}`
          })
        } else {
          this.currentCategory = category
          this.$emit('category-change', category)
        }
      }
    }
  },

  mounted () {
    this.searchItems = searchContent
    if (this.useRouter && this.$route && this.$route.name) {
      this.currentCategory = this.$route.name
    } else if (!this.useRouter && this.activeCategory) {
      this.currentCategory = this.activeCategory
    }
    ipcRenderer.on('settings::change-tab', this.onIpcCategoryChange)
  },
  unmounted () {
    ipcRenderer.removeListener('settings::change-tab', this.onIpcCategoryChange)
  }
}
</script>

<style>
  .pref-sidebar {
    -webkit-app-region: drag;
    display: flex;
    flex-direction: column;
    background: var(--sideBarBgColor);
    width: var(--prefSideBarWidth);
    height: 100%;
    box-sizing: border-box;
  }
  .search-wrapper {
    -webkit-app-region: no-drag;
    padding: 0 20px;
    margin: 20px 0 16px;
    position: relative;
  }
  .search-input {
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 12px;
    box-sizing: border-box;
    background: var(--inputBgColor);
    color: var(--editorColor);
    border: 1px solid var(--floatBorderColor);
    border-radius: 8px;
    outline: none;
    font-size: 13px;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .search-input:focus {
    border-color: var(--themeColor);
    box-shadow: 0 0 0 3px var(--themeColor10);
  }
  .search-results {
    margin-top: 8px;
    max-height: 240px;
    overflow-y: auto;
    background: var(--floatBgColor);
    border: 1px solid var(--floatBorderColor);
    border-radius: 8px;
  }
  .search-result-item {
    width: 100%;
    display: block;
    text-align: left;
    padding: 8px 12px;
    border: 0;
    background: transparent;
    cursor: pointer;
    opacity: .8;
    color: inherit;
    border-radius: 4px;
  }
  .search-result-item:hover {
    background: var(--floatHoverColor);
  }
  .search-result-item .name {
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--editorColor80);
  }
  .search-result-item .addr {
    font-size: 12px;
    color: var(--editorColor);
  }
  .category {
    -webkit-app-region: no-drag;
    overflow-y: auto;
    & .item {
      width: calc(100% - 16px);
      margin: 1px 8px;
      height: 44px;
      font-size: 14px;
      font-weight: 500;
      color: var(--sideBarColor);
      padding-left: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      position: relative;
      user-select: none;
      border-radius: 6px;
      transition: background-color 0.15s ease, color 0.15s ease;
      & > svg {
        width: 20px;
        height: 20px;
        fill: var(--iconColor);
        margin-right: 12px;
        transition: fill 0.15s ease;
      }
      &:hover {
        background: var(--sideBarItemHoverBgColor);
      }
      &::before {
        content: '';
        width: 3px;
        height: 0;
        background: var(--themeColor);
        position: absolute;
        left: 0;
        border-radius: 0 2px 2px 0;
        transition: height 0.2s ease-in-out;
        top: 50%;
        transform: translateY(-50%);
      }
      &.active {
        color: var(--sideBarTitleColor);
        background: var(--themeColor10);
      }
      &.active > svg {
        fill: var(--themeColor);
      }
      &.active::before {
        height: 60%;
      }
    }
  }
</style>
