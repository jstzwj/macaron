<template>
  <div class="tweet-dialog" v-if="renderTweetDialog" @click="showTweetDialog = false">
    <div class="tweet-dialog-overlay"></div>
    <div class="tweet-dialog-panel" @click.stop>
      <div class="dialog-header">
        <div class="title">{{ $t('tweetDialog.title') }}</div>
      </div>
      <div class="body">
        <div class="feeling">
          <div>{{ $t('tweetDialog.feelingPrompt') }}</div>
          <ul>
            <li :class="{ 'active': selectedFace === 'smile' }">
              <button
                type="button"
                class="feeling-button"
                :class="{ 'active': selectedFace === 'smile' }"
                :aria-label="$t('tweetDialog.positiveAriaLabel')"
                @click="faceClick('smile')"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-smile"></use>
                </svg>
              </button>
            </li>
            <li :class="{ 'active': selectedFace === 'sad' }">
              <button
                type="button"
                class="feeling-button"
                :class="{ 'active': selectedFace === 'sad' }"
                :aria-label="$t('tweetDialog.negativeAriaLabel')"
                @click="faceClick('sad')"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sad"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div class="feedback">
          <div>{{ $t('tweetDialog.feedbackPrompt') }}</div>
          <textarea
            cols="30" rows="10" v-model="value" ref="textarea"
            @keydown.esc="showTweetDialog = false"
          ></textarea>
        </div>
        <div class="buttons">
          <button
            type="button"
            class="github"
            @click="reportViaGithub"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-github"></use>
            </svg>
            {{ $t('tweetDialog.reportGithub') }}
          </button>
          <button
            type="button"
            class="twitter"
            :class="{ 'active': value }"
            :disabled="!value"
            @click="reportViaTwitter"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-twitter"></use>
            </svg>
            {{ $t('tweetDialog.tweet') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shell } from 'electron'
import bus from '../../bus'

export default {
  data () {
    return {
      renderTweetDialog: false,
      showTweetDialog: false,
      value: '',
      selectedFace: 'smile'
    }
  },
  created () {
    bus.$on('tweetDialog', this.showDialog)
  },
  beforeUnmount () {
    bus.$off('tweetDialog', this.showDialog)
  },
  methods: {
    showDialog () {
      this.renderTweetDialog = true
      this.value = ''
      bus.$emit('editor-blur')
      this.$nextTick(() => {
        this.showTweetDialog = true
        this.$nextTick(() => {
          this.$refs.textarea.focus()
        })
      })
    },
    faceClick (name) {
      this.selectedFace = name
    },
    reportViaGithub () {
      shell.openExternal('https://github.com/jstzwj/macaron/issues/new')
    },
    reportViaTwitter () {
      const { value, selectedFace } = this
      if (!value) return
      const origin = 'https://twitter.com/intent/tweet'

      const params = {
        via: 'marktextme',
        url: encodeURI('https://github.com/jstzwj/macaron/'),
        text: value
      }

      if (selectedFace === 'smile') params.hashtags = 'happyMacaron'

      shell.openExternal(`${origin}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`)
      this.showTweetDialog = false
    }
  },
  watch: {
    showTweetDialog (val) {
      if (!val) {
        this.renderTweetDialog = false
      }
    }
  }
}
</script>

<style scoped>
.tweet-dialog {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tweet-dialog-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--maskColor);
}

.tweet-dialog-panel {
  position: relative;
  z-index: 1;
  width: min(450px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  border-radius: 8px;
  box-shadow: var(--floatShadow);
  border: 1px solid var(--floatBorderColor);
  background-color: var(--floatBgColor);
  color: var(--editorColor);
  overflow: hidden;
}

.tweet-dialog-panel .dialog-header {
  background: var(--themeColor);
  color: #fff;
  padding: 16px 20px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.tweet-dialog-panel .dialog-header .title {
  font-size: 24px;
}

.tweet-dialog-panel .body {
  padding: 16px 20px 20px;
  color: var(--sideBarColor);
}

.tweet-dialog-panel .feeling,
.tweet-dialog-panel .feedback {
  font-size: 16px;
}

.tweet-dialog-panel .feeling ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  min-height: 45px;
}

.tweet-dialog-panel .feeling ul li {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.tweet-dialog-panel .feeling-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.tweet-dialog-panel .feeling-button svg {
  transition: color .25s ease-in-out;
  width: 25px;
  height: 25px;
}

.tweet-dialog-panel .feeling-button:hover svg,
.tweet-dialog-panel .feeling-button.active svg {
  color: rgb(255, 204, 0);
}

.tweet-dialog-panel .feedback > textarea {
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  padding: .5rem;
  resize: none;
  border: 1px solid var(--floatBorderColor);
  background: var(--floatBorderColor);
  color: var(--editorColor);
  border-radius: 5px;
  font-size: 14px;
  height: 80px;
}

.tweet-dialog-panel .buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.tweet-dialog-panel .buttons button {
  border: none;
  background: transparent;
  font: inherit;
}

.tweet-dialog-panel .buttons .twitter {
  color: var(--themeColor);
  width: auto;
  min-height: 30px;
  padding: 0 8px;
  border-radius: 2px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #eee;
  cursor: not-allowed;
}

.tweet-dialog-panel .buttons .twitter.active {
  background: var(--themeColor);
  color: #fff;
  cursor: pointer;
}

.tweet-dialog-panel .buttons .twitter:disabled {
  opacity: 1;
}

.tweet-dialog-panel .buttons .github {
  color: var(--iconColor);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-align: left;
  cursor: pointer;
}

.tweet-dialog-panel .buttons .github:hover {
  color: var(--themeColor);
}

.tweet-dialog-panel .buttons .github svg {
  width: 1.4rem;
  height: 1.4rem;
  vertical-align: bottom;
}

@media (max-width: 640px) {
  .tweet-dialog-panel .buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .tweet-dialog-panel .buttons .github,
  .tweet-dialog-panel .buttons .twitter {
    justify-content: center;
  }
}
</style>
