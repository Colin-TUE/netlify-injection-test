import * as fs from 'fs';
import * as path from 'path';

console.log('=== Test Script Starting ===');
console.log('');

// Generate HTML page
console.log('');
console.log('Generating HTML page...');

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netlify Simple Website</title>
</head>
<body>
    <div>
        <h1>Simple Test</h1>
        <p>Netlify PNPM Test script</p>
    </div>
</body>
</html>`;

const indexPath = path.join(publicDir, 'index.html');
fs.writeFileSync(indexPath, html);

console.log(`✓ Generated ${indexPath}`);
console.log('');
console.log('=== Build Script Completed ===');
