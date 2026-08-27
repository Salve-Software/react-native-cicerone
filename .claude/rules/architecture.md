# Architecture

A published library, not an app. Everything under `src/` ends up in someone else's bundle.

```
src/
  index.tsx        the public API — the only file consumers import from
  types/           one type per file
  constants/       named `as const` groups
  context/         React contexts
  storage/         the "already seen" adapter
  utils/           one pure function per file
  hooks/           cross-cutting hooks (useCicerone)
  components/      the tour surface

example/           demo app, its own workspace
```

## Where each thing lives

- Public type consumers touch → `src/types/`, re-exported by `src/index.tsx`
- Internal-only type → still `src/types/`; the barrel is cheap and the split is not worth it
- Pure function with no React → `src/utils/`, with a test
- Value from the prototype → the owning `constants/` folder
- Component used by more than one component → `src/components/`
- Subcomponent of one component → `components/` **inside** that component's folder
- Component state → `hooks/use<Name>ViewModel/` next to the component
- Animated style → `hooks/useReanimatedStyles/` next to the component

## Dependency rules

- **Reanimated is the only peer dependency.** Adding another is a decision, not a detail:
  every consumer pays for it. `react-native-svg` was deliberately avoided — the scrim is a
  giant rounded border, which needs no SVG.
- **Nothing in `src/` may import from `example/`.** The example depends on the library, never
  the reverse.
- **Never copy dependency versions from another project.** Run `npx expo install --fix` in
  `example/` and let the SDK pick; then pin the root devDependency to the _same exact_
  version so the workspace hoists one copy. Reanimated and `react-native-worklets` are
  version-locked to each other and to the SDK's native binary — a mismatch does not fail the
  bundle, it crashes at startup with `Exception in HostFunction` in `NativeWorklets`.
  `npx expo install --check` is the fast way to confirm.
- **No design system, no i18n, no storage engine.** The library takes a `theme`, `labels` and
  a `storage` adapter instead. It has no opinion about which ones you use.

## The overlay

`CiceroneProvider` owns state and measurement, and renders `CiceroneOverlay` as a sibling of
its children, so the overlay paints on top without a Modal.

The dim is one view with a very wide border and a rounded hollow centre — the hollow is the
hole. The ring sits `padding` px outside it, leaving that band dimmed; that band is the halo.

Touch is decoupled from the visuals: by default one layer covers the screen and a press
advances; with `allowTargetInteraction`, four strips surround the hole instead so the
highlighted element stays pressable.
