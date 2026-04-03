export const withMnemonic = (label, fallback) => {
  const value = label || fallback
  return typeof fallback === 'string' && fallback.includes('&') ? value.replace(/\s*\(&.\)/, '') : value
}
