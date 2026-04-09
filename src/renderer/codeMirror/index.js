import { EditorState, Compartment } from '@codemirror/state'
import { EditorView, lineNumbers, highlightActiveLineGutter, highlightActiveLine, drawSelection, keymap } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, selectAll as selectDoc } from '@codemirror/commands'
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from '@codemirror/language'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { oneDark } from '@codemirror/theme-one-dark'
import { markdownLanguage } from '@codemirror/lang-markdown'
import { searchKeymap } from '@codemirror/search'
import { filter } from 'fuzzaldrin'

import languages, { getLanguageExtension } from './modes'
import './index.css'

import { oneDarkThemes, railscastsThemes } from '@/config'
const themeCompartment = new Compartment()
const languageCompartment = new Compartment()

// --- Position conversion helpers (CM5 {line,ch} <-> CM6 absolute offset) ---

export const cm6ToCm5Pos = (view, pos) => {
  const line = view.state.doc.lineAt(pos)
  return { line: line.number - 1, ch: pos - line.from }
}

export const cm5ToCm6Pos = (view, pos) => {
  const { line, ch } = pos
  const lineInfo = view.state.doc.line(Math.min(line + 1, view.state.doc.lines))
  return Math.min(lineInfo.from + ch, lineInfo.to)
}

// --- Search ---

const search = text => {
  const matchedLangs = filter(languages, text, { key: 'name' })
  return matchedLangs.map(({ name }) => ({ name, mode: { name } })).filter(Boolean)
}

// --- Theme helpers ---

const getThemeExtension = themeName => {
  if (oneDarkThemes.includes(themeName)) {
    return oneDark
  }
  return []
}

// --- Editor creation ---

export const createEditor = (container, options = {}) => {
  const {
    value = '',
    theme = 'default',
    direction = 'ltr',
    onCursorActivity
  } = options

  const extensions = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    drawSelection(),
    history(),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap
    ]),
    bracketMatching(),
    closeBrackets(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    languageCompartment.of(markdownLanguage.extension),
    themeCompartment.of(getThemeExtension(theme)),
    EditorView.lineWrapping
  ]

  if (onCursorActivity) {
    extensions.push(EditorView.updateListener.of(update => {
      if (update.selectionSet || update.docChanged) {
        onCursorActivity(update)
      }
    }))
  }

  const state = EditorState.create({
    doc: value,
    extensions
  })

  const view = new EditorView({
    state,
    parent: container
  })

  // Apply text direction
  if (direction === 'rtl') {
    view.dom.style.direction = 'rtl'
  }

  // Apply CSS theme class for non-extension themes (railscasts, default)
  applyThemeClass(view, theme)

  return view
}

// Apply CSS-based theme class to editor DOM for themes not handled by extensions
const applyThemeClass = (view, theme) => {
  view.dom.classList.remove('cm-s-default', 'cm-s-one-dark', 'cm-s-railscasts')
  if (oneDarkThemes.includes(theme)) {
    view.dom.classList.add('cm-s-one-dark')
  } else if (railscastsThemes.includes(theme)) {
    view.dom.classList.add('cm-s-railscasts')
  } else {
    view.dom.classList.add('cm-s-default')
  }
}

// --- Theme switching at runtime ---

export const setTheme = (view, themeName) => {
  view.dispatch({
    effects: themeCompartment.reconfigure(getThemeExtension(themeName))
  })
  applyThemeClass(view, themeName)
}

// --- Cursor utilities ---

export const setCursorAtLastLine = view => {
  const lastLine = view.state.doc.lines
  const lineInfo = view.state.doc.line(lastLine)
  view.dispatch({
    selection: { anchor: lineInfo.to },
    scrollIntoView: true
  })
  view.focus()
}

export const setCursorAtFirstLine = view => {
  view.dispatch({
    selection: { anchor: 0 },
    scrollIntoView: true
  })
  view.focus()
}

export const isCursorAtFirstLine = view => {
  const pos = view.state.selection.main.head
  return pos === 0
}

export const isCursorAtLastLine = view => {
  const pos = view.state.selection.main.head
  const lastLine = view.state.doc.lines
  const lineInfo = view.state.doc.line(lastLine)
  return pos >= lineInfo.from
}

export const onlyHaveOneLine = view => {
  return view.state.doc.lines === 1
}

// --- Selection helpers (CM5-compatible {line,ch} interface) ---

export const setSelection = (view, anchor, focus) => {
  if (!anchor || !anchor.line) {
    setCursorAtLastLine(view)
    return
  }
  const anchorPos = cm5ToCm6Pos(view, anchor)
  const focusPos = focus && focus.line ? cm5ToCm6Pos(view, focus) : anchorPos
  view.dispatch({
    selection: { anchor: anchorPos, head: focusPos },
    scrollIntoView: true
  })
}

export const getValue = view => {
  return view.state.doc.toString()
}

export const setValue = (view, text) => {
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: text }
  })
}

export const getCursor = (view, which = 'head') => {
  const sel = view.state.selection.main
  const pos = which === 'anchor' ? sel.anchor : sel.head
  return cm6ToCm5Pos(view, pos)
}

export const getLine = (view, n) => {
  // CM5 is 0-based, CM6 is 1-based
  const lineNum = n + 1
  if (lineNum < 1 || lineNum > view.state.doc.lines) return ''
  return view.state.doc.line(lineNum).text
}

// --- Mode/language switching ---

export const setMode = (view, languageName) => {
  const ext = getLanguageExtension(languageName)
  if (!ext) {
    const errMsg = !languageName
      ? 'You\'d better provided a language mode when you create code block'
      : `${languageName} is not a valid language mode!`
    return Promise.reject(errMsg)
  }
  view.dispatch({
    effects: languageCompartment.reconfigure(ext)
  })
  return Promise.resolve({ name: languageName })
}

export const setTextDirection = (view, direction) => {
  view.dom.style.direction = direction
}

// --- Commands ---

export const execSelectAll = view => {
  selectDoc(view)
}

export const hasFocus = view => {
  return view.hasFocus
}

export const destroy = view => {
  view.destroy()
}

export { search, selectDoc }
export default { createEditor }
