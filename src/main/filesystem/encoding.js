const getChardet = () => {
  try {
    return require('chardet')
  } catch (error) {
    console.warn('[encoding] Failed to load chardet, fallback to utf8.', error)
    return null
  }
}

const CHARDET_ICONV_ENCODINGS = {
  UTF8: 'utf8',
  UTF16BE: 'utf16be',
  UTF16LE: 'utf16le',
  UTF32BE: 'utf32be',
  UTF32LE: 'utf32le',
  ASCII: 'utf8',
  ISO_8859_1: 'latin1',
  ISO_8859_2: 'iso88592',
  ISO_8859_5: 'iso88595',
  ISO_8859_6: 'arabic',
  ISO_8859_7: 'greek',
  ISO_8859_8: 'hebrew',
  ISO_8859_9: 'latin5',
  ISO_8859_10: 'latin6',
  ISO_8859_13: 'iso885913',
  ISO_8859_15: 'iso885915',
  WINDOWS_1250: 'windows1250',
  WINDOWS_1251: 'cp1251',
  WINDOWS_1252: 'cp1252',
  WINDOWS_1253: 'cp1253',
  WINDOWS_1254: 'cp1254',
  WINDOWS_1255: 'cp1255',
  WINDOWS_1256: 'cp1256',
  WINDOWS_1257: 'cp1257',
  KOI8_R: 'koi8r',
  KOI8_U: 'koi8u',
  IBM866: 'cp866',
  MACINTOSH: 'utf8',
  SHIFT_JIS: 'shiftjis',
  EUC_JP: 'eucjp',
  EUC_KR: 'euckr',
  GB18030: 'gb18030',
  GB2312: 'gb2312',
  GBK: 'gbk',
  BIG5: 'big5'
}

// Byte Order Mark's to detect endianness and encoding.
const BOM_ENCODINGS = {
  utf8: [0xEF, 0xBB, 0xBF],
  utf16be: [0xFE, 0xFF],
  utf16le: [0xFF, 0xFE]
}

const checkSequence = (buffer, sequence) => {
  if (buffer.length < sequence.length) {
    return false
  }
  return sequence.every((v, i) => v === buffer[i])
}

const normalizeEncoding = encoding => {
  if (!encoding || typeof encoding !== 'string') {
    return 'utf8'
  }

  const normalized = encoding.trim().replace(/[\r\n]/g, '')
  const upper = normalized.toUpperCase().replace(/[-\s]/g, '_')
  if (CHARDET_ICONV_ENCODINGS[upper]) {
    return CHARDET_ICONV_ENCODINGS[upper]
  }

  return normalized.toLowerCase().replace(/[-_\s]/g, '')
}

/**
 * Guess the encoding from the buffer.
 *
 * @param {Buffer} buffer
 * @param {boolean} autoGuessEncoding
 * @returns {Encoding}
 */
export const guessEncoding = (buffer, autoGuessEncoding) => {
  let isBom = false
  let encoding = 'utf8'

  // Detect UTF8- and UTF16-BOM encodings.
  for (const [key, value] of Object.entries(BOM_ENCODINGS)) {
    if (checkSequence(buffer, value)) {
      return { encoding: key, isBom: true }
    }
  }

  // Auto guess encoding, otherwise use UTF8.
  if (autoGuessEncoding) {
    const chardet = getChardet()
    if (chardet && typeof chardet.detect === 'function') {
      try {
        encoding = normalizeEncoding(chardet.detect(buffer))
      } catch (error) {
        console.warn('[encoding] chardet detection failed, fallback to utf8.', error)
      }
    }
  }

  return { encoding, isBom }
}
