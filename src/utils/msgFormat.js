  // 处理含有表情的文本
  export default (message)=>{
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let textArr = message.replace(/<img.*?(?:>|\/>)/gi, ' <img/> ').split(' ').filter(v => v);
    let arr = message.match(imgReg); //图片列表
    let msgArr = [];
    let index  = 0;
    textArr.forEach((v, i) => {
      if(v !== '<img/>') {
        msgArr.push({text:v});
      } else {
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let src = arr[index].match(srcReg);
        msgArr.push({url:src[1]});
        index ++;
      }
    })
    return msgArr;
  }