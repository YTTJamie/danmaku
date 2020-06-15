
export class DanmakuPool {
  constructor(size) {
    this.mMessagePool = []
    if (size) {
      this.mPoolSize = size
      this.mMessagePool = new Array(this.mPoolSize)
    }
  }
  addMessage(msg) {
    this.addMessages([msg])
  }
  getMessage() {
    let result = null
    for (let i = 0; i < this.mMessagePool.length; i++) {
      if (this.mMessagePool[i] && this.mMessagePool[i].created) {
        result = this.mMessagePool[i]
        this.mMessagePool[i] = null
        break
      }
    }
    return result
  }
  addMessages(msgs) {
    for (let i = 0; i < msgs.length; i++) {
      for (let j = 0; j < this.mMessagePool.length; j++) {
        if (!this.mMessagePool[j]) {
          this.mMessagePool[j] = msgs[i]
          if (this.mMessagePool[j]) this.mMessagePool[j].onBaseCreate()
          break
        }
      }
    }
  }
  removeMessage(msg) {
    let index = this.mMessagePool.findIndex(item => item === msg)
    this.removeMessageByIndex(index)
  }
  removeMessageByIndex(index) {
    if (Number.isInteger(index) && index > 0) {
      this.mMessagePool[index] = null
    }
  }
}
