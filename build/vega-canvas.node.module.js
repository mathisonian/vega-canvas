function domCanvas(w, h) {
  if (typeof document !== 'undefined' && document.createElement) {
    const c = document.createElement('canvas');
    if (c && c.getContext) {
      c.width = w;
      c.height = h;
      return c;
    }
  }
  return null;
}
const domImage = () => typeof Image !== 'undefined' ? Image : null;

let SkiaCanvas;
try {
  SkiaCanvas = require('@napi-rs/canvas');
  if (!(SkiaCanvas && SkiaCanvas.createCanvas)) {
    SkiaCanvas = null;
  }
} catch (error) {
  // do nothing
}
function nodeCanvas() {
  let w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (SkiaCanvas) {
    try {
      return new SkiaCanvas.createCanvas(w, h);
    } catch (e) {
      // do nothing, return null on error
    }
  }
  return null;
}
const nodeImage = () => SkiaCanvas && SkiaCanvas.Image || null;

function canvas(w, h, type) {
  return domCanvas(w, h) || nodeCanvas(w, h, type) || null;
}
function image() {
  return domImage() || nodeImage() || null;
}

export { canvas, domCanvas, image, nodeCanvas };
