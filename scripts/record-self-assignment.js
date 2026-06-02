const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');

const PAGE_URL = 'http://localhost:3000/screens/self-assignment.html?rec=1';
const OUT_DIR  = path.join(__dirname, '..', 'public', 'case-studies', 'gemini');
const OUT_MP4  = path.join(OUT_DIR, 'self-assignment.mp4');
const TEMP_DIR = path.join(__dirname, '..', '.playwright-videos');

const MASTER_W  = 1550;
const MASTER_H  = 860;
const SETTLE_MS  = 800;
const ANIM_MS    = 14500;
const TRIM_START = 0.3;

(async () => {
  if (!fs.existsSync(OUT_DIR))  fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

  const browser = await chromium.launch({ args: ['--use-gl=egl', '--no-sandbox'] });
  const context = await browser.newContext({
    viewport:    { width: MASTER_W, height: MASTER_H },
    recordVideo: { dir: TEMP_DIR, size: { width: MASTER_W, height: MASTER_H } },
  });

  const page = await context.newPage();
  console.log('Navigating to', PAGE_URL);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForFunction(
    () => document.querySelectorAll('svg[data-lucide]').length > 0,
    { timeout: 10000 }
  ).catch(() => {});

  console.log('Settling…');
  await page.waitForTimeout(SETTLE_MS);

  await page.evaluate(() => window.__startAnimation());
  console.log(`Recording ${(ANIM_MS / 1000).toFixed(1)}s…`);
  await page.waitForTimeout(ANIM_MS);

  const video = page.video();
  await context.close();
  await browser.close();

  const webmPath = await video.path();
  const keepDuration = ((SETTLE_MS + ANIM_MS) / 1000 - TRIM_START).toFixed(2);

  console.log('Converting to MP4…');
  execSync(
    `"${ffmpegPath}" -i "${webmPath}" -ss ${TRIM_START} -t ${keepDuration} -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -movflags +faststart "${OUT_MP4}" -y`,
    { stdio: 'pipe' }
  );

  fs.unlinkSync(webmPath);
  const size = (fs.statSync(OUT_MP4).size / 1024).toFixed(0);
  console.log(`Done → ${OUT_MP4} (${size} KB)`);
})();
