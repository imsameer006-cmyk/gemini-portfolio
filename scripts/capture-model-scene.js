const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PAGE_URL = 'http://localhost:3000/screens/challenge-poc.html';
const OUT_PATH = path.join(__dirname, '..', 'public', 'case-studies', 'gemini', 'model-scene-bg.png');

(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=egl', '--no-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 1700, height: 1020 },
    deviceScaleFactor: 2, // retina — sharp even when used as background
  });

  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for Three.js canvas
  await page.waitForFunction(
    () => { const c = document.querySelector('#viewer canvas'); return c && c.width > 0; },
    { timeout: 15000 }
  );

  // Stop rotation and let damping settle at the initial pose
  await page.evaluate(() => { window.__autoRotate = false; });
  await page.waitForTimeout(1200);

  // Capture only the scene element (the 3D viewport area)
  await page.locator('.scene').screenshot({ path: OUT_PATH, type: 'png' });

  await browser.close();
  console.log('Scene captured →', OUT_PATH);
})();
