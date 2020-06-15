"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 处理含有表情的文本
var _default = function _default(message) {
  var imgReg = /<img.*?(?:>|\/>)/gi;
  var textArr = message.replace(/<img.*?(?:>|\/>)/gi, ' <img/> ').split(' ').filter(function (v) {
    return v;
  });
  var arr = message.match(imgReg); //图片列表

  var msgArr = [];
  var index = 0;
  textArr.forEach(function (v, i) {
    if (v !== '<img/>') {
      msgArr.push({
        text: v
      });
    } else {
      var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var src = arr[index].match(srcReg);
      msgArr.push({
        url: "https:".concat(src[1])
      });
      index++;
    }
  });
  return msgArr;
};

exports["default"] = _default;