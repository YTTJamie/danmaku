import { BaseMessage } from './BaseMessage'

export default class ImgMessage extends BaseMessage {
  constructor(msg) {
    super()
    this.ImgMessageConfig = Object.assign({}, this.ImgMessageConfig, msg)
    this.mImg = new Image()
  }
  onCreate(callback) {
    this.mImg.onload = () => {
      this.ImgMessageConfig.width = this.ImgMessageConfig.width || this.mImg.width || 70
      this.ImgMessageConfig.height = this.ImgMessageConfig.height || this.mImg.height || 70
      console.log(0);
      callback(true)
    }
    this.mImg.onerror = () => {
      document.body.removeChild(this.mImg)
      callback(false)
    }
    this.mImg.src = this.ImgMessageConfig.url
    this.mImg.style.position = 'fixed'
    this.mImg.style.top = '-1000px'
    this.mImg.style.left = '-1000px'
    document.body.appendChild(this.mImg)
    console.log(1);
  }
  onMeasure(ctx, trackInfo) {
    return {
      width: this.ImgMessageConfig.width,
      height: this.ImgMessageConfig.height
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
      console.log(2);
      ctx.drawImage(
      this.mImg,
      this.position.left,
      this.position.top,
      this.size.width,
      this.size.height
    )
  }
  onDestroyed() {
    let result = this.position.left < -this.size.width
    if (result) {
      document.body.removeChild(this.mImg)
    }
    return result
  }
}
