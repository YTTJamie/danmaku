"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMessage = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseMessage = /*#__PURE__*/function () {
  function BaseMessage() {
    _classCallCheck(this, BaseMessage);
  }

  _createClass(BaseMessage, [{
    key: "onBaseCreate",
    value: function onBaseCreate() {
      var _this = this;

      this.onCreate(function (val) {
        if (val) {
          _this.created = true;
        } else {
          _this.distoryed = true;
        }
      });
    }
  }, {
    key: "onBaseDestroyed",
    value: function onBaseDestroyed() {
      this.distoryed = this.onDestroyed();
    }
  }, {
    key: "onBaseMeasure",
    value: function onBaseMeasure(ctx, trackInfo) {
      this.size = this.onMeasure(ctx, trackInfo);
    }
  }, {
    key: "onBaseLayout",
    value: function onBaseLayout(ctx, trackInfo) {
      this.position = this.onLayout(ctx, trackInfo);
    }
  }, {
    key: "onBaseDraw",
    value: function onBaseDraw(ctx, trackInfo) {
      this.onDraw(ctx, trackInfo);
    }
  }, {
    key: "onCreate",
    value: function onCreate(callback) {}
  }, {
    key: "onMeasure",
    value: function onMeasure(ctx, trackInfo) {}
  }, {
    key: "onLayout",
    value: function onLayout(ctx, trackInfo) {}
  }, {
    key: "onDraw",
    value: function onDraw(ctx, trackInfo) {}
  }, {
    key: "onDestroyed",
    value: function onDestroyed() {}
  }]);

  return BaseMessage;
}();

exports.BaseMessage = BaseMessage;