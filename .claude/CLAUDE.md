# react-native-cicerone

Guided onboarding tours for React Native. Published open source under the
[Salve-Software](https://github.com/Salve-Software) org.

The library ships **no native code**: it measures with `measureInWindow`, dims with plain
views, and animates with Reanimated.

## Rules

Read these before writing code. They are not suggestions.

- [Architecture](.claude/rules/architecture.md) — where each thing lives
- [Components](.claude/rules/components.md) — the layered anatomy every component follows
- [Imports](.claude/rules/imports.md) — the `@/` alias, and why `../` is banned
- [Comments](.claude/rules/comments.md) — English, one line or nothing
- [Lint and formatting](.claude/rules/lint.md) — zero errors, zero warnings
- [The prototype](.claude/rules/prototype.md) — where the magic numbers come from

## Commands

```sh
yarn lint          # zero errors and zero warnings, always
yarn typecheck
yarn test
yarn format        # prettier --write .
yarn prepare       # builds lib/ through bob, then resolves aliases
yarn example start # the demo app
```

## Non-negotiables

- **`yarn lint` is zero errors and zero warnings.** Not "mostly clean".
- **Every view model has a test.** No exceptions worth arguing about.
- **The published `lib/` must not contain `@/`.** `yarn prepare` resolves it; if you change
  the build, verify with `grep -r '@/' lib/`.
- **Never commit to `main`.** Branch first.
