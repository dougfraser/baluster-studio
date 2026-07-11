# baluster-studio

Interactive black-iron baluster "try-on" for the staircase remodel.
Three scenes: a drawn close-up of the stairs, a drawn level run, and a real
photo of the upstairs landing (white wood spindles digitally removed).
Four JMP Wood 9000-series designs (plain, single twist, double twist, single
knuckle), true-to-scale widths (1/2″ / 9/16″ / 5/8″), repeating patterns of up
to 3 designs, before/after wipe, saved-look comparison, and a parts-cost
estimate.

## Live

https://dougfraser.github.io/baluster-studio/
(GitHub Pages, deploys automatically on push to `main`.)

## Files

- `index.html` / `baluster-studio.html` — the app (identical copies; keep in
  sync). The two drawn scenes are generated at runtime in
  `buildCloseup()` / `buildLevel()`; the landing photo scene loads from
  `scenes/` (relative paths, Pages-friendly).
- `scenes/` — landing scene assets: `landing.jpg` (clean plate, spindles
  removed), `landing_before.jpg` (original, for the wipe), `landing.json`
  (per-baluster axes `xT,yT,xB,yB` + visible length `len` in inches, and
  occluder polygons). The retired foyer/flight scene files remain for
  reference but are unused.
- `photos/` — original phone photos (kept local, gitignored).
- `dev/serve.js` — local static server + `/save` endpoint (port 8917).
- `dev/prep.html` — the photo-prep tool that erased the wood spindles
  (ridge-tracking detector, background reconstruction, occluders). Only
  needed to process new photos.

## Scale calibration

The old wood balusters taper 5/8″ (top) → ~1″ (mid) → 1-1/4″ square boot.
The boot width in pixels fixes each scene's pixels-per-inch; a baluster's
`len` is its *visible* segment length in inches. Iron width in pixels =
inches × (axis pixels / len). The drawn scenes use exact constructed
geometry (7.5″ rise, 10.5″ run, 26 px/inch).

## Run locally

```
node dev/serve.js     # http://localhost:8917
```
