<template>
  <div class="export-settings-dialog" v-if="renderExportSettingsDialog" @click="showExportSettingsDialog = false">
    <div class="export-settings-overlay"></div>
    <div class="export-settings-panel" @click.stop>
      <div class="export-settings-shell">
        <header class="dialog-header">
          <button class="dialog-close-btn" @click="showExportSettingsDialog = false" title="Close">
            <svg viewBox="0 0 1024 1024" width="14" height="14">
              <path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592l-45.248 45.248L466.752 512 214.528 764.224l45.248 45.248L512 557.184l252.288 252.288 45.248-45.248L557.312 512l252.224-252.224-45.248-45.184z"/>
            </svg>
          </button>
          <div class="header-copy">
            <div class="eyebrow">{{ $t(isPrintable ? 'exportDialog.overviewEyebrow' : 'exportDialog.htmlEyebrow') }}</div>
            <h3>{{ $t('exportDialog.title') }}</h3>
            <p class="subtitle">
              {{ $t(isPrintable ? 'exportDialog.printableSubtitle' : 'exportDialog.htmlSubtitle') }}
            </p>
          </div>
        </header>

        <div class="dialog-content">
          <el-tabs v-model="activeName" class="export-tabs">
            <el-tab-pane :label="$t('exportDialog.tabs.info')" name="info">
              <section class="settings-section hero-section">
                <div class="section-title">{{ $t('exportDialog.tabs.info') }}</div>
                <div class="section-description">{{ $t('exportDialog.infoText') }}</div>
              </section>
            </el-tab-pane>

            <el-tab-pane :label="$t('exportDialog.tabs.page')" name="page">
              <div class="settings-stack">
                <section v-if="!isPrintable" class="settings-section">
                  <div class="section-head">
                    <div>
                      <div class="section-title">{{ $t('exportDialog.sections.htmlDocument') }}</div>
                      <div class="section-description">{{ $t('exportDialog.sections.htmlDocumentDescription') }}</div>
                    </div>
                  </div>
                  <div class="section-body compact-body">
                    <text-box
                      :description="dialogLabel('exportDialog.pageTitle')"
                      :input="htmlTitle"
                      :emitTime="0"
                      :onChange="value => onSelectChange('htmlTitle', value)"
                    ></text-box>
                  </div>
                </section>

                <template v-if="isPrintable">
                  <section v-if="exportType === 'pdf'" class="settings-section">
                    <div class="section-head">
                      <div>
                        <div class="section-title">{{ $t('exportDialog.sections.pageSetup') }}</div>
                        <div class="section-description">{{ $t('exportDialog.sections.pageSetupDescription') }}</div>
                      </div>
                    </div>
                    <div class="section-body">
                      <cur-select
                        class="page-size-select"
                        :description="dialogLabel('exportDialog.pageSize')"
                        :value="pageSize"
                        :options="pageSizeList"
                        :onChange="value => onSelectChange('pageSize', value)"
                      ></cur-select>

                      <div v-if="pageSize === 'custom'" class="inline-card metric-card">
                        <div class="inline-card-label">{{ $t('exportDialog.widthHeightMm') }}</div>
                        <div class="metric-grid">
                          <div class="metric-field">
                            <span>{{ $t('exportDialog.sections.width') }}</span>
                            <el-input-number v-model="pageSizeWidth" size="small" controls-position="right" :min="100"></el-input-number>
                          </div>
                          <div class="metric-field">
                            <span>{{ $t('exportDialog.sections.height') }}</span>
                            <el-input-number v-model="pageSizeHeight" size="small" controls-position="right" :min="100"></el-input-number>
                          </div>
                        </div>
                      </div>

                      <bool
                        :description="dialogLabel('exportDialog.landscape')"
                        :bool="isLandscape"
                        :onChange="value => onSelectChange('isLandscape', value)"
                      ></bool>
                    </div>
                  </section>

                  <section class="settings-section">
                    <div class="section-head">
                      <div>
                        <div class="section-title">{{ $t('exportDialog.sections.margins') }}</div>
                        <div class="section-description">{{ $t('exportDialog.sections.marginsDescription') }}</div>
                      </div>
                    </div>
                    <div class="section-body">
                      <div class="inline-card margin-card">
                        <div class="inline-card-label">{{ dialogLabel('exportDialog.pageMargin') }}</div>
                        <div class="metric-grid metric-grid-wide">
                          <div class="metric-field">
                            <span>{{ $t('exportDialog.sections.marginTop') }}</span>
                            <el-input-number v-model="pageMarginTop" size="small" controls-position="right" :min="0" :max="100"></el-input-number>
                          </div>
                          <div class="metric-field">
                            <span>{{ $t('exportDialog.sections.marginBottom') }}</span>
                            <el-input-number v-model="pageMarginBottom" size="small" controls-position="right" :min="0" :max="100"></el-input-number>
                          </div>
                          <div class="metric-field">
                            <span>{{ $t('exportDialog.sections.marginLeft') }}</span>
                            <el-input-number v-model="pageMarginLeft" size="small" controls-position="right" :min="0" :max="100"></el-input-number>
                          </div>
                          <div class="metric-field">
                            <span>{{ $t('exportDialog.sections.marginRight') }}</span>
                            <el-input-number v-model="pageMarginRight" size="small" controls-position="right" :min="0" :max="100"></el-input-number>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </template>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('exportDialog.tabs.style')" name="style">
              <div class="settings-stack">
                <section class="settings-section settings-section-plain">
                  <div class="section-head">
                    <div>
                      <div class="section-title">{{ $t('exportDialog.sections.typography') }}</div>
                      <div class="section-description">{{ $t('exportDialog.sections.typographyDescription') }}</div>
                    </div>
                  </div>
                  <div class="section-body">
                    <bool
                      :description="dialogLabel('exportDialog.overwriteFontSettings')"
                      :bool="fontSettingsOverwrite"
                      :onChange="value => onSelectChange('fontSettingsOverwrite', value)"
                    ></bool>

                    <div v-if="fontSettingsOverwrite" class="nested-panel">
                      <font-text-box
                        :description="dialogLabel('exportDialog.fontFamily')"
                        :value="fontFamily"
                        :onChange="value => onSelectChange('fontFamily', value)"
                      ></font-text-box>
                      <range
                        :description="dialogLabel('exportDialog.fontSize')"
                        :value="fontSize"
                        :min="8"
                        :max="32"
                        unit="px"
                        :step="1"
                        :onChange="value => onSelectChange('fontSize', value)"
                      ></range>
                      <range
                        :description="dialogLabel('exportDialog.lineHeight')"
                        :value="lineHeight"
                        :min="1.0"
                        :max="2.0"
                        :step="0.1"
                        :onChange="value => onSelectChange('lineHeight', value)"
                      ></range>
                    </div>
                  </div>
                </section>

                <section class="settings-section settings-section-plain">
                  <div class="section-head">
                    <div>
                      <div class="section-title">{{ $t('exportDialog.sections.documentDetails') }}</div>
                      <div class="section-description">{{ $t('exportDialog.sections.documentDetailsDescription') }}</div>
                    </div>
                  </div>
                  <div class="section-body compact-body">
                    <bool
                      :description="dialogLabel('exportDialog.autoNumberingHeadings')"
                      :bool="autoNumberingHeadings"
                      :onChange="value => onSelectChange('autoNumberingHeadings', value)"
                    ></bool>
                    <bool
                      :description="dialogLabel('exportDialog.showFrontMatter')"
                      :bool="showFrontMatter"
                      :onChange="value => onSelectChange('showFrontMatter', value)"
                    ></bool>
                  </div>
                </section>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('exportDialog.tabs.theme')" name="theme">
              <section class="settings-section settings-section-plain settings-section-theme">
                <div class="section-head">
                  <div>
                    <div class="section-title">{{ $t('exportDialog.sections.theme') }}</div>
                    <div class="section-description">{{ $t('exportDialog.themeText') }}</div>
                  </div>
                </div>
                <div class="section-body compact-body">
                  <cur-select
                    :description="dialogLabel('exportDialog.theme')"
                    more="https://github.com/jstzwj/macaron/blob/develop/docs/EXPORT_THEMES.md"
                    :value="theme"
                    :options="themeList"
                    :onChange="value => onSelectChange('theme', value)"
                  ></cur-select>
                </div>
              </section>
            </el-tab-pane>

            <el-tab-pane v-if="isPrintable" :label="$t('exportDialog.tabs.header')" name="header">
              <div class="settings-stack">
                <section class="settings-section settings-section-plain">
                  <div class="section-head">
                    <div>
                      <div class="section-title">{{ $t('exportDialog.sections.header') }}</div>
                      <div class="section-description">{{ $t('exportDialog.headerFooterText') }}</div>
                    </div>
                  </div>
                  <div class="section-body compact-body">
                    <cur-select
                      :description="dialogLabel('exportDialog.headerType')"
                      :value="headerType"
                      :options="headerFooterTypes"
                      :onChange="value => onSelectChange('headerType', value)"
                    ></cur-select>
                    <text-box
                      v-if="headerType === 2"
                      :description="dialogLabel('exportDialog.leftHeaderText')"
                      :input="headerTextLeft"
                      :emitTime="0"
                      :onChange="value => onSelectChange('headerTextLeft', value)"
                    ></text-box>
                    <text-box
                      v-if="headerType !== 0"
                      :description="dialogLabel('exportDialog.mainHeaderText')"
                      :input="headerTextCenter"
                      :emitTime="0"
                      :onChange="value => onSelectChange('headerTextCenter', value)"
                    ></text-box>
                    <text-box
                      v-if="headerType === 2"
                      :description="dialogLabel('exportDialog.rightHeaderText')"
                      :input="headerTextRight"
                      :emitTime="0"
                      :onChange="value => onSelectChange('headerTextRight', value)"
                    ></text-box>
                  </div>
                </section>

                <section class="settings-section settings-section-plain">
                  <div class="section-head">
                    <div>
                      <div class="section-title">{{ $t('exportDialog.sections.footer') }}</div>
                      <div class="section-description">{{ $t('exportDialog.sections.footerDescription') }}</div>
                    </div>
                  </div>
                  <div class="section-body compact-body">
                    <cur-select
                      :description="dialogLabel('exportDialog.footerType')"
                      :value="footerType"
                      :options="headerFooterTypes"
                      :onChange="value => onSelectChange('footerType', value)"
                    ></cur-select>
                    <text-box
                      v-if="footerType === 2"
                      :description="dialogLabel('exportDialog.leftFooterText')"
                      :input="footerTextLeft"
                      :emitTime="0"
                      :onChange="value => onSelectChange('footerTextLeft', value)"
                    ></text-box>
                    <text-box
                      v-if="footerType !== 0"
                      :description="dialogLabel('exportDialog.mainFooterText')"
                      :input="footerTextCenter"
                      :emitTime="0"
                      :onChange="value => onSelectChange('footerTextCenter', value)"
                    ></text-box>
                    <text-box
                      v-if="footerType === 2"
                      :description="dialogLabel('exportDialog.rightFooterText')"
                      :input="footerTextRight"
                      :emitTime="0"
                      :onChange="value => onSelectChange('footerTextRight', value)"
                    ></text-box>
                  </div>
                </section>

                <section class="settings-section settings-section-plain">
                  <div class="section-head">
                    <div>
                      <div class="section-title">{{ $t('exportDialog.sections.headerFooterStyle') }}</div>
                      <div class="section-description">{{ $t('exportDialog.sections.headerFooterStyleDescription') }}</div>
                    </div>
                  </div>
                  <div class="section-body compact-body">
                    <bool
                      :description="dialogLabel('exportDialog.customizeStyle')"
                      :bool="headerFooterCustomize"
                      :onChange="value => onSelectChange('headerFooterCustomize', value)"
                    ></bool>

                    <div v-if="headerFooterCustomize" class="nested-panel">
                      <bool
                        :description="dialogLabel('exportDialog.allowStyledHeaderFooter')"
                        :bool="headerFooterStyled"
                        :onChange="value => onSelectChange('headerFooterStyled', value)"
                      ></bool>
                      <range
                        :description="dialogLabel('exportDialog.headerFooterFontSize')"
                        :value="headerFooterFontSize"
                        :min="8"
                        :max="20"
                        unit="px"
                        :step="1"
                        :onChange="value => onSelectChange('headerFooterFontSize', value)"
                      ></range>
                    </div>
                  </div>
                </section>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('exportDialog.tabs.toc')" name="toc">
              <section class="settings-section settings-section-plain">
                <div class="section-head">
                  <div>
                    <div class="section-title">{{ $t('exportDialog.sections.toc') }}</div>
                    <div class="section-description">{{ $t('exportDialog.sections.tocDescription') }}</div>
                  </div>
                </div>
                <div class="section-body compact-body">
                  <bool
                    :description="dialogLabel('exportDialog.includeTopHeading')"
                    :detailedDescription="$t('exportDialog.includeTopHeadingDetail')"
                    :bool="tocIncludeTopHeading"
                    :onChange="value => onSelectChange('tocIncludeTopHeading', value)"
                  ></bool>
                  <text-box
                    :description="dialogLabel('exportDialog.tocTitle')"
                    :input="tocTitle"
                    :emitTime="0"
                    :onChange="value => onSelectChange('tocTitle', value)"
                  ></text-box>
                </div>
              </section>
            </el-tab-pane>
          </el-tabs>
        </div>

        <footer class="dialog-footer">
          <div class="footer-copy">
            {{ $t(isPrintable ? 'exportDialog.footerPrintable' : 'exportDialog.footerHtml') }}
          </div>
          <div class="button-controls">
            <button class="button-primary" @click="handleClicked">
              {{ $t('exportDialog.export') }}
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'
import { isDirectory, isFile } from 'common/filesystem'
import bus from '../../bus'
import Bool from '@/prefComponents/common/bool'
import CurSelect from '@/prefComponents/common/select'
import FontTextBox from '@/prefComponents/common/fontTextBox'
import Range from '@/prefComponents/common/range'
import TextBox from '@/prefComponents/common/textBox'
import {
  pageSizeList,
  headerFooterTypes,
  headerFooterStyles,
  exportThemeList
} from './exportOptions'

