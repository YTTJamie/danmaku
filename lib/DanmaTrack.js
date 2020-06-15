"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DanmaTrack = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DanmaTrack = /*#__PURE__*/function () {
  function DanmaTrack(danmuPool, danmaTrackConfig) {
    _classCallCheck(this, DanmaTrack);

    this.mDanmuPool = danmuPool;
    this.mDanmuTrackConfig = {};
    this.mTrackInfo = {
      maxWidth: 0,
      top: 0,
      height: 0
    };
    this.mDanmaMessages = [];
    this.initConfig(danmaTrackConfig);
  }

  _createClass(DanmaTrack, [{
    key: "setDanmaku",
    value: function setDanmaku(danmaku) {
      this.mDanmaku = danmaku;
    }
  }, {
    key: "initConfig",
    value: function initConfig(danmaTrackConfig) {
      this.mDanmuTrackConfig = danmaTrackConfig;
      this.mTrackInfo.top = danmaTrackConfig.top;
      this.mTrackInfo.height = danmaTrackConfig.height;
    }
  }, {
    key: "render",
    value: function render(ctx) {
      this.refreshMessage(ctx);

      for (var i = 0; i < this.mDanmaMessages.length; i++) {
        var currentDanmaMessage = this.mDanmaMessages[i];
        currentDanmaMessage.onBaseMeasure(ctx, this.mTrackInfo);
        currentDanmaMessage.onBaseLayout(ctx, this.mTrackInfo);
        currentDanmaMessage.onBaseDraw(ctx, this.mTrackInfo);
        currentDanmaMessage.onBaseDestroyed();

        if (i === this.mDanmaMessages.length - 1) {
          this.mTrackInfo.maxWidth = currentDanmaMessage.position.left + currentDanmaMessage.size.width;
        }
      }
    }
  }, {
    key: "refreshMessage",
    value: function refreshMessage(ctx) {
      this.removeMessage();
      this.AddMessage(ctx);
    }
  }, {
    key: "AddMessage",
    value: function AddMessage(ctx) {
      if (this.mTrackInfo.maxWidth < ctx.canvas.width - 10) {
        var msg = this.mDanmuPool.getMessage();

        if (msg) {
          this.mDanmaMessages.push(msg);
        }
      }
    }
  }, {
    key: "removeMessage",
    value: function removeMessage() {
      this.mDanmaMessages = this.mDanmaMessages.filter(function (item) {
        return !item.distoryed;
      });
    }
  }]);

  return DanmaTrack;
}();

exports.DanmaTrack = DanmaTrack;