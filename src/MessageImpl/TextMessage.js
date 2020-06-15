import { BaseMessage } from './BaseMessage'

export default class TextMessage extends BaseMessage {
  
  constructor(msg) {
    super()
    this.textMessageConfig = Object.assign({}, this.textMessageConfig, msg)
    this.imgArr = [];
    this.textArr = [];
    this.mImg = {}; // 图片对象
    if(Array.isArray(msg.mMsg)){ // 含有表情
      this.hasImg = true;
      this.ImgMessageConfig = {
        width: 20,
        height: 20
      }
      // 文本含有表情时
      this.textArr = msg.mMsg.filter(i=>i.text);
      this.imgArr = msg.mMsg.filter(i=>i.url);
    }else{
      this.hasImg = false;
    }
  }
  onCreate(callback) {
    if(this.hasImg){
      this.textMessageConfig.mMsg.forEach((item,index)=>{
        if(item.url){
          this.mImg[`img${index}`] = new Image();
          this.mImg[`img${index}`].onload = () => {
            callback(true)
          }
          this.mImg[`img${index}`].onerror = () => {
            document.body.removeChild(this.mImg[`img${index}`])
            callback(false)
          }
          this.mImg[`img${index}`].src = item.url;
          // this.mImg[`img${index}`].src = 'https://image0.lietou-static.com/img/5e90084bb5d3fc5b244cda1002u.png'
          this.mImg[`img${index}`].style.position = 'fixed'
          this.mImg[`img${index}`].style.top = '-1000px'
          this.mImg[`img${index}`].style.left = '-1000px'
          document.body.appendChild(this.mImg[`img${index}`])
        }
      })
    }else{
      callback(true)
    }
  }
  onMeasure(ctx, trackInfo) {
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.font = `${this.textMessageConfig.fontSize}px ${this.textMessageConfig.fontFamily || ''}`
    let res = 0;
    if(this.hasImg){
      this.textArr.forEach((item,index)=>{
        res += Math.ceil(ctx.measureText(item.text).width);
      })
    }else{
      res = ctx.measureText(this.textMessageConfig.mMsg.text).width
    }
    return {
      width: res + (this.imgArr.length * 20),
      height: trackInfo.height
    }
  }
  onLayout(ctx, trackInfo) {
    if (!this.isLayout) {
      this.isLayout = true
      return {
        top: trackInfo.top + trackInfo.height / 2,
        left: ctx.canvas.width
      }
    }
    this.position.left -= 3
    return this.position
  }
  onDraw(ctx, trackInfo) {
    ctx.fillStyle = this.textMessageConfig.color
    if(this.hasImg === true){
      let textWidth = 0;
      this.textMessageConfig.mMsg.forEach((item,index)=>{
        if(item.text){
          ctx.fillText(item.text, this.position.left+textWidth, this.position.top)
          textWidth += ctx.measureText(item.text).width;
        }else{
          ctx.drawImage(
            this.mImg[`img${index}`],
            this.position.left + textWidth,
            this.position.top - 10,
            this.ImgMessageConfig.width,
            this.ImgMessageConfig.height
          )
          textWidth += 20;
        }
      })
    }else{
      ctx.fillText(this.textMessageConfig.mMsg.text, this.position.left, this.position.top)
    }
  }
  onDestroyed() {
    let result = this.position.left < -this.size.width
    if (result && this.hasImg === false) {
      // document.body.removeChild(this.mImg)
    }
    return result
  }
}
