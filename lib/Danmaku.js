"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 弹幕库实例
var Danmaku = /*#__PURE__*/function () {
  function Danmaku(canvas, danmakuConfig) {
    _classCallCheck(this, Danmaku);

    this.mCanvas = canvas;
    this.mDanmukuConfig = danmakuConfig;
    this.mCtx = canvas.getContext('2d');
    this.mDanmuTracks = [];
    this.initRender();
  }

  _createClass(Danmaku, [{
    key: "addDanmuTrack",
    value: function addDanmuTrack(danmuTrack) {
      this.mDanmuTracks.push(danmuTrack);
      danmuTrack.setDanmaku(this);
    }
  }, {
    key: "removeDanmuTrack",
    value: function removeDanmuTrack(danmuTrack) {
      this.mDanmuTracks = this.mDanmuTracks.filter(function (item) {
        return item !== danmuTrack;
      });
    }
  }, {
    key: "initRender",
    value: function initRender() {
      this.mCanvas.width = this.mDanmukuConfig.width;
      this.mCanvas.height = this.mDanmukuConfig.height;

      if (window.requestAnimationFrame) {
        this.renderByAnimationFrame();
      } else {
        this.renderBySetInterval();
      }
    }
  }, {
    key: "renderByAnimationFrame",
    value: function renderByAnimationFrame() {
      this.render();
      requestAnimationFrame(this.renderByAnimationFrame.bind(this));
    }
  }, {
    key: "renderBySetInterval",
    value: function renderBySetInterval() {
      setInterval(this.render.bind(this), 0);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isPause) return;
      this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height);

      var _iterator = _createForOfIteratorHelper(this.mDanmuTracks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mDanmuTrack = _step.value;
          mDanmuTrack.render(this.mCtx);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.isPause = false;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPause = true;
    }
  }]);

  return Danmaku;
}();

exports["default"] = Danmaku;