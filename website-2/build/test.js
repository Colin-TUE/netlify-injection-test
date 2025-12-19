"use strict";
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
console.log('=== Test Script Starting ===');
console.log('');
// Generate HTML page
console.log('');
console.log('Generating HTML page...');
var publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}
var html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Netlify Simple Website</title>\n</head>\n<body>\n    <div>\n        <h1>Simple Test</h1>\n        <p>Netlify PNPM Test script</p>\n    </div>\n</body>\n</html>";
var indexPath = path.join(publicDir, 'index.html');
fs.writeFileSync(indexPath, html);
console.log("\u2713 Generated ".concat(indexPath));
console.log('');
console.log('=== Build Script Completed ===');
//# sourceMappingURL=test.js.map