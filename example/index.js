import React from 'react';
import ReactDOM from 'react-dom';
import example from './data.json';
import './index.less';
import Danmaku from '../src';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cnt: 1,
    };
    this.imgArr = [{
      text: `你好啊<img src="https://avatars1.githubusercontent.com/u/28089496?s=60&v=4" /><img src="https://avatars1.githubusercontent.com/u/28089496?s=60&v=4" />哈哈哈`
    }];
  }

  componentDidMount () {
    this.danmaku = new Danmaku({
      fontSize: 16,
      container: 'box'
    })
    this.danmaku.start()
    this.danmaku.addTextMessages(example.concat(this.imgArr));
  }

  add = () => {
    let { cnt } = this.state;
    console.log("Demo -> add -> cnt", cnt)
    this.danmaku.addTextMessages({
      text: `这是新增的一条弹幕${cnt}`,
      color: '#0ff',
    })
    cnt++
    this.setState({
      cnt
    });
  }

  addImg = () => {
    this.danmaku.addImgMessages({
      url: 'https://avatars1.githubusercontent.com/u/28089496?s=60&v=4',
      width: 40, // 默认70
      height: 40 // 默认70
    })
  }

  pause=()=>{
    this.danmaku.pause();
  }
  start=()=>{
    this.danmaku.start();
  }
  render(){
    return (
      <>
        <div id="wrap">
          <div id="box"></div>
        </div>
        <div><a href="javascript:;" className="add-btn" onClick={this.add}>新增一条</a></div>
        <div><a href="javascript:;" className="add-btn" onClick={this.addImg}>新增一个图片</a></div>
        <div><a href="javascript:;" className="add-btn" onClick={this.pause}>暂停</a></div>
        <div><a href="javascript:;" className="add-btn" onClick={this.start}>开始</a></div>
      </>
    );
  }
}
ReactDOM.render(
  <><Demo/></>,
  document.getElementById('root')
);