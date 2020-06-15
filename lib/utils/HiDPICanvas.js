"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 设置高清canva
var _default = function _default(w, h, ratio) {
  var PIXEL_RATIO = function () {
    var c = document.createElement("canvas"),
        ctx = c.getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx['webkitBackingStorePixelRatio'] || ctx['mozBackingStorePixelRatio'] || ctx['msBackingStorePixelRatio'] || ctx['oBackingStorePixelRatio'] || ctx['backingStorePixelRatio'] || 1;
    return dpr / bsr;
  }();

  if (!ratio) {
    ratio = PIXEL_RATIO;
  }

  var can = document.createElement("canvas");
  can.width = w * ratio;
  can.height = h * ratio;
  can.style.width = w + "px";
  can.style.height = h + "px";
  can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  return can;
};

exports["default"] = _default;