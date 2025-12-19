"use strict";
/**
 * Build script that generates an HTML page showing environment variables
 * to demonstrate the Netlify environment variable injection bug with PNPM
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
console.log('=== Build Script Starting ===');
console.log('');
// The test environment variable we're checking
var TEST_VARIABLE = process.env.TEST_VARIABLE;
console.log('Environment Variables:');
console.log('  TEST_VARIABLE:', TEST_VARIABLE || '(not set)');
console.log('');
// Log all environment variables that start with TEST_ or NETLIFY_
console.log('All TEST_* and NETLIFY_* variables:');
var testAndNetlifyVars = Object.keys(process.env)
    .filter(function (key) { return key.startsWith('TEST_') || key.startsWith('NETLIFY_'); })
    .sort()
    .map(function (key) { return ({ key: key, value: process.env[key] || '' }); });
testAndNetlifyVars.forEach(function (_a) {
    var key = _a.key, value = _a.value;
    console.log("  ".concat(key, ":"), value);
});
console.log('');
// Check if TEST_VARIABLE is set
var hasTestVariable = !!TEST_VARIABLE;
if (!hasTestVariable) {
    console.error('ERROR: TEST_VARIABLE is not set!');
    console.error('This demonstrates the bug where environment variables defined in the terminal');
    console.error('are not injected into the Netlify build when using PNPM.');
}
else {
    console.log('SUCCESS: TEST_VARIABLE is set to:', TEST_VARIABLE);
}
// Generate HTML page
console.log('');
console.log('Generating HTML page...');
var publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}
var html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Netlify Environment Variable Injection Test</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body {\n            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100vh;\n            padding: 20px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n        .container {\n            background: white;\n            border-radius: 16px;\n            box-shadow: 0 20px 60px rgba(0,0,0,0.3);\n            max-width: 800px;\n            width: 100%;\n            padding: 40px;\n        }\n        h1 {\n            color: #333;\n            margin-bottom: 10px;\n            font-size: 2em;\n        }\n        .subtitle {\n            color: #666;\n            margin-bottom: 30px;\n            font-size: 1.1em;\n        }\n        .status {\n            padding: 20px;\n            border-radius: 8px;\n            margin-bottom: 30px;\n            font-weight: 500;\n            font-size: 1.1em;\n        }\n        .status.success {\n            background: #d4edda;\n            color: #155724;\n            border: 2px solid #c3e6cb;\n        }\n        .status.error {\n            background: #f8d7da;\n            color: #721c24;\n            border: 2px solid #f5c6cb;\n        }\n        .section {\n            margin-bottom: 30px;\n        }\n        .section h2 {\n            color: #444;\n            margin-bottom: 15px;\n            font-size: 1.3em;\n            border-bottom: 2px solid #667eea;\n            padding-bottom: 8px;\n        }\n        .var-list {\n            background: #f8f9fa;\n            border-radius: 8px;\n            padding: 20px;\n        }\n        .var-item {\n            display: flex;\n            padding: 12px;\n            border-bottom: 1px solid #dee2e6;\n            font-family: 'Courier New', monospace;\n        }\n        .var-item:last-child {\n            border-bottom: none;\n        }\n        .var-key {\n            font-weight: bold;\n            color: #667eea;\n            min-width: 200px;\n            word-break: break-word;\n        }\n        .var-value {\n            color: #333;\n            flex: 1;\n            word-break: break-all;\n        }\n        .var-empty {\n            color: #999;\n            font-style: italic;\n        }\n        .build-info {\n            background: #e7f3ff;\n            border-left: 4px solid #2196F3;\n            padding: 15px;\n            margin-top: 20px;\n            border-radius: 4px;\n        }\n        .build-info p {\n            margin: 5px 0;\n            color: #555;\n        }\n        .timestamp {\n            color: #888;\n            font-size: 0.9em;\n            margin-top: 20px;\n            text-align: center;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <h1>\uD83E\uDDEA Environment Variable Test</h1>\n        <p class=\"subtitle\">Netlify PNPM Injection Test</p>\n        \n        <div class=\"status ".concat(hasTestVariable ? 'success' : 'error', "\">\n            ").concat(hasTestVariable
    ? "\u2705 SUCCESS: TEST_VARIABLE is set to \"".concat(TEST_VARIABLE, "\"")
    : '❌ ERROR: TEST_VARIABLE is not set!', "\n        </div>\n\n        ").concat(!hasTestVariable ? "\n        <div class=\"build-info\">\n            <p><strong>\u26A0\uFE0F This demonstrates the bug:</strong></p>\n            <p>Environment variables defined in the terminal are not injected into the Netlify build when using PNPM.</p>\n        </div>\n        " : '', "\n\n        <div class=\"section\">\n            <h2>TEST_* Variables</h2>\n            <div class=\"var-list\">\n                ").concat(testAndNetlifyVars
    .filter(function (_a) {
    var key = _a.key;
    return key.startsWith('TEST_');
})
    .map(function (_a) {
    var key = _a.key, value = _a.value;
    return "\n                    <div class=\"var-item\">\n                        <span class=\"var-key\">".concat(key, "</span>\n                        <span class=\"var-value ").concat(!value ? 'var-empty' : '', "\">").concat(value || '(not set)', "</span>\n                    </div>\n                  ");
}).join(''), "\n                ").concat(testAndNetlifyVars.filter(function (_a) {
    var key = _a.key;
    return key.startsWith('TEST_');
}).length === 0 ?
    '<div class="var-item"><span class="var-empty">No TEST_* variables found</span></div>' : '', "\n            </div>\n        </div>\n\n        <div class=\"section\">\n            <h2>NETLIFY_* Variables</h2>\n            <div class=\"var-list\">\n                ").concat(testAndNetlifyVars
    .filter(function (_a) {
    var key = _a.key;
    return key.startsWith('NETLIFY_');
})
    .map(function (_a) {
    var key = _a.key, value = _a.value;
    return "\n                    <div class=\"var-item\">\n                        <span class=\"var-key\">".concat(key, "</span>\n                        <span class=\"var-value ").concat(!value ? 'var-empty' : '', "\">").concat(value || '(not set)', "</span>\n                    </div>\n                  ");
}).join(''), "\n                ").concat(testAndNetlifyVars.filter(function (_a) {
    var key = _a.key;
    return key.startsWith('NETLIFY_');
}).length === 0 ?
    '<div class="var-item"><span class="var-empty">No NETLIFY_* variables found</span></div>' : '', "\n            </div>\n        </div>\n\n        <div class=\"build-info\">\n            <p><strong>Build Information:</strong></p>\n            <p>Build Time: ").concat(new Date().toISOString(), "</p>\n            <p>Node Version: ").concat(process.version, "</p>\n            <p>Working Directory: ").concat(process.cwd(), "</p>\n        </div>\n\n        <div class=\"timestamp\">\n            Generated by injection-test.ts\n        </div>\n    </div>\n</body>\n</html>");
var indexPath = path.join(publicDir, 'index.html');
fs.writeFileSync(indexPath, html);
console.log("\u2713 Generated ".concat(indexPath));
console.log('');
console.log('=== Build Script Completed ===');
// Exit with error if TEST_VARIABLE is not set
if (!hasTestVariable) {
    process.exit(1);
}
//# sourceMappingURL=injection-test.js.map