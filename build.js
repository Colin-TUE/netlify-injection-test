#!/usr/bin/env node

/**
 * Build script that logs environment variables to demonstrate
 * the Netlify environment variable injection bug with PNPM
 */

// Load .env file if it exists
require('dotenv').config();

console.log('=== Build Script Starting ===');
console.log('');

// The test environment variable we're checking
const TEST_VAR = process.env.TEST_VAR;

console.log('Environment Variables:');
console.log('  TEST_VAR:', TEST_VAR || '(not set)');
console.log('');

// Log all environment variables that start with TEST_ or NETLIFY_
console.log('All TEST_* and NETLIFY_* variables:');
Object.keys(process.env)
  .filter(key => key.startsWith('TEST_') || key.startsWith('NETLIFY_'))
  .sort()
  .forEach(key => {
    console.log(`  ${key}:`, process.env[key]);
  });

console.log('');

if (!TEST_VAR) {
  console.error('ERROR: TEST_VAR is not set!');
  console.error('This demonstrates the bug where environment variables defined in the terminal');
  console.error('are not injected into the Netlify build when using PNPM.');
  process.exit(1);
}

console.log('SUCCESS: TEST_VAR is set to:', TEST_VAR);
console.log('');
console.log('=== Build Script Completed ===');
