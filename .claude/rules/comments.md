# Comments

## English

This is an open source library. Comments, identifiers and commit messages are all English —
contributors outside the team have to read it.

This overrides the global "comments in Portuguese" rule, which still holds for the Rotuz app.

## As lean as possible — one line or nothing

The test: **would deleting this make someone break the code?** If not, delete it.

A comment that stays true when pasted onto any other thing of its kind says nothing.
`"Presentation component for the screen"` fits anything; `"Android reports 0x0 until the view
has been through layout"` fits exactly one place.

```ts
// ❌ restates the name
/** Which side of the target the card is anchored to. */
export type ICiceronePlacement = 'top' | 'bottom';

// ✅ says something the code does not
// Android reports 0x0 until the view has been through layout.
if (width === 0 && height === 0) return resolve(null);
```

## Paragraph blocks are banned

If it does not fit on one line, what is left over is decision context — that belongs in a
rule file or the commit message, not in the source.

## What earns an inline comment

| Type                                         | Example in this repo                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| Looks like a bug, is not                     | Android's 0x0 measurement in `measureInWindow`               |
| Deliberate absence                           | `// Mount only: changing steps mid-tour must not restart it` |
| A value that must not diverge from elsewhere | letter spacing derived from the prototype's em values        |
| An invisible external constraint             | the giant border technique in the scrim                      |

Narrating the next block, repeating the function name, or explaining the pattern instead of
this instance: all out.

## JSDoc — allowed, short

One line, on a component, hook, function or type, saying what **this** one is or why it
exists. Keep it when it carries an API contract the signature cannot:

```ts
/** `'circle'` rounds by half of the shortest side. */
radius?: number | 'circle';
```

## Values from the prototype

The origin goes **once**, at the top of the `constants/` file — not repeated on every field.

```ts
/** Geometry taken from the Rotuz clickable prototype. */
export const CICERONE = { ... } as const;
```
