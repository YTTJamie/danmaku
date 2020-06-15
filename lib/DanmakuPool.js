"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DanmakuPool = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DanmakuPool = /*#__PURE__*/function () {
  function DanmakuPool(size) {
    _classCallCheck(this, DanmakuPool);

    this.mMessagePool = [];

    if (size) {
      this.mPoolSize = size;
      this.mMessagePool = new Array(this.mPoolSize);
    }
  }

  _createClass(DanmakuPool, [{
    key: "addMessage",
    value: function addMessage(msg) {
      this.addMessages([msg]);
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      var result = null;

      for (var i = 0; i < this.mMessagePool.length; i++) {
        if (this.mMessagePool[i] && this.mMessagePool[i].created) {
          result = this.mMessagePool[i];
          this.mMessagePool[i] = null;
          break;
        }
      }

      return result;
    }
  }, {
    key: "addMessages",
    value: function addMessages(msgs) {
      for (var i = 0; i < msgs.length; i++) {
        for (var j = 0; j < this.mMessagePool.length; j++) {
          if (!this.mMessagePool[j]) {
            this.mMessagePool[j] = msgs[i];
            if (this.mMessagePool[j]) this.mMessagePool[j].onBaseCreate();
            break;
          }
        }
      }
    }
  }, {
    key: "removeMessage",
    value: function removeMessage(msg) {
      var index = this.mMessagePool.findIndex(function (item) {
        return item === msg;
      });
      this.removeMessageByIndex(index);
    }
  }, {
    key: "removeMessageByIndex",
    value: function removeMessageByIndex(index) {
      if (Number.isInteger(index) && index > 0) {
        this.mMessagePool[index] = null;
      }
    }
  }]);

  return DanmakuPool;
}();

exports.DanmakuPool = DanmakuPool;