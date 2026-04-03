import { StreamLanguage } from '@codemirror/language'

// Native CM6 language packages - use factory functions returning LanguageSupport
import { markdown } from '@codemirror/lang-markdown'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { xml } from '@codemirror/lang-xml'
import { go } from '@codemirror/lang-go'
import { php } from '@codemirror/lang-php'
import { yaml } from '@codemirror/lang-yaml'

// Legacy modes for languages without native CM6 support
import { clike } from '@codemirror/legacy-modes/mode/clike'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { ruby } from '@codemirror/legacy-modes/mode/ruby'
import { clojure } from '@codemirror/legacy-modes/mode/clojure'
import { haskell } from '@codemirror/legacy-modes/mode/haskell'
import { erlang } from '@codemirror/legacy-modes/mode/erlang'
import { scheme } from '@codemirror/legacy-modes/mode/scheme'
import { perl } from '@codemirror/legacy-modes/mode/perl'
import { pascal } from '@codemirror/legacy-modes/mode/pascal'
import { eiffel } from '@codemirror/legacy-modes/mode/eiffel'
import { crystal } from '@codemirror/legacy-modes/mode/crystal'
import { lua } from '@codemirror/legacy-modes/mode/lua'
import { coffeeScript } from '@codemirror/legacy-modes/mode/coffeescript'
import { tcl } from '@codemirror/legacy-modes/mode/tcl'
import { vhdl } from '@codemirror/legacy-modes/mode/vhdl'
import { verilog } from '@codemirror/legacy-modes/mode/verilog'
import { liveScript } from '@codemirror/legacy-modes/mode/livescript'
import { protobuf } from '@codemirror/legacy-modes/mode/protobuf'
import { stex } from '@codemirror/legacy-modes/mode/stex'
import { groovy } from '@codemirror/legacy-modes/mode/groovy'
import { julia } from '@codemirror/legacy-modes/mode/julia'
// Note: haml mode is not available in @codemirror/legacy-modes - removed
import { powerShell } from '@codemirror/legacy-modes/mode/powershell'
import { elm } from '@codemirror/legacy-modes/mode/elm'
import { forth } from '@codemirror/legacy-modes/mode/forth'
import { haxe } from '@codemirror/legacy-modes/mode/haxe'
import { r } from '@codemirror/legacy-modes/mode/r'
import { diff } from '@codemirror/legacy-modes/mode/diff'
// Note: twig mode is not available in @codemirror/legacy-modes - removed
import { octave } from '@codemirror/legacy-modes/mode/octave'
import { dockerFile } from '@codemirror/legacy-modes/mode/dockerfile'
import { toml } from '@codemirror/legacy-modes/mode/toml'
import { nginx } from '@codemirror/legacy-modes/mode/nginx'
import { sass } from '@codemirror/legacy-modes/mode/sass'
import { commonLisp } from '@codemirror/legacy-modes/mode/commonlisp'
import { pug } from '@codemirror/legacy-modes/mode/pug'
import { cobol } from '@codemirror/legacy-modes/mode/cobol'
import { d } from '@codemirror/legacy-modes/mode/d'
import { textile } from '@codemirror/legacy-modes/mode/textile'
import { properties } from '@codemirror/legacy-modes/mode/properties'
import { xQuery } from '@codemirror/legacy-modes/mode/xquery'
import { oCaml } from '@codemirror/legacy-modes/mode/mllike'
import { asciiArmor } from '@codemirror/legacy-modes/mode/asciiarmor'
import { cmake } from '@codemirror/legacy-modes/mode/cmake'
import { jinja2 } from '@codemirror/legacy-modes/mode/jinja2'
// Note: rst mode is not available in @codemirror/legacy-modes - removed

import { filter } from 'fuzzaldrin'

