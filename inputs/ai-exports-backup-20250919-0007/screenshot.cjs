const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set viewport to mobile size (iPhone 14 Pro)
  await page.setViewport({
    width: 393,
    height: 852,
    deviceScaleFactor: 3
  });

  try {
    // Navigate to local dev server
    await page.goto('http://localhost:5173', {
      waitUntil: 'networkidle0',
      timeout: 10000
    });

    // Wait a bit for any animations or async loading
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshot-${timestamp}.png`;
    const filepath = path.join(__dirname, filename);

    await page.screenshot({
      path: filepath,
      fullPage: true
    });

    console.log(`Screenshot saved: ${filename}`);
    console.log(`Full path: ${filepath}`);

    return filepath;

  } catch (error) {
    console.error('Error taking screenshot:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  takeScreenshot().catch(console.error);
}

module.exports = takeScreenshot;