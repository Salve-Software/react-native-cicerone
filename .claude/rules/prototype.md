# The prototype

Every colour, duration and dimension in this library came from the Rotuz clickable prototype
at `Rotuz/docs/Rotuz App(1).html`. Do not invent replacements; go read it.

## Reading it

The template is JSON-escaped inside `<script type="__bundler/template">`:

```py
import re, io, json
s = io.open(path, encoding='utf-8').read()
m = re.search(r'<script type="__bundler/template"[^>]*>(.*?)</script>', s, re.S)
tpl = json.loads(m.group(1).strip())
```

The tour lives in three places: `tours = {...}` (the steps), `measureTour` (the geometry), and
the `hasTour` block (the markup and palettes).

## Two things the roadmap got wrong

Both were found by reading the source, and the library follows the prototype, not the prose:

1. **The four rectangles are blur only.** They carry `backdrop-filter` and no colour. The dim
   comes from a fifth element at the hole with `box-shadow: 0 0 0 9999px rgba(11,18,13,.55)`
   and `pointer-events: none`.
2. **The hole is not tappable.** The overlay root is `position:absolute; inset:0` with
   `onClick=tourNext`, covering everything including the hole. A press anywhere advances.
   The library keeps this as the default and makes it configurable.

## One deliberate divergence

The prototype centres the card on the **screen**, so its arrow only lands on the target
because every target in it happens to be central. A general library cannot assume that, so
the card follows the target and the arrow is repositioned when clamping to the screen edge
pulls the two apart. See `resolveCardLayout`.

## Keyframe names

Prototype keyframes are referenced by name where the value alone would be a mystery —
`rtzBalA` (card entrance), `rtzRing` (ring entrance), `rtzGlow` (ring pulse), `rtzSheen`
(highlight card), `rtzSparkle`, `rtzPremRing`. Keep the name so the value can be traced back;
do not paste the whole keyframe.

## Verifying against it

The prototype runs in a browser, and so does the example app:

```sh
yarn example web
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9333 --user-data-dir=/tmp/ciceroneprofile
```

Drive both over CDP and compare screenshots. Colours and geometry come from the template, not
from the eye.
