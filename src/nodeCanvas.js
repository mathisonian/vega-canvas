let SkiaCanvas;

try {
  SkiaCanvas = require('@napi-rs/canvas')

  if (!(SkiaCanvas && SkiaCanvas.createCanvas)) {
    SkiaCanvas = null;
  }
} catch (error) {
  // do nothing
}

export function nodeCanvas(w = 0, h = 0) {
  if (SkiaCanvas) {
    try {
      return new SkiaCanvas.createCanvas(w, h);
    } catch (e) {
      // do nothing, return null on error
    }
  }
  return null;
}

export const nodeImage = () =>
  (SkiaCanvas && SkiaCanvas.Image) || null;