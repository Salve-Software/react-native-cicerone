# Lint and formatting

**Target: zero errors and zero warnings.** An accumulated warning becomes noise, and the next
real error slips past it.

```sh
yarn lint        # eslint over js,jsx,cjs,mjs,ts,tsx
yarn lint:fix
yarn format      # prettier --write .
yarn format:check
```

## Prettier and ESLint do not compete

`eslint-config-prettier` is the **last** entry in the array and turns off every formatting
rule. Style is Prettier's job; ESLint handles correctness and convention. Do not add a
formatting rule to ESLint.

Prettier config lives in `.prettierrc.json`, not in `package.json`.

## Rules that are not the default, and why

**`import/no-relative-parent-imports`.** See [imports.md](./imports.md).

**`no-void` with `allowAsStatement: true`.** `void somePromise()` is how a deliberately
un-awaited call is marked. The default rule bans it outright; only the expression form stays
banned.

**`@react-native` config scoped to `js,jsx,ts,tsx`.** Its parser cannot handle `import.meta`,
so `.mjs`/`.cjs` config files must keep the default parser. Without the scope,
`eslint.config.mjs` fails to parse itself — and note the lint glob covers `.mjs`, precisely
so that failure is visible.

**`example/dist/**` ignored.** The exported web bundle is 1.3MB of minified JS and produces
hundreds of meaningless findings.

## Hooks

`lint-staged` runs `prettier --write` then `eslint --fix` on staged files, via husky's
`pre-commit`. `commit-msg` runs commitlint. `pre-push` runs `tsc --noEmit` — type-checking on
every commit is too slow to be worth it.

## When touching the lint config

- A new rule needs a reason. If it is taste, it is Prettier's business.
- Running `--fix` across the repo and committing it alongside a logic change hides the diff
  that matters. Formatting goes in its own commit.
- Suppressing with `eslint-disable` requires a comment saying why.
