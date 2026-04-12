import { ENCODING_NAME_MAP } from 'common/encoding'

export const tabSizeOptions = [{
  label: '1',
  value: 1
}, {
  label: '2',
  value: 2
}, {
  label: '3',
  value: 3
}, {
  label: '4',
  value: 4
}]

export const endOfLineOptions = [{
  labelKey: 'preferences.editor.endOfLineDefault',
  value: 'default'
}, {
  labelKey: 'preferences.editor.endOfLineCRLF',
  value: 'crlf'
}, {
  labelKey: 'preferences.editor.endOfLineLF',
  value: 'lf'
}]

export const trimTrailingNewlineOptions = [{
  labelKey: 'preferences.editor.trailingNewlineTrimAll',
  value: 0
}, {
  labelKey: 'preferences.editor.trailingNewlineEnsureOne',
  value: 1
}, {
  labelKey: 'preferences.editor.trailingNewlinePreserve',
  value: 2
}, {
  labelKey: 'preferences.editor.trailingNewlineNone',
  value: 3
}]

export const textDirectionOptions = [{
  labelKey: 'preferences.editor.textDirectionLTR',
  value: 'ltr'
}, {
  labelKey: 'preferences.editor.textDirectionRTL',
  value: 'rtl'
}]

let defaultEncodingOptions = null
export const getDefaultEncodingOptions = () => {
  if (defaultEncodingOptions) {
    return defaultEncodingOptions
  }

  defaultEncodingOptions = []
  for (const [value, label] of Object.entries(ENCODING_NAME_MAP)) {
    defaultEncodingOptions.push({ label, value })
  }
  return defaultEncodingOptions
}