// Map of language name → () => Extension
const languageMap = {
  // Native CM6 languages
  markdown: () => markdown(),
  javascript: () => javascript(),
  typescript: () => javascript({ typescript: true }),
  jsx: () => javascript({ jsx: true }),
  css: () => css(),
  scss: () => css({ nested: true }), // approximate
  less: () => css(),
  html: () => html(),
  json: () => json(),
  jsoniq: () => json(),
  python: () => python(),
  java: () => java(),
  c: () => cpp(),
  c_cpp: () => cpp(),
  'c++': () => cpp(),
  cs: () => StreamLanguage.define(clike({ name: 'csharp' })),
  csharp: () => StreamLanguage.define(clike({ name: 'csharp' })),
  kotlin: () => StreamLanguage.define(clike({ name: 'kotlin' })),
  scala: () => StreamLanguage.define(clike({ name: 'scala' })),
  go: () => go(),
  golang: () => go(),
  rust: () => rust(),
  sql: () => sql(),
  pgsql: () => sql(),
  plsql: () => sql(),
  xml: () => xml(),
  php: () => php(),
  yaml: () => yaml(),

  // Legacy modes
  objectivec: () => StreamLanguage.define(clike({ name: 'objectivec' })),
  swift: () => StreamLanguage.define(clike({ name: 'swift' })),
  ruby: () => StreamLanguage.define(ruby),
  shell: () => StreamLanguage.define(shell),
  sh: () => StreamLanguage.define(shell),
  makefile: () => StreamLanguage.define(shell),
  clojure: () => StreamLanguage.define(clojure),
  lisp: () => StreamLanguage.define(commonLisp),
  haskell: () => StreamLanguage.define(haskell),
  erlang: () => StreamLanguage.define(erlang),
  scheme: () => StreamLanguage.define(scheme),
  perl: () => StreamLanguage.define(perl),
  pascal: () => StreamLanguage.define(pascal),
  eiffel: () => StreamLanguage.define(eiffel),
  django: () => StreamLanguage.define(jinja2),
  crystal: () => StreamLanguage.define(crystal),
  lua: () => StreamLanguage.define(lua),
  coffee: () => StreamLanguage.define(coffeeScript),
  tcl: () => StreamLanguage.define(tcl),
  vhdl: () => StreamLanguage.define(vhdl),
  verilog: () => StreamLanguage.define(verilog),
  livescript: () => StreamLanguage.define(liveScript),
  protobuf: () => StreamLanguage.define(protobuf),
  rst: () => markdown(), // approximate: reStructuredText → markdown
  LaTeX: () => StreamLanguage.define(stex),
  tex: () => StreamLanguage.define(stex),
  groovy: () => StreamLanguage.define(groovy),
  julia: () => StreamLanguage.define(julia),
  haml: () => html(), // approximate: haml → html
  powershell: () => StreamLanguage.define(powerShell),
  dart: () => StreamLanguage.define(clike({ name: 'dart' })),
  elm: () => StreamLanguage.define(elm),
  forth: () => StreamLanguage.define(forth),
  haxe: () => StreamLanguage.define(haxe),
  r: () => StreamLanguage.define(r),
  diff: () => StreamLanguage.define(diff),
  twig: () => StreamLanguage.define(jinja2), // approximate: twig → jinja2
  matlab: () => StreamLanguage.define(octave),
  dockerfile: () => StreamLanguage.define(dockerFile),
  toml: () => StreamLanguage.define(toml),
  Nginx: () => StreamLanguage.define(nginx),
  sass: () => StreamLanguage.define(sass),
  jade: () => StreamLanguage.define(pug),
  cobol: () => StreamLanguage.define(cobol),
  d: () => StreamLanguage.define(d),
  ini: () => StreamLanguage.define(properties),
  jsp: () => StreamLanguage.define(jinja2),
  rhtml: () => StreamLanguage.define(jinja2),
  soy_template: () => StreamLanguage.define(jinja2), // approximate: soy → jinja2
  pgp: () => StreamLanguage.define(asciiArmor),
  cmake: () => StreamLanguage.define(cmake),
  ocaml: () => StreamLanguage.define(oCaml),
  xquery: () => StreamLanguage.define(xQuery),
  textile: () => StreamLanguage.define(textile)
}

// Build languages array compatible with the search function
const languages = Object.keys(languageMap).map(name => ({ name }))

export const getLanguageExtension = name => {
  const factory = languageMap[name]
  return factory ? factory() : null
}

export const search = text => {
  const matchedLangs = filter(languages, text, { key: 'name' })
  return matchedLangs.map(({ name }) => ({ name, mode: { name } })).filter(Boolean)
}

export default languages
