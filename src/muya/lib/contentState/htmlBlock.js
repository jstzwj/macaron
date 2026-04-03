import { VOID_HTML_TAGS, HTML_TAGS } from '../config'
import { inlineRules } from '../parser/rules'

const HTML_BLOCK_REG = /^<([a-zA-Z\d-]+)(?=\s|>)[^<>]*?>$/

const htmlBlock = ContentState => {
  ContentState.prototype.createHtmlBlock = function (code) {
    const block = this.createBlock('figure')
    block.functionType = 'html'
    const { preBlock, preview } = this.createPreAndPreview('html', code)
    this.appendChild(block, preBlock)
    this.appendChild(block, preview)
    return block
  }

  ContentState.prototype.initHtmlBlock = function (block) {
    let htmlContent = ''
    const text = block.children[0].text
    const matches = inlineRules.html_tag.exec(text)
    const voidHtmlTags = Array.isArray(VOID_HTML_TAGS) ? VOID_HTML_TAGS : []
    if (matches) {
      const tag = matches[3]
      const content = matches[4] || ''
      const openTag = matches[2]
      const closeTag = matches[5]
      const isVoidTag = voidHtmlTags.indexOf(tag) > -1
      if (closeTag) {
        htmlContent = text
      } else if (isVoidTag) {
        htmlContent = text
        if (content) {
          // TODO: @jocs notice user that the html is not valid.
          console.warn('Invalid html content.')
        }
      } else {
        htmlContent = `${openTag}\n${content}\n</${tag}>`
      }
    } else {
      htmlContent = `<div>\n${text}\n</div>`
    }

    block.type = 'figure'
    block.functionType = 'html'
    block.text = htmlContent
    block.children = []
    const { preBlock, preview } = this.createPreAndPreview('html', htmlContent)
    this.appendChild(block, preBlock)
    this.appendChild(block, preview)

    return preBlock // preBlock
  }

  ContentState.prototype.updateHtmlBlock = function (block) {
    const { type } = block
    if (type !== 'li' && type !== 'p') return false
    const { text } = block.children[0]
    const htmlTags = Array.isArray(HTML_TAGS) ? HTML_TAGS : []
    const voidHtmlTags = Array.isArray(VOID_HTML_TAGS) ? VOID_HTML_TAGS : []
    const match = HTML_BLOCK_REG.exec(text)
    const tagName = match && match[1] && htmlTags.find(t => t === match[1])
    return voidHtmlTags.indexOf(tagName) === -1 && tagName ? this.initHtmlBlock(block) : false
  }
}

export default htmlBlock
