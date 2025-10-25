const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const basePath = '/Takvapp_Web';

function fixImagePaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix preload links for images
  const preloadRegex = /<link\s+rel="preload"\s+as="image"\s+href="(\/images\/[^"]+)"/g;
  content = content.replace(preloadRegex, (match, imagePath) => {
    modified = true;
    return match.replace(imagePath, basePath + imagePath);
  });

  // Fix img src attributes
  const imgSrcRegex = /src="(\/images\/[^"]+)"/g;
  content = content.replace(imgSrcRegex, (match, imagePath) => {
    modified = true;
    return match.replace(imagePath, basePath + imagePath);
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed: ${path.relative(outDir, filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      fixImagePaths(filePath);
    }
  });
}

console.log('🔧 Fixing image paths in HTML files...');
walkDir(outDir);
console.log('✅ Done!');

