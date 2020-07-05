import Danmaku from './Danmaku'
import { DanmaTrack } from './DanmaTrack'
import createHiDPICanvas from './utils/HiDPICanvas'
import TextMessage from './MessageImpl/TextMessage'
import ImgMessage from './MessageImpl/ImgMessage'
import msgFormat from './utils/msgFormat';

export default class DanmakuWrap {
  constructor(options){
    // 保证只创建一次实例
    if (DanmakuWrap['DanmakuInstance']) {
      return DanmakuWrap['DanmakuInstance']
    }
    DanmakuWrap['DanmakuInstance'] = this;
    let defaultOptions = {
      color:'#fff',
      fontSize: 16
    }
    this.options = {...defaultOptions, ...options};
    this.init();
    console.log("DanmakuWrap -> constructor -> this.options", this.options)
  }
  init(){
    // 获取父级容器
    this.parent =
      typeof this.options.container === 'string'
        ? document.getElementById(this.options.container)
        : this.options.container;
    if(!this.parent){
      throw new Error('container为必传参数！') 
    }
    this.parent.classList.add('danmaku-container');

    // 创建画布
    this.canvas = document.createElement('canvas');
    this.canvas.style.display= 'none';
    this.canvas = createHiDPICanvas(this.parent.clientWidth, this.parent.clientHeight);
    this.canvas.className = 'danmaku-canvas';
    this.canvas.width = this.parent.clientWidth;
    this.canvas.height = this.parent.clientHeight;
    this.canvas.style.pointerEvents = 'none'; // canvas 事件穿透
    this.canvas.style.letterSpacing = '1.5px'; // canvas 字符间距
    this.parent.appendChild(this.canvas);

    // 若父节点存在其他子节点，则设置画布为绝对定位
    if (this.parent.childNodes.length > 1) {
      this.parent.style.position = 'relative';
      this.canvas.style.position = 'absolute';
      this.canvas.style.left = '0px';
      this.canvas.style.top = '0px';
    }
    // 初始化弹幕容器
    this.danmaku = new Danmaku(this.canvas, {
      width: this.parent.clientWidth,
      height: this.parent.clientHeight,
      speed: this.options.speed,
    })

    let trackLen = Math.floor(this.parent.clientHeight/(this.options.fontSize + 16));
    let trackArr = Array.from(Array(trackLen),(v, k) => k)
    trackArr.forEach((item,index)=>{
      let danmuTrack = new DanmaTrack({
        top: (this.options.fontSize + 16) * index + 10,
        height: this.options.fontSize + 16
      })
      this.danmaku.addDanmuTrack(danmuTrack)
    })
    
  }
  // 开启弹幕
  start(){
    this.danmaku.start()
    this.canvas.style.display= 'block';
  }
  // 暂停
  pause(){
    this.danmaku.pause()
  }
  // 重新播放
  play(){
    this.canvas.style.display= 'block';
    this.danmaku.play();
  } 
  // 销毁
  destroy(){
    this.danmaku.destroy()
    this.canvas.style.display= 'none';
  }

  addTextMessages(message){
    let messageData = [];
    if(Array.isArray(message)){
      message.forEach(item=>{
        messageData.push(this.createMessage(item,'text'));
      })
    }else{
      messageData.push(this.createMessage(message,'text'));
    }
    this.danmaku.addMessages(messageData)
  }

  addImgMessages(message){
    let messageData = [];
    if(Array.isArray(message)){
      message.forEach(item=>{
        messageData.push(this.createMessage(item,'img'));
      })
    }else{
      messageData.push(this.createMessage(message,'img'));
    }
    this.danmaku.addMessages(messageData)
  }
  createMessage(message,type){
    if(type === 'img'){ // 图片
      return new ImgMessage(message)
    }else{
      let msg = message;
      if(/.*?<img.*>.*?/g.test(message.text)){ //含有表情时
        msg = msgFormat(message.text);
      }
      return new TextMessage({
        fontSize: message.fontSize || this.options.fontSize,
        mMsg: msg,
        color: message.color || this.options.color
      })
    }
  }

}
