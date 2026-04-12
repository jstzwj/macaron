<template>
  <div class="recent-files-projects">
    <div class="centered-group">
      <svg :viewBox="ContentIcon.viewBox" aria-hidden="true">
        <use :xlink:href="ContentIcon.url" />
      </svg>
      <h2 class="welcome-text">{{ $t('recent.welcome') }}</h2>
      <div class="actions">
        <button class="action-button" @click="newFile">
          <svg viewBox="0 0 1024 1024" width="20" height="20">
            <path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m192 480H544v160c0 17.7-14.3 32-32 32s-32-14.3-32-32V544H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h160V320c0-17.7 14.3-32 32-32s32 14.3 32 32v160h160c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
          <span>{{ $t('recent.newFile') }}</span>
        </button>
        <button class="action-button" @click="openFile">
          <svg viewBox="0 0 1024 1024" width="20" height="20">
            <path fill="currentColor" d="M868 384H540l-84-84H156c-8.8 0-16 7.2-16 16v464c0 8.8 7.2 16 16 16h712c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16zm-16 480H156V336h272l72 72h352v376zM380 248l84 84H140V248c0-13.3 10.7-24 24-24h192c8 0 15.6 4 20.2 10.7l3.8 5.3z" />
          </svg>
          <span>{{ $t('recent.openFile') }}</span>
        </button>
        <button class="action-button" @click="openFolder">
          <svg viewBox="0 0 1024 1024" width="20" height="20">
            <path fill="currentColor" d="M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 00-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.7-8 29.7-20l134-322c2-4.9 3.1-10.1 3.1-15.4C960 460.3 945.7 444 928 444zM136 256h188.2l122.9 112H904v196H216c-17.7 0-32 14.3-32 32v200H136V256zm736 576H256V660h692.4L872 832z" />
          </svg>
          <span>{{ $t('recent.openFolder') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import ContentIcon from '@/assets/icons/undraw_content.svg'

export default {
  data () {
    this.ContentIcon = ContentIcon
    return {}
  },
  methods: {
    newFile () {
      this.$store.dispatch('NEW_UNTITLED_TAB', {})
    },
    openFile () {
      ipcRenderer.send('mt::cmd-open-file')
    },
    openFolder () {
      ipcRenderer.send('mt::cmd-open-folder')
    }
  }
}
</script>

<style scoped>
  .recent-files-projects {
    background: var(--editorBgColor);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    & .centered-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: welcomeFadeIn 0.4s ease;
      & svg.content-icon {
        width: 120px;
        height: 120px;
        fill: var(--themeColor);
        opacity: 0.6;
      }
      & .welcome-text {
        font-size: 20px;
        font-weight: 600;
        color: var(--editorColor80);
        margin: 24px 0 32px;
        letter-spacing: -0.01em;
      }
      & .actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 220px;
      }
    }
  }

  .action-button {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 44px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 500;
    color: var(--editorColor);
    background: var(--buttonBgColor);
    border: 1px solid var(--buttonBorder);
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
  }
  .action-button:hover {
    background: var(--buttonBgColorHover);
    border-color: var(--buttonBorderHover);
  }
  .action-button:active {
    transform: scale(0.98);
    background: var(--buttonBgColorActive);
  }
  .action-button svg {
    flex-shrink: 0;
    fill: var(--iconColor);
    transition: fill 0.15s ease;
  }
  .action-button:hover svg {
    fill: var(--themeColor);
  }

  @keyframes welcomeFadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
