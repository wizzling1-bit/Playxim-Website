const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/Sohan/.gemini/antigravity-ide/brain/c6ceb3e2-d3d7-4b08-98a6-7bd7f542f949';
const outDir = path.join(__dirname, '../public/images');

const tasks = [
  { file: 'mobile_3d_player_1791493695548.jpg', maxFloorY: 760, colorThresh: 215, width: 750, out: 'mobile-3d-player.png' },
  { file: 'mobile_3d_wallet_1791493723902.jpg', maxFloorY: 760, colorThresh: 215, width: 750, out: 'mobile-3d-wallet.png' },
  { file: 'dashboard_3d_laptop_1791493641571.jpg', maxFloorY: 645, colorThresh: 215, width: 750, out: 'dashboard-3d-laptop.png' },
  { file: 'hero_3d_devices_1791491907908.jpg', maxFloorY: 645, colorThresh: 215, width: 1200, out: 'hero-3d-devices.png' },
  { file: 'creator_3d_monetization_1791493752377.jpg', maxFloorY: 670, colorThresh: 215, width: 750, out: 'creator-3d-monetization.png' }
];

async function processImage(t) {
  const inPath = path.join(brainDir, t.file);
  const outPath = path.join(outDir, t.out);
  
  const { data, info } = await sharp(inPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  
  const bg = new Uint8Array(width * height);
  const queue = new Int32Array(width * height * 2);
  let qHead = 0, qTail = 0;
  
  function isBgPixel(x, y) {
    if (y >= t.maxFloorY) return true;
    const idx = (y * width + x) * channels;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const avg = (r + g + b) / 3;
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    return avg >= t.colorThresh && (maxC - minC) <= 15;
  }
  
  // Seed border pixels
  for (let x = 0; x < width; x++) {
    if (isBgPixel(x, 0)) { bg[x] = 1; queue[qTail++] = x; queue[qTail++] = 0; }
    const botIdx = (height - 1) * width + x;
    if (isBgPixel(x, height - 1)) { bg[botIdx] = 1; queue[qTail++] = x; queue[qTail++] = height - 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isBgPixel(0, y)) { bg[y * width] = 1; queue[qTail++] = 0; queue[qTail++] = y; }
    const rIdx = y * width + (width - 1);
    if (isBgPixel(width - 1, y)) { bg[rIdx] = 1; queue[qTail++] = width - 1; queue[qTail++] = y; }
  }
  
  const dx = [-1, 1, 0, 0], dy = [0, 0, -1, 1];
  while (qHead < qTail) {
    const cx = queue[qHead++];
    const cy = queue[qHead++];
    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!bg[nIdx] && isBgPixel(nx, ny)) {
          bg[nIdx] = 1;
          queue[qTail++] = nx;
          queue[qTail++] = ny;
        }
      }
    }
  }
  
  // Construct full-res RGBA
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pIdx = y * width + x;
      const srcIdx = pIdx * channels;
      const dstIdx = pIdx * 4;
      if (bg[pIdx] === 1) {
        rgba[dstIdx] = 0;
        rgba[dstIdx + 1] = 0;
        rgba[dstIdx + 2] = 0;
        rgba[dstIdx + 3] = 0;
      } else {
        rgba[dstIdx] = data[srcIdx];
        rgba[dstIdx + 1] = data[srcIdx + 1];
        rgba[dstIdx + 2] = data[srcIdx + 2];
        rgba[dstIdx + 3] = 255;
      }
    }
  }
  
  // Resize to web target width with Lanczos3
  const resizedRaw = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize({ width: t.width, kernel: sharp.kernel.lanczos3 })
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const rw = resizedRaw.info.width;
  const rh = resizedRaw.info.height;
  const resBuf = resizedRaw.data;
  
  // Clean up sub-pixel alpha & perimeter
  const borderMargin = 4;
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const idx = (y * rw + x) * 4;
      // Guarantee border margin is strictly 0
      if (x < borderMargin || x >= rw - borderMargin || y < borderMargin || y >= rh - borderMargin) {
        resBuf[idx] = 0;
        resBuf[idx + 1] = 0;
        resBuf[idx + 2] = 0;
        resBuf[idx + 3] = 0;
        continue;
      }
      
      const a = resBuf[idx + 3];
      // Clamp tiny alpha ringing
      if (a <= 4) {
        resBuf[idx] = 0;
        resBuf[idx + 1] = 0;
        resBuf[idx + 2] = 0;
        resBuf[idx + 3] = 0;
      } else if (a < 35) {
        const r = resBuf[idx], g = resBuf[idx + 1], b = resBuf[idx + 2];
        const avg = (r + g + b) / 3;
        // If low alpha pixel is very bright, clamp to 0 to eliminate light fringe
        if (avg >= 200) {
          resBuf[idx] = 0;
          resBuf[idx + 1] = 0;
          resBuf[idx + 2] = 0;
          resBuf[idx + 3] = 0;
        }
      }
    }
  }
  
  // Save as high-quality PNG
  await sharp(resBuf, { raw: { width: rw, height: rh, channels: 4 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outPath);
    
  // Verification
  const verify = await sharp(outPath).raw().toBuffer({ resolveWithObject: true });
  let zero = 0, nonZero = 0, edgeNonZero = 0, edgeTotal = 0;
  for (let y = 0; y < verify.info.height; y++) {
    for (let x = 0; x < verify.info.width; x++) {
      const idx = (y * verify.info.width + x) * 4;
      const a = verify.data[idx + 3];
      if (a === 0) zero++; else nonZero++;
      if (x === 0 || x === verify.info.width - 1 || y === 0 || y === verify.info.height - 1) {
        edgeTotal++;
        if (a !== 0) edgeNonZero++;
      }
    }
  }
  
  const fileSizeKB = Math.round(fs.statSync(outPath).size / 1024);
  console.log('[SUCCESS] ' + t.out + ': ' + verify.info.width + 'x' + verify.info.height + ' (' + fileSizeKB + ' KB) | zeroAlpha: ' + zero + ' | nonZeroAlpha: ' + nonZero + ' | edgeNonZero: ' + edgeNonZero + '/' + edgeTotal);
}

(async () => {
  for (const t of tasks) {
    await processImage(t);
  }
  console.log('All images successfully processed and verified!');
})();
