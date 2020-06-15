// 弹幕库实例
export default class Danmaku {
 
  constructor(canvas, danmakuConfig) {
    this.mCanvas = canvas
    this.mDanmukuConfig = danmakuConfig
    this.mCtx = canvas.getContext('2d')
    this.mDanmuTracks = [];
    this.initRender()
  }
  addDanmuTrack(danmuTrack) {
    this.mDanmuTracks.push(danmuTrack)
    danmuTrack.setDanmaku(this)
  }
  removeDanmuTrack(danmuTrack) {
    this.mDanmuTracks = this.mDanmuTracks.filter(item => item !== danmuTrack)
  }
  initRender() {
    this.mCanvas.width = this.mDanmukuConfig.width
    this.mCanvas.height = this.mDanmukuConfig.height
    if (window.requestAnimationFrame) {
      this.renderByAnimationFrame()
    } else {
      this.renderBySetInterval()
    }
  }
  renderByAnimationFrame() {
    this.render()
    requestAnimationFrame(this.renderByAnimationFrame.bind(this))
  }
  renderBySetInterval() {
    setInterval(this.render.bind(this), 0)
  }
  render() {
    if (this.isPause) return
    this.mCtx.clearRect(0, 0, this.mCanvas.width, this.mCanvas.height)
    for (let mDanmuTrack of this.mDanmuTracks) {
      mDanmuTrack.render(this.mCtx)
    }
  }
  start() {
    this.isPause = false
  }
  pause() {
    this.isPause = true
  }
}
