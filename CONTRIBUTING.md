# Contributing

This repository is a minimal reproducible example to demonstrate a bug in Netlify's environment variable injection when using PNPM.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the test scenarios:
   ```bash
   ./test-scenarios.sh
   ```

## Testing with Netlify CLI

If you have the Netlify CLI installed, you can test the bug directly:

### Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Test Scenario: Terminal Environment Variable (Demonstrates the Bug)

```bash
# Set an environment variable
export TEST_VAR=from-terminal

# Run Netlify build
netlify build
```

**Expected behavior:** The build should succeed with `TEST_VAR` accessible.

**Actual behavior (Bug):** The build fails because `TEST_VAR` is not injected into the build process.

### Test Scenario: .env File (Works as Expected)

```bash
# Unset the terminal variable
unset TEST_VAR

# Create a .env file
cp .env.example .env

# Run Netlify build
netlify build
```

**Result:** The build succeeds because Netlify correctly picks up the `.env` file.

## File Structure

- `package.json` - Node.js project with PNPM configuration
- `pnpm-lock.yaml` - PNPM lock file
- `build.js` - Build script that checks for environment variables
- `netlify.toml` - Netlify configuration
- `.env.example` - Example environment file
- `test-scenarios.sh` - Automated test script
- `README.md` - Project documentation
