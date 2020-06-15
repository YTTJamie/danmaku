"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BaseMessage2 = require("./BaseMessage");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TextMessage = /*#__PURE__*/function (_BaseMessage) {
  _inherits(TextMessage, _BaseMessage);

  var _super = _createSuper(TextMessage);

  function TextMessage(msg) {
    var _this;

    _classCallCheck(this, TextMessage);

    _this = _super.call(this);
    _this.textMessageConfig = Object.assign({}, _this.textMessageConfig, msg);
    _this.imgArr = [];
    _this.textArr = [];
    _this.mImg = {}; // 图片对象

    if (Array.isArray(msg.mMsg)) {
      // 含有表情
      _this.hasImg = true;
      _this.ImgMessageConfig = {
        width: 20,
        height: 20
      }; // 文本含有表情时

      _this.textArr = msg.mMsg.filter(function (i) {
        return i.text;
      });
      _this.imgArr = msg.mMsg.filter(function (i) {
        return i.url;
      });
    } else {
      _this.hasImg = false;
    }

    return _this;
  }

  _createClass(TextMessage, [{
    key: "onCreate",
    value: function onCreate(callback) {
      var _this2 = this;

      if (this.hasImg) {
        this.textMessageConfig.mMsg.forEach(function (item, index) {
          if (item.url) {
            _this2.mImg["img".concat(index)] = new Image();

            _this2.mImg["img".concat(index)].onload = function () {
              callback(true);
            };

            _this2.mImg["img".concat(index)].onerror = function () {
              document.body.removeChild(_this2.mImg["img".concat(index)]);
              callback(false);
            };

            _this2.mImg["img".concat(index)].src = item.url; // this.mImg[`img${index}`].src = 'https://image0.lietou-static.com/img/5e90084bb5d3fc5b244cda1002u.png'

            _this2.mImg["img".concat(index)].style.position = 'fixed';
            _this2.mImg["img".concat(index)].style.top = '-1000px';
            _this2.mImg["img".concat(index)].style.left = '-1000px';
            document.body.appendChild(_this2.mImg["img".concat(index)]);
          }
        });
      } else {
        callback(true);
      }
    }
  }, {
    key: "onMeasure",
    value: function onMeasure(ctx, trackInfo) {
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = "".concat(this.textMessageConfig.fontSize, "px ").concat(this.textMessageConfig.fontFamily || '');
      var res = 0;

      if (this.hasImg) {
        this.textArr.forEach(function (item, index) {
          res += Math.ceil(ctx.measureText(item.text).width);
        });
      } else {
        res = ctx.measureText(this.textMessageConfig.mMsg.text).width;
      }

      return {
        width: res + this.imgArr.length * 20,
        height: trackInfo.height
      };
    }
  }, {
    key: "onLayout",
    value: function onLayout(ctx, trackInfo) {
      if (!this.isLayout) {
        this.isLayout = true;
        return {
          top: trackInfo.top + trackInfo.height / 2,
          left: ctx.canvas.width
        };
      }

      this.position.left -= 3;
      return this.position;
    }
  }, {
    key: "onDraw",
    value: function onDraw(ctx, trackInfo) {
      var _this3 = this;

      ctx.fillStyle = this.textMessageConfig.color;

      if (this.hasImg === true) {
        var textWidth = 0;
        this.textMessageConfig.mMsg.forEach(function (item, index) {
          if (item.text) {
            ctx.fillText(item.text, _this3.position.left + textWidth, _this3.position.top);
            textWidth += ctx.measureText(item.text).width;
          } else {
            ctx.drawImage(_this3.mImg["img".concat(index)], _this3.position.left + textWidth, _this3.position.top - 10, _this3.ImgMessageConfig.width, _this3.ImgMessageConfig.height);
            textWidth += 20;
          }
        });
      } else {
        ctx.fillText(this.textMessageConfig.mMsg.text, this.position.left, this.position.top);
      }
    }
  }, {
    key: "onDestroyed",
    value: function onDestroyed() {
      var result = this.position.left < -this.size.width;

      if (result && this.hasImg === false) {// document.body.removeChild(this.mImg)
      }

      return result;
    }
  }]);

  return TextMessage;
}(_BaseMessage2.BaseMessage);

exports["default"] = TextMessage;