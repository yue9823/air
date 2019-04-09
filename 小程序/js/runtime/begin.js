const IMG_URL = 'ranked_start_btn_down.png';
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;


let instance;

export default class Begin {
  constructor() {
    if (!instance) {
      instance = this;
      this.beginBtn = {
        x: 0,
        y: 0,
        width: 240,
        height: 124
      }
    }
    return instance;
  }
  //绘制开始按钮
  drawBeginBtn(ctx) {
    let img = new Image();
    img.src = IMG_URL;
    let x = (SCREEN_WIDTH - this.beginBtn.width) / 2;
    let y = SCREEN_HEIGHT / 2;
    this.beginBtn = x;
    this.beginBtn.y = y;

    ctx.drawImage(img, x, y, this.beginBtn.width, this.beginBtn.height);
  }

}