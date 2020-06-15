export class DanmaTrack {
  constructor(danmuPool, danmaTrackConfig) {
    this.mDanmuPool = danmuPool
    this.mDanmuTrackConfig = {}
    this.mTrackInfo = {
      maxWidth:0,
      top:0,
      height:0
    }
    this.mDanmaMessages = []
    this.initConfig(danmaTrackConfig)
  }
  setDanmaku(danmaku) {
    this.mDanmaku = danmaku
  }

  initConfig(danmaTrackConfig) {
    this.mDanmuTrackConfig = danmaTrackConfig
    this.mTrackInfo.top = danmaTrackConfig.top
    this.mTrackInfo.height = danmaTrackConfig.height
  }

  render(ctx) {
    this.refreshMessage(ctx)
      for (let i = 0; i < this.mDanmaMessages.length; i++) {
      let currentDanmaMessage = this.mDanmaMessages[i]
      currentDanmaMessage.onBaseMeasure(ctx, this.mTrackInfo)
      currentDanmaMessage.onBaseLayout(ctx, this.mTrackInfo)
      currentDanmaMessage.onBaseDraw(ctx, this.mTrackInfo)
      currentDanmaMessage.onBaseDestroyed()
      if (i === this.mDanmaMessages.length - 1) {
        this.mTrackInfo.maxWidth = currentDanmaMessage.position.left + currentDanmaMessage.size.width
      }
    }
  }
  refreshMessage(ctx) {
    this.removeMessage()
    this.AddMessage(ctx)
  }
  AddMessage(ctx) {
    if (this.mTrackInfo.maxWidth < ctx.canvas.width - 10) {
      let msg = this.mDanmuPool.getMessage()
      if (msg) {
        this.mDanmaMessages.push(msg)
      }
    }
  }
  removeMessage() {
    this.mDanmaMessages = this.mDanmaMessages.filter(item => !item.distoryed)
  }
}
