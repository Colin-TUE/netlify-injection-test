/**
 * Build script that generates an HTML page showing environment variables
 * to demonstrate the Netlify environment variable injection bug with PNPM
 */

import * as fs from 'fs';
import * as path from 'path';

console.log('=== Build Script Starting ===');
console.log('');

// The test environment variable we're checking
const TEST_VARIABLE = process.env.TEST_VARIABLE;

console.log('Environment Variables:');
console.log('  TEST_VARIABLE:', TEST_VARIABLE || '(not set)');
console.log('');

// Log all environment variables that start with TEST_ or NETLIFY_
console.log('All TEST_* and NETLIFY_* variables:');
const testAndNetlifyVars = Object.keys(process.env)
  .filter(key => key.startsWith('TEST_') || key.startsWith('NETLIFY_'))
  .sort()
  .map(key => ({ key, value: process.env[key] || '' }));

testAndNetlifyVars.forEach(({ key, value }) => {
  console.log(`  ${key}:`, value);
});

console.log('');

// Check if TEST_VARIABLE is set
const hasTestVariable = !!TEST_VARIABLE;
if (!hasTestVariable) {
  console.error('ERROR: TEST_VARIABLE is not set!');
  console.error('This demonstrates the bug where environment variables defined in the terminal');
  console.error('are not injected into the Netlify build when using PNPM.');
} else {
  console.log('SUCCESS: TEST_VARIABLE is set to:', TEST_VARIABLE);
}

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
    <title>Netlify Environment Variable Injection Test</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 800px;
            width: 100%;
            padding: 40px;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2em;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        .status {
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            font-weight: 500;
            font-size: 1.1em;
        }
        .status.success {
            background: #d4edda;
            color: #155724;
            border: 2px solid #c3e6cb;
        }
        .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 2px solid #f5c6cb;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #444;
            margin-bottom: 15px;
            font-size: 1.3em;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
        }
        .var-list {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
        }
        .var-item {
            display: flex;
            padding: 12px;
            border-bottom: 1px solid #dee2e6;
            font-family: 'Courier New', monospace;
        }
        .var-item:last-child {
            border-bottom: none;
        }
        .var-key {
            font-weight: bold;
            color: #667eea;
            min-width: 200px;
            word-break: break-word;
        }
        .var-value {
            color: #333;
            flex: 1;
            word-break: break-all;
        }
        .var-empty {
            color: #999;
            font-style: italic;
        }
        .build-info {
            background: #e7f3ff;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin-top: 20px;
            border-radius: 4px;
        }
        .build-info p {
            margin: 5px 0;
            color: #555;
        }
        .timestamp {
            color: #888;
            font-size: 0.9em;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Environment Variable Test</h1>
        <p class="subtitle">Netlify PNPM Injection Test</p>
        
        <div class="status ${hasTestVariable ? 'success' : 'error'}">
            ${hasTestVariable 
                ? `✅ SUCCESS: TEST_VARIABLE is set to "${TEST_VARIABLE}"` 
                : '❌ ERROR: TEST_VARIABLE is not set!'
            }
        </div>

        ${!hasTestVariable ? `
        <div class="build-info">
            <p><strong>⚠️ This demonstrates the bug:</strong></p>
            <p>Environment variables defined in the terminal are not injected into the Netlify build when using PNPM.</p>
        </div>
        ` : ''}

        <div class="section">
            <h2>TEST_* Variables</h2>
            <div class="var-list">
                ${testAndNetlifyVars
                  .filter(({ key }) => key.startsWith('TEST_'))
                  .map(({ key, value }) => `
                    <div class="var-item">
                        <span class="var-key">${key}</span>
                        <span class="var-value ${!value ? 'var-empty' : ''}">${value || '(not set)'}</span>
                    </div>
                  `).join('')}
                ${testAndNetlifyVars.filter(({ key }) => key.startsWith('TEST_')).length === 0 ? 
                  '<div class="var-item"><span class="var-empty">No TEST_* variables found</span></div>' : ''}
            </div>
        </div>

        <div class="section">
            <h2>NETLIFY_* Variables</h2>
            <div class="var-list">
                ${testAndNetlifyVars
                  .filter(({ key }) => key.startsWith('NETLIFY_'))
                  .map(({ key, value }) => `
                    <div class="var-item">
                        <span class="var-key">${key}</span>
                        <span class="var-value ${!value ? 'var-empty' : ''}">${value || '(not set)'}</span>
                    </div>
                  `).join('')}
                ${testAndNetlifyVars.filter(({ key }) => key.startsWith('NETLIFY_')).length === 0 ? 
                  '<div class="var-item"><span class="var-empty">No NETLIFY_* variables found</span></div>' : ''}
            </div>
        </div>

        <div class="build-info">
            <p><strong>Build Information:</strong></p>
            <p>Build Time: ${new Date().toISOString()}</p>
            <p>Node Version: ${process.version}</p>
            <p>Working Directory: ${process.cwd()}</p>
        </div>

        <div class="timestamp">
            Generated by injection-test.ts
        </div>
    </div>
</body>
</html>`;

const indexPath = path.join(publicDir, 'index.html');
fs.writeFileSync(indexPath, html);

console.log(`✓ Generated ${indexPath}`);
console.log('');
console.log('=== Build Script Completed ===');

// Exit with error if TEST_VARIABLE is not set
if (!hasTestVariable) {
  process.exit(1);
}
