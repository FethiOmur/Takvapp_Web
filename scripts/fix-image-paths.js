const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');
const basePath = '/Takvapp_Web';

function fixImagePaths(filePath) {

  let content = fs.readFileSync(filePath, 'utf8');

  

  const newContent = content.replace(/"\/images\//g, `"${basePath}/images/`);



  if (content !== newContent) {

    fs.writeFileSync(filePath, newContent, 'utf8');

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

