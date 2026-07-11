# baluster-studio

Interactive "iron try-on" for the staircase remodel: three real photos of the
house with the white wood balusters digitally removed, so iron balusters
(JMP Wood 9000-series designs) can be previewed in place — true to scale,
with pattern sequencing, finishes, cost estimate, before/after wipe, and
side-by-side look comparison.

## Live

Published artifact (private, shareable):
https://claude.ai/code/artifact/2133b160-1eb2-4f46-8a8b-8c31cc606be8

## Files

- `index.html` / `baluster-studio.html` — the app (identical). Loads scenes
  from `scenes/` at runtime. Works on GitHub Pages as-is (relative paths).
- `scenes/` — per scene: `<id>.jpg` (clean plate, balusters removed),
  `<id>_before.jpg` (original, for the before/after wipe), `<id>.json`
  (per-baluster axes `xT,yT,xB,yB`, visible length `len` in inches for scale,
  and occluder polygons re-drawn over the iron: posts, newel, volute cap, plant).
  Scenes: `foyer` (money shot), `flight` (close-up of the lower run),
  `landing` (upstairs level run).
- `photos/current/` — original phone photos.
- `dev/serve.js` — local static server + `/save` endpoint (port 8917).
- `dev/prep.html` — the scene-prep tool used to erase the wood spindles
  (ridge-tracking detector, background reconstruction fills, occluders,
  repair/polish passes). Only needed to build new scenes.
- `dev/build.js` — `node dev/build.js` → `dist/baluster-studio-artifact.html`
  (self-contained, scenes embedded as data URIs — this is what gets published
  as the artifact).

## Scale calibration

The old wood balusters taper 5/8″ (top) → ~1″ (mid) → 1-1/4″ square boot.
The boot width was measured in pixels per scene to fix pixels-per-inch, and
each baluster's `len` is its *visible* segment length in inches (some are
cropped by the frame or hidden behind the half-wall). Iron width in pixels =
inches × (axis pixels / len).

## Deploying to GitHub Pages

Push this folder to a repo (exclude `photos/` if preferred — the app only
needs `index.html` + `scenes/`), enable Pages on the main branch. Done.

## Run locally

```
node dev/serve.js     # http://localhost:8917
```
