(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vega = {}));
})(this, (function (exports) { 'use strict';

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
  function nodeCanvas(w = 0, h = 0) {
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
    return domCanvas(w, h) || nodeCanvas(w, h) || null;
  }
  function image() {
    return domImage() || nodeImage() || null;
  }

  exports.canvas = canvas;
  exports.domCanvas = domCanvas;
  exports.image = image;
  exports.nodeCanvas = nodeCanvas;

}));
