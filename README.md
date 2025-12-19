# netlify-injection-test

Minimal reproducible repository demonstrating a bug where environment variables are not properly injected into Netlify builds when using PNPM.

## The Bug

When using PNPM with Netlify, environment variables defined in the terminal (e.g., via `export TEST_VAR=value`) are **not** injected into the Netlify build process. However, environment variables defined in a `.env` file or not defined at all are handled correctly by Netlify.

## Repository Structure

- `package.json` - Node.js project configuration with PNPM package manager
- `build.js` - Build script that checks for the `TEST_VAR` environment variable
- `netlify.toml` - Netlify configuration file
- `.env.example` - Example environment file

## How to Reproduce

### Prerequisites

- PNPM installed (`npm install -g pnpm`)
- Netlify CLI installed (`npm install -g netlify-cli`)

### Test Case 1: Environment Variable from Terminal (BUG - FAILS)

```bash
# Set an environment variable in the terminal
export TEST_VAR=from-terminal

# Run the Netlify build
netlify build

# Expected: The build should succeed with TEST_VAR accessible
# Actual: The build fails because TEST_VAR is not injected
```

### Test Case 2: Environment Variable from .env File (WORKS)

```bash
# Unset the terminal variable
unset TEST_VAR

# Create a .env file
cp .env.example .env

# Run the Netlify build
netlify build

# Result: The build succeeds because Netlify picks up the .env file
```

### Test Case 3: No Environment Variable Defined (WORKS - Expected Failure)

```bash
# Unset the terminal variable
unset TEST_VAR

# Remove the .env file
rm -f .env

# Run the Netlify build
netlify build

# Result: The build fails as expected because TEST_VAR is not set anywhere
```

## Expected Behavior

The Netlify CLI should inject environment variables from the terminal into the build process, regardless of the package manager used (npm, yarn, or pnpm).

## Actual Behavior

When using PNPM, terminal environment variables are not injected into the Netlify build, but `.env` file variables work correctly.

## Testing Locally

To test the build script directly without Netlify:

```bash
# With environment variable
TEST_VAR=test-value node build.js

# Without environment variable (should fail)
node build.js
```

## License

MIT
