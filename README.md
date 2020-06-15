# 弹幕
## 简介
此弹幕插件使用canvas简单的实现了文本、图片、文本+表情，如果不满足需求可以自行下载更改。

## 安装
```
  npm i --save easy-danmaku
```

## 使用
### 初始化
```
  import Danmaku from 'easy-danmaku';
  // 初始化时传入数据
  const danmaku = new Danmaku({
    container: 'barrage',
  });

  danmaku.start()
```

属性|类型|默认|说明
---|:--:|---:|---:|---:
container | string/element | 必传，无默认值 | 弹幕的挂载点
fontSize | number | 非必传，默认16，整体弹幕字体 单位：像素
color | string | 非必传， 默认#fff, 弹幕颜色

### 文本弹幕
```
danmaku.addTextMessages(DATA); //DATA: Array | Object,  新增弹幕
```
文本弹幕数据集为一个对象数组。每个数组元素对应一条弹幕记录，其结构如下：
```
eg.
danmaku.addTextMessages([{
  text: '我膨胀了',
  fontSize: 32, // 非必需
  color: 'yellow', // 非必需
},{
  text: '这是新增的一条文本弹幕'
});
```
ps: 如果为包含表情的弹幕所需格式如下：
```
{
  text: '你好啊<img src="https://avatars1.githubusercontent.com/u/28089496?s=60&v=4" /><img src="https://avatars1.githubusercontent.com/u/28089496?s=60&v=4" />哈哈哈'
}
```

### 新增图片弹幕

```
danmaku.addImgMessages(DATA); //DATA: Array | Object,  新增弹幕
eg.
danmaku.addImgMessages({
  url: '',
  width: 20, // 默认70
  height: 20 // 默认70
});
```

### 动画控制接口
#### 播放 - danmaku.play()
用于播放动画。若当前为暂停状态，则从当前进度继续播放

#### 暂停 - danmaku.pause()
用于暂停动画


---------
#### 开发步骤
1、本地调试：`npm run start`

1、本地测试：`npm run dev`

2、编译生成lib文件：`npm run build`

> 包内样式使用.css

