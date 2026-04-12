const { expect, test } = require('@playwright/test')
const { launchElectron } = require('./helpers')

test.describe('Check Launch Macaron', async () => {
  let app = null
  let page = null

  test.beforeAll(async () => {
    const { app: electronApp, page: firstPage } = await launchElectron()
    app = electronApp
    page = firstPage
  })

  test.afterAll(async () => {
    await app.close()
  })

  test('Empty Macaron', async () => {
    const title = await page.title()
    expect(/^Macaron$|^Untitled(-\d+)? - Macaron$/.test(title)).toBeTruthy()
  })
})
