// 弹幕库实例
export default class Danmaku {
 
  constructor(canvas, danmakuConfig) {
    this.mCanvas = canvas
    this.danmakuConfig = danmakuConfig
    this.mCtx = canvas.getContext('2d')
    this.danmakuTracks = [];
    this.messagePool = []; // 弹幕池
    this.animation = null;
    this.danmuTrack = null;
    this.ftp= danmakuConfig.speed || 70; // 1s动画的帧数
    console.log("Danmaku -> constructor -> this.ftp", this.ftp)
    this.timeoutID = null;
    this.initRender()
  }
  addDanmuTrack(danmuTrack) {
    this.danmuTrack = danmuTrack;
    console.log("Danmaku -> addDanmuTrack -> danmuTrack", danmuTrack)
    this.danmakuTracks.push(danmuTrack)
    danmuTrack.setDanmaku(this)
  }
  initRender() {
    this.mCanvas.width = this.danmakuConfig.width
    this.mCanvas.height = this.danmakuConfig.height
    
  }
  // 新增消息
  addMessages(msgs) {
    for (let i = 0; i < msgs.length; i++) {
      if (!this.messagePool[i]) {
        this.messagePool[i] = msgs[i]
        this.messagePool[i].onBaseCreate()

      }
    }
  }
  // 获取消息
  getMessages() {
    let result = null
    for (let i = 0; i < this.messagePool.length; i++) {
      if (this.messagePool[i] && this.messagePool[i].created) {
        result = this.messagePool[i]
        this.messagePool[i] = null
        break
      }
    }
    return result
  }
  play(){
    if (window.requestAnimationFrame) {
      this.renderByAnimationFrame()
    } else {
      this.renderBySetInterval()
    }
  }
  renderByAnimationFrame() {
    this.timeoutID=setTimeout(()=>{
      this.animation = requestAnimationFrame(this.renderByAnimationFrame.bind(this));
      this.render()
    }, 1000/this.ftp) 
    
  }
  renderBySetInterval() {
    this.timeoutID=setTimeout(()=>{
      this.animation = setInterval(this.render.bind(this), 0)
    }, 1000/this.ftp) 

  }

  render() {
    if(this.isPause){return}
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height)
    for (let danmakuTrack of this.danmakuTracks) {
      danmakuTrack.render(this.mCtx)
    }
  }
  start() {
    this.isPause = false
  }
  pause() {
    this.isPause = true
  }
  destroy(){
    clearTimeout(this.timeoutID);
    if (window.requestAnimationFrame) {
      window.cancelAnimationFrame(this.animation);
    } else {
      clearInterval(this.animation)
    }
  }
}
