const IMG_URL = 'images/replay_btn_down.png';
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

let instance;

export default class GameInfo {
  constructor() {
    if(!instance){
      instance = this;
    this.restartBtn = {
      x: 0,
      y: 0,
      width: 200,
      height: 60
    }
  }
  return instance;
  }
  //绘制重新开始按钮
  drawRestartBtn(ctx) {
    let img = new Image();
    img.src = IMG_URL;
    let x = (SCREEN_WIDTH - this.restartBtn.width) / 2;
    let y = SCREEN_HEIGHT / 2;
    this.restartBtn.x = x;
    this.restartBtn.y = y;

    ctx.drawImage(img, x, y, this.restartBtn.width, this.restartBtn.height);
  }

}