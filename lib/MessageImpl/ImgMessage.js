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

var ImgMessage = /*#__PURE__*/function (_BaseMessage) {
  _inherits(ImgMessage, _BaseMessage);

  var _super = _createSuper(ImgMessage);

  function ImgMessage(msg) {
    var _this;

    _classCallCheck(this, ImgMessage);

    _this = _super.call(this);
    _this.ImgMessageConfig = Object.assign({}, _this.ImgMessageConfig, msg);
    _this.mImg = new Image();
    return _this;
  }

  _createClass(ImgMessage, [{
    key: "onCreate",
    value: function onCreate(callback) {
      var _this2 = this;

      this.mImg.onload = function () {
        _this2.ImgMessageConfig.width = _this2.ImgMessageConfig.width || _this2.mImg.width || 70;
        _this2.ImgMessageConfig.height = _this2.ImgMessageConfig.height || _this2.mImg.height || 70;
        callback(true);
      };

      this.mImg.onerror = function () {
        document.body.removeChild(_this2.mImg);
        callback(false);
      };

      this.mImg.src = this.ImgMessageConfig.url;
      this.mImg.style.position = 'fixed';
      this.mImg.style.top = '-1000px';
      this.mImg.style.left = '-1000px';
      document.body.appendChild(this.mImg);
    }
  }, {
    key: "onMeasure",
    value: function onMeasure(ctx, trackInfo) {
      return {
        width: this.ImgMessageConfig.width,
        height: this.ImgMessageConfig.height
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
      ctx.drawImage(this.mImg, this.position.left, this.position.top, this.size.width, this.size.height);
    }
  }, {
    key: "onDestroyed",
    value: function onDestroyed() {
      var result = this.position.left < -this.size.width;

      if (result) {
        document.body.removeChild(this.mImg);
      }

      return result;
    }
  }]);

  return ImgMessage;
}(_BaseMessage2.BaseMessage);

exports["default"] = ImgMessage;