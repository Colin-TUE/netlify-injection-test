# netlify-injection-test

Minimal reproducible repository testing with a bug where environment variables are not properly injected into Netlify commands when using PNPM.

## How to Reproduce

> We use `pnpx` as it seems Netlify has issues with the workspaces in this repo and so does not detect them.
> It does pick up the static files, but not the relevant commands.

### Test Case 1: Environment Variable from Terminal

```bash
export VARIABLE="terminal"
cd website
pnpx netlify dev
```

### Test Case 2: Environment Variable from .env File (WORKS)

```bash
unset TEST_VARIABLE
cp .env.example .env
cd website
pnpx netlify dev
```

### Test Case 3: No Environment Variable Defined

```bash
unset TEST_VARIABLE
rm -f .env
pnpx netlify dev
```

## License

MIT
