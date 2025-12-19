#!/bin/bash

# Test script to demonstrate the different scenarios
# This script helps verify the bug reproduction steps

set -e

echo "======================================"
echo "Testing Netlify Environment Variable Injection Bug"
echo "======================================"
echo ""

# Clean up
rm -f .env

echo "Test 1: Direct node execution with environment variable (BASELINE - Should PASS)"
echo "Command: TEST_VAR=test-value node build.js"
echo "--------------------------------------"
TEST_VAR=test-value node build.js
echo ""
echo "✓ Test 1 PASSED"
echo ""

echo "Test 2: Direct node execution without environment variable (Should FAIL)"
echo "Command: node build.js"
echo "--------------------------------------"
if node build.js; then
    echo "✗ Test 2 FAILED: Expected failure but succeeded"
    exit 1
else
    echo "✓ Test 2 PASSED (Expected failure)"
fi
echo ""

echo "Test 3: PNPM execution with environment variable (Should PASS)"
echo "Command: TEST_VAR=from-pnpm pnpm run build"
echo "--------------------------------------"
TEST_VAR=from-pnpm pnpm run build
echo ""
echo "✓ Test 3 PASSED"
echo ""

echo "Test 4: With .env file (Should PASS)"
echo "Creating .env file and running pnpm build"
echo "--------------------------------------"
cp .env.example .env
cat .env
echo ""
echo "Command: pnpm run build"
pnpm run build
echo ""
echo "✓ Test 4 PASSED"
echo ""

# Clean up
rm -f .env

echo "======================================"
echo "All tests completed successfully!"
echo "======================================"
echo ""
echo "To test with Netlify CLI, run:"
echo "  export TEST_VAR=from-terminal && netlify build"
echo "  (This should demonstrate the bug where the variable is not injected)"
