import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import buildData from '../data/build-data.json';

interface BuildData {
  testVariable?: string;
  hasTestVariable: boolean;
  testAndNetlifyVars: Array<{ key: string; value: string }>;
  buildTime: string;
  nodeVersion: string;
  workingDirectory: string;
}

const IndexPage: React.FC<PageProps> = () => {
  const {
    testVariable,
    hasTestVariable,
    testAndNetlifyVars,
    buildTime,
    nodeVersion,
    workingDirectory,
  } = buildData as BuildData;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Netlify Environment Variable Injection Test</title>
        <style>{`
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
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1>🧪 Environment Variable Test</h1>
          <p className="subtitle">Netlify PNPM Injection Test (Built with Gatsby)</p>
          
          <div className={`status ${hasTestVariable ? 'success' : 'error'}`}>
            {hasTestVariable 
              ? `✅ SUCCESS: TEST_VARIABLE is set to "${testVariable}"` 
              : '❌ ERROR: TEST_VARIABLE is not set!'
            }
          </div>

          {!hasTestVariable && (
            <div className="build-info">
              <p><strong>⚠️ This demonstrates the bug:</strong></p>
              <p>Environment variables defined in the terminal are not injected into the Netlify build when using PNPM.</p>
            </div>
          )}

          <div className="section">
            <h2>TEST_* Variables</h2>
            <div className="var-list">
              {testAndNetlifyVars.filter(({ key }) => key.startsWith('TEST_')).length > 0 ? (
                testAndNetlifyVars
                  .filter(({ key }) => key.startsWith('TEST_'))
                  .map(({ key, value }) => (
                    <div className="var-item" key={key}>
                      <span className="var-key">{key}</span>
                      <span className={`var-value ${!value ? 'var-empty' : ''}`}>
                        {value || '(not set)'}
                      </span>
                    </div>
                  ))
              ) : (
                <div className="var-item">
                  <span className="var-empty">No TEST_* variables found</span>
                </div>
              )}
            </div>
          </div>

          <div className="section">
            <h2>NETLIFY_* Variables</h2>
            <div className="var-list">
              {testAndNetlifyVars.filter(({ key }) => key.startsWith('NETLIFY_')).length > 0 ? (
                testAndNetlifyVars
                  .filter(({ key }) => key.startsWith('NETLIFY_'))
                  .map(({ key, value }) => (
                    <div className="var-item" key={key}>
                      <span className="var-key">{key}</span>
                      <span className={`var-value ${!value ? 'var-empty' : ''}`}>
                        {value || '(not set)'}
                      </span>
                    </div>
                  ))
              ) : (
                <div className="var-item">
                  <span className="var-empty">No NETLIFY_* variables found</span>
                </div>
              )}
            </div>
          </div>

          <div className="build-info">
            <p><strong>Build Information:</strong></p>
            <p>Build Time: {buildTime}</p>
            <p>Node Version: {nodeVersion}</p>
            <p>Working Directory: {workingDirectory}</p>
          </div>

          <div className="timestamp">
            Generated by Gatsby build
          </div>
        </div>
      </body>
    </html>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Netlify Environment Variable Injection Test</title>
    <meta name="description" content="Testing Netlify environment variable injection with PNPM and Gatsby" />
  </>
);
