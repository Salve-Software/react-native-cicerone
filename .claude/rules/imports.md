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
shared prefix makes `@/context` in the library resolve to `example/src/context`. Both aliases
are declared with absolute paths for the same reason.

Four places have to agree, and all four are already wired:

- `tsconfig.json` → `paths`, for the editor and `yarn typecheck`
- `babel.config.js` → `module-resolver`, for the library build
- `example/babel.config.js` → `module-resolver`, for Metro
- `package.json` → `jest.moduleNameMapper`, for tests

## The alias must not reach the published package

Babel rewrites `@/` to a relative path at build time, and `tsc-alias` does the same for the
`.d.ts` files. `bob`'s module target runs with `configFile: true` **on purpose** — with the
default `false` it ignores `babel.config.js` and ships `import '@/constants'` to consumers.

After touching anything in the build, verify:

```sh
yarn prepare && grep -r '@/' lib/ && echo "LEAK" || echo "clean"
```

## Order

`import/order` groups: types first, then packages, then `@/` and `~/`, then relative. No blank
lines between groups. `--fix` handles it.