export default {
  components: {
    Bool,
    CurSelect,
    FontTextBox,
    Range,
    TextBox
  },
  data () {
    this.exportType = ''
    this.themesLoaded = false
    this.pageSizeList = pageSizeList
    this.headerFooterTypes = headerFooterTypes
    this.headerFooterStyles = headerFooterStyles
    return {
      isPrintable: true,
      renderExportSettingsDialog: false,
      showExportSettingsDialog: false,
      activeName: 'info',
      htmlTitle: '',
      pageSize: 'A4',
      pageSizeWidth: 210,
      pageSizeHeight: 297,
      isLandscape: false,
      pageMarginTop: 20,
      pageMarginRight: 15,
      pageMarginBottom: 20,
      pageMarginLeft: 15,
      fontSettingsOverwrite: false,
      fontFamily: 'Default',
      fontSize: 14,
      lineHeight: 1.5,
      autoNumberingHeadings: false,
      showFrontMatter: false,
      theme: 'default',
      themeList: exportThemeList,
      headerType: 0,
      headerTextLeft: '',
      headerTextCenter: '',
      headerTextRight: '',
      footerType: 0,
      footerTextLeft: '',
      footerTextCenter: '',
      footerTextRight: '',
      headerFooterCustomize: false,
      headerFooterStyled: true,
      headerFooterFontSize: 12,
      tocTitle: '',
      tocIncludeTopHeading: true
    }
  },
  computed: {
    ...mapState({
    })
  },
  created () {
    bus.$on('showExportDialog', this.showDialog)
  },
  beforeUnmount () {
    bus.$off('showExportDialog', this.showDialog)
  },
  watch: {
    showExportSettingsDialog (val) {
      if (!val) {
        this.renderExportSettingsDialog = false
      }
    }
  },
  methods: {
    showDialog (type) {
      this.exportType = type
      this.isPrintable = type !== 'styledHtml'
      if (!this.isPrintable && (this.activeName === 'header' || this.activeName === 'page')) {
        this.activeName = 'info'
      }

      this.renderExportSettingsDialog = true
      this.$nextTick(() => {
        this.showExportSettingsDialog = true
      })
      bus.$emit('editor-blur')

      if (!this.themesLoaded) {
        this.themesLoaded = true
        this.loadThemesFromDisk()
      }
    },
    handleClicked () {
      const {
        exportType,
        isPrintable,
        htmlTitle,
        pageSize,
        pageSizeWidth,
        pageSizeHeight,
        isLandscape,
        pageMarginTop,
        pageMarginRight,
        pageMarginBottom,
        pageMarginLeft,
        fontSettingsOverwrite,
        fontFamily,
        fontSize,
        lineHeight,
        autoNumberingHeadings,
        showFrontMatter,
        theme,
        headerType,
        headerTextLeft,
        headerTextCenter,
        headerTextRight,
        footerType,
        footerTextLeft,
        footerTextCenter,
        footerTextRight,
        headerFooterCustomize,
        headerFooterStyled,
        headerFooterFontSize,
        tocTitle,
        tocIncludeTopHeading
      } = this
      const options = {
        type: exportType,
        pageSize,
        pageSizeWidth,
        pageSizeHeight,
        isLandscape,
        pageMarginTop,
        pageMarginRight,
        pageMarginBottom,
        pageMarginLeft,
        autoNumberingHeadings,
        showFrontMatter,
        theme: theme === 'default' ? null : theme,
        tocTitle,
        tocIncludeTopHeading
      }

      if (!isPrintable) {
        options.htmlTitle = htmlTitle
      }

      if (fontSettingsOverwrite) {
        Object.assign(options, {
          fontSize,
          lineHeight,
          fontFamily: fontFamily === 'Default' ? null : fontFamily
        })
      }

      if (headerType !== 0) {
        Object.assign(options, {
          header: {
            type: headerType,
            left: headerTextLeft,
            center: headerTextCenter,
            right: headerTextRight
          }
        })
      }

      if (footerType !== 0) {
        Object.assign(options, {
          footer: {
            type: footerType,
            left: footerTextLeft,
            center: footerTextCenter,
            right: footerTextRight
          }
        })
      }

      if (headerFooterCustomize) {
        Object.assign(options, {
          headerFooterStyled,
          headerFooterFontSize
        })
      }

      this.showExportSettingsDialog = false
      bus.$emit('export', options)
    },
    dialogLabel (key) {
      return String(this.$t(key)).replace(/[：:]\s*$/, '')
    },
    onSelectChange (key, value) {
      this[key] = value
    },
    loadThemesFromDisk () {
      const { userDataPath } = global.marktext.paths
      const themeDir = path.join(userDataPath, 'themes/export')

      // Search for dictionaries on filesystem.
      if (isDirectory(themeDir)) {
        fs.readdirSync(themeDir).forEach(async filename => {
          const fullname = path.join(themeDir, filename)
          if (/.+\.css$/i.test(filename) && isFile(fullname)) {
            try {
              const content = await fsPromises.readFile(fullname, 'utf8')

              // Match comment with theme name in first line only.
              const match = content.match(/^(?:\/\*+[ \t]*([A-z0-9 -]+)[ \t]*(?:\*+\/|[\n\r])?)/)

              let label
              if (match && match[1]) {
                label = match[1]
              } else {
                label = filename
              }

              this.themeList.push({
                value: filename,
                label
              })
            } catch (e) {
              console.error('loadThemesFromDisk failed:', e)
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .print-settings-dialog {
    user-select: none;
  }

  .export-settings-shell {
    display: flex;
    flex-direction: column;
    min-height: min(620px, calc(100vh - 120px));
    max-height: calc(100vh - 120px);
    color: var(--editorColor);
  }

  .dialog-header {
    position: relative;
    padding: 20px 24px 16px;
    border-bottom: 1px solid var(--floatBorderColor);
    background: var(--floatBgColor);
  }

  .dialog-close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    color: var(--editorColor60);
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .2s ease, color .2s ease;
  }

  .dialog-close-btn:hover {
    color: var(--editorColor);
    background: var(--editorColor04);
  }

  .header-copy {
    max-width: 640px;
  }

  .eyebrow {
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--themeColor);
  }

  .dialog-header h3 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.25;
    color: var(--editorColor);
  }

  .subtitle {
    margin: 8px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: var(--editorColor60);
  }

  .dialog-content {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 0 24px 18px;
    overflow: hidden;
    background: var(--floatBgColor);
  }

  .export-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  .settings-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
  }

  .settings-section {
    border: 1px solid var(--floatBorderColor);
    border-radius: 10px;
    background: var(--floatBgColor);
    overflow: hidden;
  }

  .settings-section-plain {
    box-shadow: none;
  }

  .settings-section-theme .section-body {
    padding-top: 8px;
  }

  .hero-section {
    padding: 18px 20px;
  }

  .section-head {
    padding: 16px 18px 0;
  }

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--editorColor);
  }

  .section-description {
    margin-top: 6px;
    font-size: 12px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    color: var(--editorColor60);
  }

  .section-body {
    padding: 4px 18px 18px;
  }

  .compact-body {
    padding-top: 6px;
  }

  .nested-panel {
    margin-top: 14px;
    padding: 2px 14px 6px;
    border: 1px dashed var(--editorColor10);
    border-radius: 10px;
    background: transparent;
  }

  .inline-card {
    margin: 16px 0 0;
    padding: 14px;
    min-width: 0;
    border: 1px solid var(--editorColor10);
    border-radius: 10px;
    background: transparent;
  }

  .inline-card-label {
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--editorColor);
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    align-items: start;
    min-width: 0;
  }

  .metric-grid-wide {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .metric-field {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
  }

  .metric-field span {
    font-size: 12px;
    color: var(--editorColor60);
  }

  .metric-field :deep(.el-input-number) {
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 32px;
    vertical-align: top;
    border: 1px solid var(--floatBorderColor);
    border-radius: 7px;
    background: var(--inputBgColor);
    overflow: hidden;
  }

  .metric-field :deep(.el-input-number .el-input) {
    flex: 1;
    width: 100%;
    min-width: 0;
  }

  .metric-field :deep(.el-input-number .el-input__wrapper) {
    width: 100%;
    min-width: 0;
    min-height: 30px;
    padding: 0 28px 0 10px;
    box-sizing: border-box;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .metric-field :deep(.el-input-number .el-input__inner) {
    min-width: 0;
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 13px;
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 24px 18px;
    border-top: 1px solid var(--floatBorderColor);
    background: var(--floatBgColor);
  }

  .footer-copy {
    font-size: 11px;
    line-height: 1.45;
    color: var(--editorColor40);
  }

  .button-controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .button-controls .button-primary {
    min-width: 132px;
    height: 36px;
    padding: 0 18px;
    border: none;
    border-radius: 999px;
    font-size: 14px;
  }

  @media (max-width: 820px) {
    .export-settings-shell {
      min-height: min(560px, calc(100vh - 64px));
      max-height: calc(100vh - 64px);
    }

    .dialog-header,
    .dialog-content,
    .dialog-footer {
      padding-left: 18px;
      padding-right: 18px;
    }

    .dialog-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .button-controls {
      justify-content: stretch;
    }

    .button-controls .button-primary {
      width: 100%;
    }

    .metric-grid,
    .metric-grid-wide {
      grid-template-columns: 1fr;
    }
  }
</style>
<style scoped>
.export-settings-dialog {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.export-settings-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--maskColor);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.export-settings-panel {
  position: relative;
  z-index: 1;
  width: min(680px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  border-radius: 12px;
  box-shadow: var(--floatShadow);
  border: 1px solid var(--floatBorderColor);
  background: var(--floatBgColor);
  color: var(--editorColor);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.export-settings-panel .export-settings-shell {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.export-settings-panel .dialog-content {
  flex: 1;
  overflow-y: auto;
}

.export-settings-panel .dialog-footer {
  flex-shrink: 0;
}

.export-settings-panel .dialog-close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  color: var(--editorColor60);
  background: transparent;
  transition: background-color .2s ease, color .2s ease;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
}

.export-settings-panel .dialog-close-btn:hover {
  color: var(--editorColor);
  background: var(--editorColor04);
}

.export-settings-panel .dialog-close-btn svg {
  font-size: 16px;
}
</style>
<style>
  .export-settings-panel .export-tabs {
    flex: 1;
    min-height: 0;
  }

  .export-settings-panel .export-tabs > .el-tabs__content {
    flex: 1;
    min-height: 0;
  }

  .export-settings-panel .export-tabs > .el-tabs__content > .el-tab-pane {
    min-height: 100%;
  }

  .export-settings-panel .export-tabs .el-tabs__header {
    flex-shrink: 0;
    margin: 0;
    padding: 10px 0 0;
    background: var(--floatBgColor);
  }

  .export-settings-panel .export-tabs .el-tabs__nav-wrap {
    padding-bottom: 0;
  }

  .export-settings-panel .export-tabs .el-tabs__nav-wrap::after {
    background: var(--floatBorderColor);
    bottom: 0;
  }

  .export-settings-panel .export-tabs .el-tabs__nav-scroll {
    overflow: auto;
    scrollbar-width: none;
  }

  .export-settings-panel .export-tabs .el-tabs__nav-scroll::-webkit-scrollbar {
    display: none;
  }

  .export-settings-panel .export-tabs .el-tabs__nav {
    display: flex;
    align-items: flex-end;
    gap: 0;
  }

  .export-settings-panel .export-tabs .el-tabs__active-bar {
    height: 2px;
    border-radius: 999px;
    background-color: var(--themeColor);
    bottom: -1px;
  }

  .export-settings-panel .export-tabs .el-tabs__item {
    height: auto;
    line-height: 20px;
    padding: 0 12px 12px;
    color: var(--editorColor60);
    transition: color .2s ease;
  }

  .export-settings-panel .export-tabs .el-tabs__item.is-active,
  .export-settings-panel .export-tabs .el-tabs__item:hover {
    color: var(--themeColor);
  }

  .export-settings-panel .export-tabs .el-tabs__content {
    flex: 1;
    height: auto;
    min-height: 0;
    contain: layout;
    padding: 8px 0 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    background: var(--floatBgColor);
  }

  .export-settings-panel .export-tabs .el-tab-pane {
    min-height: 100%;
    padding-bottom: 4px;
  }

  .export-settings-panel .export-tabs .el-tab-pane > * {
    min-width: 0;
  }

  .export-settings-panel .export-tabs .el-tabs__content::-webkit-scrollbar:vertical {
    width: 6px;
  }

  .export-settings-panel .pref-select-item,
  .export-settings-panel .pref-switch-item,
  .export-settings-panel .pref-text-box-item,
  .export-settings-panel .pref-font-text-box-item,
  .export-settings-panel .pref-range-item {
    max-width: 100%;
    margin: 16px 0;
  }

  .export-settings-panel .pref-select-item:first-child,
  .export-settings-panel .pref-switch-item:first-child,
  .export-settings-panel .pref-text-box-item:first-child,
  .export-settings-panel .pref-font-text-box-item:first-child,
  .export-settings-panel .pref-range-item:first-child {
    margin-top: 0;
  }

  .export-settings-panel .pref-select-item:last-child,
  .export-settings-panel .pref-switch-item:last-child,
  .export-settings-panel .pref-text-box-item:last-child,
  .export-settings-panel .pref-font-text-box-item:last-child,
  .export-settings-panel .pref-range-item:last-child {
    margin-bottom: 0;
  }

  .export-settings-panel .pref-select-item .description,
  .export-settings-panel .pref-text-box-item .description,
  .export-settings-panel .pref-font-text-box-item .description,
  .export-settings-panel .pref-range-item .description {
    color: var(--editorColor);
  }

  .export-settings-panel .pref-select-item .description .el-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    margin-left: 6px;
    font-size: 12px;
    line-height: 1;
    vertical-align: middle;
    color: var(--iconColor);
  }

  .export-settings-panel .pref-select-item .description .el-icon svg {
    width: 1em;
    height: 1em;
  }

  .export-settings-panel .pref-select-item .select-input {
    width: 100% !important;
    max-width: 100%;
    appearance: auto;
    background: var(--inputBgColor);
    color: var(--editorColor);
    border: 1px solid var(--floatBorderColor);
    border-radius: 6px;
  }

  .export-settings-panel #pane-header .pref-text-box-item .el-input {
    width: 100% !important;
    max-width: 100%;
  }

  .export-settings-panel .pref-text-box-item .el-input__wrapper,
  .export-settings-panel .pref-font-text-box-item input,
  .export-settings-panel .pref-range-item input,
  .export-settings-panel .metric-field .el-input__wrapper {
    background: var(--inputBgColor);
  }

  .export-settings-panel .metric-field .el-input-number,
  .export-settings-panel .metric-field .el-input-number .el-input,
  .export-settings-panel .metric-field .el-input-number .el-input__wrapper,
  .export-settings-panel .metric-field .el-input-number .el-input__inner,
  .export-settings-panel .metric-field .el-input-number__decrease,
  .export-settings-panel .metric-field .el-input-number__increase {
    box-sizing: border-box;
  }

  .export-settings-panel .metric-field .el-input-number {
    inline-size: 100%;
    max-inline-size: 100%;
  }

  .export-settings-panel .metric-field .el-input-number .el-input__wrapper {
    padding-right: 30px;
  }

  .export-settings-panel .metric-field .el-input-number__decrease,
  .export-settings-panel .metric-field .el-input-number__increase {
    width: 26px;
    border-left: 1px solid var(--floatBorderColor);
    background: var(--editorColor04);
    color: var(--editorColor60);
  }

  .export-settings-panel .metric-field .el-input-number__decrease:hover,
  .export-settings-panel .metric-field .el-input-number__increase:hover {
    color: var(--editorColor);
    background: var(--editorColor10);
  }

  .export-settings-panel .metric-field .el-input-number.is-controls-right .el-input-number__decrease {
    border-bottom: 1px solid var(--floatBorderColor);
  }
</style>
