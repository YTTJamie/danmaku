export class DanmaTrack {
  constructor(danmaTrackConfig) {
    this.mDanmuTrackConfig = {};
    this.mTrackInfo = {
      maxWidth: 0,
      top: 0,
      height: 0,
    };
    this.mDanmaMessages = [];
    this.initConfig(danmaTrackConfig);
  }
  setDanmaku(danmaku) {
    this.mDanmaku = danmaku;
  }

  initConfig(danmaTrackConfig) {
    this.mDanmuTrackConfig = danmaTrackConfig;
    this.mTrackInfo.top = danmaTrackConfig.top;
    this.mTrackInfo.height = danmaTrackConfig.height;
  }

  render(ctx) {
    this.refreshMessage(ctx);
    for (let i = 0; i < this.mDanmaMessages.length; i++) {
      let currentDanmaMessage = this.mDanmaMessages[i];
      currentDanmaMessage.onBaseMeasure(ctx, this.mTrackInfo);
      currentDanmaMessage.onBaseLayout(ctx, this.mTrackInfo);
      currentDanmaMessage.onBaseDraw(ctx, this.mTrackInfo);
      currentDanmaMessage.onBaseDestroyed();
      if (i === this.mDanmaMessages.length - 1) {
        this.mTrackInfo.maxWidth =
          currentDanmaMessage.position.left + currentDanmaMessage.size.width;
      }
    }
  }
  refreshMessage(ctx) {
    this.removeMessage(ctx);
    this.AddMessage(ctx);
  }
  AddMessage(ctx) {
    if (this.mTrackInfo.maxWidth < ctx.canvas.width - 10) {
      let msg = this.mDanmaku.getMessages();
      if (msg) {
        this.mDanmaMessages.push(msg);
      }
    }
  }
  removeMessage(ctx) {
    if(this.mDanmaMessages.length >0){
      this.mDanmaMessages = this.mDanmaMessages.filter((item) => !item.distoryed);
    }
  }
}
