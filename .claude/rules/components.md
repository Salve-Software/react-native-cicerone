# Components

Every component follows the same anatomy:

```
<Name>/
  index.tsx                      view — composition and JSX only
  styles.ts                      useStyles
  types/                         one type per file, plus index.ts
  constants/                     named `as const` groups
  hooks/
    use<Name>ViewModel/
      index.ts                   state, handlers, derivations
      __tests__/                 the view model's test
    useReanimatedStyles/         animated styles, when there are any
  components/                    subcomponents local to this one
```

## The view has no logic

`index.tsx` does composition and JSX. It does not declare functions, derive values, hold
state, or compute conditionals beyond rendering what the view model already resolved.

Only `useStyles()` and animated-style hooks belong in the view — they are presentation.

## Every component has a view model

Even when it looks like too little. The view model is where a rule becomes testable without
mounting the tree.

The exception is a component with no state, no effect, no handler and no derivation —
`CardArrow` builds JSX from props and constants, and a view model there would be an empty
function with an empty test. The moment a `useState`, `useEffect`, `useRef`, handler or
derivation appears, the view model becomes mandatory.

## Every view model has a test

`hooks/use<Name>ViewModel/__tests__/use<Name>ViewModel.test.ts`. One `describe` per exposed
function, and the cases that matter: the happy path, the path that must **not** happen, and
the edge.

`@testing-library/react-native` 14 is **async** — `renderHook`, `act` and `unmount` all need
`await`. Without it, `result` is `undefined` or the assertion reads stale state:

```ts
const { result } = await renderHook(() => useThingViewModel(props));
await act(async () => result.current.next());
await unmount();
```

A variable used inside `jest.mock()` needs a `mock` prefix — jest hoists the call.

## Build easings at module scope

`Easing.bezier(...)` returns a new object on every render. Listed in a dependency array,
it makes the effect re-run every render — an entrance animation reset over and over reads
as the card blinking. Build it once outside the hook.

```ts
// ❌ new identity every render
const easing = Easing.bezier(0.22, 1, 0.36, 1);
useEffect(() => {
  entry.value = withTiming(1, { easing });
}, [index, easing]);

// ✅
const EASE_OUT_EXPO = Easing.bezier(0.22, 1, 0.36, 1);
```

`react-hooks/exhaustive-deps` does not catch this: the dependency is declared correctly, it
is the value that is unstable.

## Do not over-nest

`Sparkle` is a sibling of `Sparkles` under `Spotlight/components/`, not a child of it. Four
levels of component folders means eight `../` to reach `src/` — and that is a signal the
structure is wrong, not a path detail to work around.

## Constants

A magic number does not live in `styles.ts` or in the view. It goes to `constants/`, named,
grouped in an `as const` object.
