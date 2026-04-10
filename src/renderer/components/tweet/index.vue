<template>
  <div class="tweet-dialog" v-if="renderTweetDialog" @click="showTweetDialog = false">
    <div class="tweet-dialog-overlay"></div>
    <div class="tweet-dialog-panel" @click.stop>
      <div class="dialog-header">
        <div class="title">Send us feedback via tweet</div>
      </div>
      <div class="body">
        <div class="feeling">
          <div>What's your experience feelings?</div>
          <ul>
            <li
              :class="{ 'active': selectedFace === 'smile' }"
              @click="faceClick('smile')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-smile"></use>
              </svg>
            </li>
            <li
              :class="{ 'active': selectedFace === 'sad' }"
              @click="faceClick('sad')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sad"></use>
              </svg>
            </li>
          </ul>
        </div>
        <div class="feedback">
          <div>Tell us your feedback?</div>
          <textarea
            cols="30" rows="10" v-model="value" ref="textarea"
          ></textarea>
        </div>
        <div class="buttons">
          <a
            href="javascript:;"
            class="github"
            @click="reportViaGithub"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-github"></use>
            </svg>
            Report bug or feature request via github
          </a>
          <a
            href="javascript:;"
            class="twitter"
            :class="{ 'active': value }"
            @click="reportViaTwitter"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-twitter"></use>
            </svg>
            Tweet
          </a>
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
  width: 450px;
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
  height: 45px;
}

.tweet-dialog-panel .feeling ul li {
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
}

.tweet-dialog-panel .feeling ul li svg {
  transition: color .25s ease-in-out;
  width: 25px;
  height: 25px;
}

.tweet-dialog-panel .feeling ul li:hover svg,
.tweet-dialog-panel .feeling ul li.active svg {
  color: rgb(255, 204, 0);
}

.tweet-dialog-panel .feedback > textarea {
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  padding: .5rem;
  resize: none;
  outline: none;
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
}

.tweet-dialog-panel .buttons a.twitter {
  color: var(--themeColor);
  text-decoration: none;
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  border-radius: 2px;
  box-sizing: border-box;
  display: inline-block;
  background: #eee;
  cursor: not-allowed;
}

.tweet-dialog-panel .buttons a.active {
  background: var(--themeColor);
  color: #fff;
  cursor: pointer;
}

.tweet-dialog-panel .buttons a.github {
  color: var(--iconColor);
  text-decoration: none;
}

.tweet-dialog-panel .buttons a.github:hover {
  color: var(--themeColor);
}

.tweet-dialog-panel .buttons a.github svg {
  width: 1.4rem;
  height: 1.4rem;
  vertical-align: bottom;
}
</style>
