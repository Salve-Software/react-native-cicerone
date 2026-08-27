# Imports

## No `../` — ever

`import/no-relative-parent-imports` is an **error**. A chain like `../../../../constants`
hides where a module actually lives, and it breaks the moment a file moves.

```ts
// ❌
import { CICERONE } from '../../../../constants';

// ✅
import { CICERONE } from '@/constants';
```

`./` is fine and preferred inside a component folder — `./styles`, `./types`,
`./hooks/useThingViewModel` all stay relative.

## The two aliases

| alias | points at      | used by         |
| ----- | -------------- | --------------- |
| `@/`  | `src/`         | the library     |
| `~/`  | `example/src/` | the example app |

**They must stay distinct.** The example's babel config also transforms library files, so a
shared prefix makes `@/context` in the library resolve to `example/src/context`.

**`@` maps to `./src`, never to an absolute path.** `babel-plugin-module-resolver` emits the
alias target verbatim, so `path.resolve(__dirname, 'src')` ships the build machine's own
path — that is how `0.1.0` reached npm with `import ... from "/Users/.../src/constants"` in
22 files. The example is safe either way: it has no `module-resolver`, Metro resolves both
aliases from `example/tsconfig.json`.

Three places have to agree, and all three are already wired:

- `tsconfig.json` → `paths`, for the editor and `yarn typecheck`
- `babel.config.js` → `module-resolver`, for the library build only
- `example/tsconfig.json` → `paths`, which Metro reads directly
- `package.json` → `jest.moduleNameMapper`, for tests

**The example resolves through Metro, not babel.** Expo enables `tsconfigPaths` by
default, so `example/tsconfig.json` declares its `paths` outright instead of inheriting
them — Metro does not follow `extends`. A `module-resolver` plugin there as well would be
redundant, and worse: `api.cache(true)` freezes the babel config, so a stale transform
cache resurfaces as `Unable to resolve module ~/components/...` on a device long after the
config was fixed. If you ever see that error, `yarn example start --clear` proves whether
it is a cache.

## The alias must not reach the published package

Babel rewrites `@/` to a relative path at build time, and `tsc-alias` does the same for the
`.d.ts` files. `bob`'s module target runs with `configFile: true` **on purpose** — with the
default `false` it ignores `babel.config.js` and ships `import '@/constants'` to consumers.

After touching anything in the build, verify:

```sh
yarn prepare && yarn verify:lib
```

## Order

`import/order` groups: types first, then packages, then `@/` and `~/`, then relative. No blank
lines between groups. `--fix` handles it.
