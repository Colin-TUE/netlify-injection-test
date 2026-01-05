# netlify-injection-test

Minimal reproducible repository testing with a bug where environment variables are not properly injected into Netlify commands when using PNPM.

## How to Reproduce

### Test Case 1: Environment Variable from Terminal

```bash
export TEST_VARIABLE="terminal"
pnpm start:netlify
```

### Test Case 2: Environment Variable from .env File (WORKS)

```bash
unset TEST_VARIABLE
cp .env.example .env
pnpm start:netlify
```

### Test Case 3: No Environment Variable Defined

```bash
unset TEST_VARIABLE
rm -f .env
pnpm start:netlify
```

## License

MIT
