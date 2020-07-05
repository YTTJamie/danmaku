export class BaseMessage {
  onBaseCreate() {
    this.onCreate((val) => {

      if (val) {
        this.created = true
      } else {
        this.distoryed = true
      }
    })
  }
  onBaseDestroyed() {
    this.distoryed = this.onDestroyed()
  }
  onBaseMeasure(ctx, trackInfo) {
    this.size = this.onMeasure(ctx, trackInfo);
    // console.log("BaseMessage -> onBaseMeasure -> this.size", this.size)
  }
  onBaseLayout(ctx, trackInfo) {
    this.position = this.onLayout(ctx, trackInfo)
    // console.log("BaseMessage -> onBaseLayout ->  this.position",  this.position)
  }
  onBaseDraw(ctx, trackInfo) {
    this.onDraw(ctx, trackInfo)
  }
  onCreate(callback){
    
  }
  onMeasure(ctx, trackInfo){

  }
  onLayout(ctx, trackInfo){

  }
  onDraw(ctx, trackInfo){

  }
  onDestroyed(){

  }
}
