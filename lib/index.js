"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Danmaku = _interopRequireDefault(require("./Danmaku"));

var _DanmakuPool = require("./DanmakuPool");

var _DanmaTrack = require("./DanmaTrack");

var _HiDPICanvas = _interopRequireDefault(require("./utils/HiDPICanvas"));

var _TextMessage = _interopRequireDefault(require("./MessageImpl/TextMessage"));

var _ImgMessage = _interopRequireDefault(require("./MessageImpl/ImgMessage"));

var _msgFormat = _interopRequireDefault(require("./utils/msgFormat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DanmakuWrap = /*#__PURE__*/function () {
  function DanmakuWrap(options) {
    _classCallCheck(this, DanmakuWrap);

    // 保证只创建一次实例
    if (DanmakuWrap['DanmakuInstance']) {
      return DanmakuWrap['DanmakuInstance'];
    }

    DanmakuWrap['DanmakuInstance'] = this;
    var defaultOptions = {
      color: '#fff',
      fontSize: 16
    };
    this.options = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.init();
  }

  _createClass(DanmakuWrap, [{
    key: "init",
    value: function init() {
      var _this = this;

      // 获取父级容器
      this.parent = typeof this.options.container === 'string' ? document.getElementById(this.options.container) : this.options.container;

      if (!this.parent) {
        throw new Error('container为必传参数！');
      }

      this.parent.classList.add('danmaku-container'); // 创建画布

      this.canvas = document.createElement('canvas');
      this.canvas.style.display = 'none';
      this.canvas = (0, _HiDPICanvas["default"])(this.parent.clientWidth, this.parent.clientHeight);
      this.canvas.className = 'danmaku-canvas';
      this.canvas.width = this.parent.clientWidth;
      this.canvas.height = this.parent.clientHeight;
      this.canvas.style.pointerEvents = 'none'; // canvas 事件穿透

      this.canvas.style.letterSpacing = '1.5px'; // canvas 字符间距

      this.parent.appendChild(this.canvas); // 若父节点存在其他子节点，则设置画布为绝对定位

      if (this.parent.childNodes.length > 1) {
        this.parent.style.position = 'relative';
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0px';
        this.canvas.style.top = '0px';
      } // 初始化弹幕容器


      this.danmaku = new _Danmaku["default"](this.canvas, {
        width: this.parent.clientWidth,
        height: this.parent.clientHeight
      }); // 创建一个消息池子，池子得大小能容纳300条消息

      this.danmuPool = new _DanmakuPool.DanmakuPool(300);
      var trackLen = Math.floor(this.parent.clientHeight / (this.options.fontSize + 16));
      var trackArr = Array.from(Array(trackLen), function (v, k) {
        return k;
      });
      trackArr.forEach(function (item, index) {
        var danmuTrack = new _DanmaTrack.DanmaTrack(_this.danmuPool, {
          top: (_this.options.fontSize + 16) * index + 10,
          height: _this.options.fontSize + 16
        });

        _this.danmaku.addDanmuTrack(danmuTrack);
      });
    } // 开启弹幕

  }, {
    key: "start",
    value: function start() {
      this.danmaku.start();
      this.canvas.style.display = 'block';
    } // 暂停

  }, {
    key: "pause",
    value: function pause() {
      this.danmaku.pause();
    } // 关闭

  }, {
    key: "close",
    value: function close() {
      this.danmaku.pause();
      this.canvas.style.display = 'none';
    }
  }, {
    key: "addTextMessages",
    value: function addTextMessages(message) {
      var _this2 = this;

      var messageData = [];

      if (Array.isArray(message)) {
        message.forEach(function (item) {
          messageData.push(_this2.createMessage(item, 'text'));
        });
      } else {
        messageData.push(this.createMessage(message, 'text'));
      }

      this.danmuPool.addMessages(messageData);
    }
  }, {
    key: "addImgMessages",
    value: function addImgMessages(message) {
      var _this3 = this;

      var messageData = [];

      if (Array.isArray(message)) {
        message.forEach(function (item) {
          messageData.push(_this3.createMessage(item, 'img'));
        });
      } else {
        messageData.push(this.createMessage(message, 'img'));
      }

      this.danmuPool.addMessages(messageData);
    }
  }, {
    key: "createMessage",
    value: function createMessage(message, type) {
      if (type === 'img') {
        // 图片
        return new _ImgMessage["default"](message);
      } else {
        var msg = message;

        if (/.*?<img.*>.*?/g.test(message.text)) {
          //含有表情时
          msg = (0, _msgFormat["default"])(message.text);
        }

        return new _TextMessage["default"]({
          fontSize: message.fontSize || this.options.fontSize,
          mMsg: msg,
          color: message.color || this.options.color
        });
      }
    }
  }]);

  return DanmakuWrap;
}();

exports["default"] = DanmakuWrap;