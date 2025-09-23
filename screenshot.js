const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');

(async () => {
  const outputDir = process.cwd(); // Current directory

  console.log(`Saving screenshots to: ${outputDir}`);

  for (let i = 1; i <= 5; i++) {
    const filePath = path.join(outputDir, `screenshot_${i}.jpg`);
    try {
      const img = await screenshot({ format: 'jpg' });
      fs.writeFileSync(filePath, img);
      console.log(`✔️ Saved: ${filePath}`);
    } catch (err) {
      console.error(`❌ Failed to take screenshot ${i}:`, err);
    }
  }

  console.log('✅ All screenshots taken.');
})();
