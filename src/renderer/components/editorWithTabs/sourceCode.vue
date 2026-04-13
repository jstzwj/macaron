<template>
  <div
    class="source-code"
    ref="sourceCode"
  >
  </div>
</template>

<script>
import { createEditor, setMode, setCursorAtLastLine, setTextDirection, setSelection, getValue, setValue, getCursor, getLine, execSelectAll, hasFocus, destroy, setTheme } from '../../codeMirror'
import { wordCount as getWordCount } from 'muya/lib/utils'
import { mapState } from 'vuex'
import { adjustCursor } from '../../util'
import bus from '../../bus'

export default {
  props: {
    markdown: String,
    cursor: Object,
    textDirection: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState({
      theme: state => state.preferences.theme,
      sourceCode: state => state.preferences.sourceCode,
      currentTab: state => state.editor.currentFile
    })
  },

  data () {
    return {
      contentState: null,
      editor: null,
      commitTimer: null,
      viewDestroyed: false,
      tabId: null
    }
  },

  watch: {
    textDirection: function (value, oldValue) {
      const { editor } = this
      if (value !== oldValue && editor) {
        setTextDirection(editor, value)
      }
    },
    theme: function (value, oldValue) {
      const { editor } = this
      if (value !== oldValue && editor) {
        setTheme(editor, value)
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      const { id } = this.currentTab
      const { markdown = '', theme, cursor, textDirection } = this

      const container = this.$refs.sourceCode

      const onCursorActivity = () => {
        const { cursor, markdown } = this.getMarkdownAndCursor(this.editor)
        const wordCount = getWordCount(markdown)
        if (this.commitTimer) clearTimeout(this.commitTimer)
        this.commitTimer = setTimeout(() => {
          if (!this.viewDestroyed) {
            if (this.tabId) {
              this.$store.dispatch('LISTEN_FOR_CONTENT_CHANGE', { id: this.tabId, markdown, wordCount, cursor })
            } else {
              console.warn('LISTEN_FOR_CONTENT_CHANGE: Cannot commit changes because not tab id was set!')
            }
          }
        }, 1000)
      }

      const editor = this.editor = createEditor(container, {
        value: markdown,
        theme,
        direction: textDirection,
        onCursorActivity
      })

      bus.$on('file-loaded', this.handleFileChange)
      bus.$on('invalidate-image-cache', this.handleInvalidateImageCache)
      bus.$on('file-changed', this.handleFileChange)
      bus.$on('selectAll', this.handleSelectAll)
      bus.$on('image-action', this.handleImageAction)

      setMode(editor, 'markdown')

      editor.dom.addEventListener('contextmenu', event => {
        event.preventDefault()
        event.stopPropagation()
      })

      if (cursor && cursor.anchor && cursor.focus) {
        const { anchor, focus } = cursor
        setSelection(editor, anchor, focus)
      } else {
        setCursorAtLastLine(editor)
      }
      this.tabId = id
    })
  },
  beforeUnmount () {
    this.viewDestroyed = true
    if (this.commitTimer) clearTimeout(this.commitTimer)

    bus.$off('file-loaded', this.handleFileChange)
    bus.$off('invalidate-image-cache', this.handleInvalidateImageCache)
    bus.$off('file-changed', this.handleFileChange)
    bus.$off('selectAll', this.handleSelectAll)
    bus.$off('image-action', this.handleImageAction)

    const { editor } = this
    const { cursor, markdown } = this.getMarkdownAndCursor(editor)
    const wordCount = getWordCount(markdown)
    bus.$emit('file-changed', { id: this.tabId, markdown, cursor, renderCursor: true, wordCount })
    destroy(editor)
  },
  methods: {
    handleImageAction ({ id, result, alt }) {
      const { editor } = this
      const value = getValue(editor)
      const focus = getCursor(editor, 'head')
      const anchor = getCursor(editor, 'anchor')
      const lines = value.split('\n')
      const index = lines.findIndex(line => line.indexOf(id) > 0)

      if (index > -1) {
        const oldLine = lines[index]
        lines[index] = oldLine.replace(new RegExp(`!\\[${id}\\]\\(.*\\)`), `![${alt}](${result})`)
        const newValue = lines.join('\n')
        setValue(editor, newValue)
        const match = /(!\[.*\]\(.*\))/.exec(oldLine)
        if (!match) {
          return
        }
        const range = {
          start: match.index,
          end: match.index + match[1].length
        }
        const delta = alt.length + result.length + 5 - match[1].length

        const adjust = pointer => {
          if (!pointer) {
            return
          }
          if (pointer.line !== index) {
            return
          }
          if (pointer.ch <= range.start) {
            // do nothing.
          } else if (pointer.ch > range.start && pointer.ch < range.end) {
            pointer.ch = range.start + alt.length + result.length + 5
          } else {
            pointer.ch += delta
          }
        }

        adjust(focus)
        adjust(anchor)
        if (focus && anchor) {
          setSelection(editor, anchor, focus)
        } else {
          setCursorAtLastLine(editor)
        }
      }
    },
    // Another tab was selected - only listen to get changes but don't set history or other things.
    handleFileChange ({ id, markdown, cursor }) {
      this.prepareTabSwitch()

      const { editor } = this
      if (typeof markdown === 'string') {
        setValue(editor, markdown)
      }
      if (cursor && cursor.anchor && cursor.focus) {
        const { anchor, focus } = cursor
        setSelection(editor, anchor, focus)
      } else {
        setCursorAtLastLine(editor)
      }
      this.tabId = id
    },
    // Get markdown and cursor from CodeMirror.
    getMarkdownAndCursor (view) {
      let focus = getCursor(view, 'head')
      let anchor = getCursor(view, 'anchor')
      const markdown = getValue(view)
      const convertToMuyaCursor = cursor => {
        const line = getLine(view, cursor.line)
        const preLine = getLine(view, cursor.line - 1)
        const nextLine = getLine(view, cursor.line + 1)
        return adjustCursor(cursor, preLine, line, nextLine)
      }

      anchor = convertToMuyaCursor(anchor)
      focus = convertToMuyaCursor(focus)

      if (anchor && focus && anchor.line > focus.line) {
        const tmpCursor = focus
        focus = anchor
        anchor = tmpCursor
      }
      return { cursor: { focus, anchor }, markdown }
    },
    prepareTabSwitch () {
      if (this.commitTimer) clearTimeout(this.commitTimer)
      if (this.tabId) {
        const { editor } = this
        const { cursor, markdown } = this.getMarkdownAndCursor(editor)
        const wordCount = getWordCount(markdown)
        this.$store.dispatch('LISTEN_FOR_CONTENT_CHANGE', { id: this.tabId, markdown, wordCount, cursor })
        this.tabId = null
      }
    },

    handleSelectAll () {
      if (!this.sourceCode) {
        return
      }

      const { editor } = this
      if (editor && hasFocus(editor)) {
        execSelectAll(editor)
      } else {
        const activeElement = document.activeElement
        const nodeName = activeElement.nodeName
        if (nodeName === 'INPUT' || nodeName === 'TEXTAREA') {
          activeElement.select()
        }
      }
    },

    handleInvalidateImageCache () {
      // CM6 does not have invalidateImageCache; no-op
    }
  }
}
</script>

<style>
  .source-code {
    height: calc(100vh - var(--titleBarHeight));
    box-sizing: border-box;
    overflow: auto;
    background: var(--editorBgColor);
  }
  .source-code .cm-editor {
    height: auto;
    margin: 50px auto;
    max-width: var(--editorAreaWidth);
    background: transparent;
    padding: 20px 30px;
    border-radius: 6px;
    border: 1px solid var(--editorColor04);
  }
  .source-code .cm-gutters {
    border-right: 1px solid var(--editorColor04);
    background-color: transparent;
  }
  .source-code .cm-activeLineBackground,
  .source-code .cm-activeLineGutter {
    background: var(--editorColor04);
  }
</style>
