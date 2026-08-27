## What changed

<!-- One or two sentences. The commit messages carry the detail. -->

## Why

<!-- The problem this solves. If it fixes an issue, link it: Fixes #123 -->

## How it was verified

<!-- Say what you actually ran, not what you assume passes. -->

- [ ] `yarn lint` — zero errors and zero warnings
- [ ] `yarn typecheck`
- [ ] `yarn test`
- [ ] Ran the example on a device or simulator (`yarn example ios` / `android`)

## If it touches the tour surface

- [ ] Every view model that changed still has a test covering the new behaviour
- [ ] Screenshots or a clip, since layout and animation do not show up in a diff

## If it touches the build

- [ ] `yarn prepare && grep -r '@/' lib/` comes back empty — the alias must not
      reach the published package
