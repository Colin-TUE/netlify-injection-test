import type { GatsbyNode } from 'gatsby';
import * as fs from 'fs';
import * as path from 'path';

export const onPreBootstrap: GatsbyNode['onPreBootstrap'] = async ({ reporter }) => {
  reporter.info('=== Build Script Starting ===');

  // The test environment variable we're checking
  const TEST_VARIABLE = process.env.TEST_VARIABLE;

  reporter.info('Environment Variables:');
  reporter.info(`  TEST_VARIABLE: ${TEST_VARIABLE || '(not set)'}`);

  // Log all environment variables that start with TEST_ or NETLIFY_
  reporter.info('All TEST_* and NETLIFY_* variables:');
  const testAndNetlifyVars = Object.keys(process.env)
    .filter(key => key.startsWith('TEST_') || key.startsWith('NETLIFY_'))
    .sort()
    .map(key => ({ key, value: process.env[key] || '' }));

  testAndNetlifyVars.forEach(({ key, value }) => {
    reporter.info(`  ${key}: ${value}`);
  });

  // Check if TEST_VARIABLE is set
  const hasTestVariable = !!TEST_VARIABLE;
  if (!hasTestVariable) {
    reporter.error('ERROR: TEST_VARIABLE is not set!');
    reporter.error('This demonstrates the bug where environment variables defined in the terminal');
    reporter.error('are not injected into the Netlify build when using PNPM.');
  } else {
    reporter.success(`SUCCESS: TEST_VARIABLE is set to: ${TEST_VARIABLE}`);
  }

  // Generate build data JSON file
  const buildData = {
    testVariable: TEST_VARIABLE,
    hasTestVariable,
    testAndNetlifyVars,
    buildTime: new Date().toISOString(),
    nodeVersion: process.version,
    workingDirectory: process.cwd(),
  };

  const dataDir = path.resolve('./src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(dataDir, 'build-data.json'),
    JSON.stringify(buildData, null, 2)
  );

  reporter.info('✓ Generated build-data.json');
  reporter.info('=== Build Script Completed ===');
};
