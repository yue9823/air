const IMG_URL = 'images/back.png'
import Sprite from '../base/sprite'


//屏幕的宽度和高度
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGH = window.innerHeight;
//图片大小
const WIDTH = 500;
const HEIGHT = 650;

export default class Background extends Sprite {
  constructor(ctx) {
    super(IMG_URL);
    this.srcc = 0;
    this.render(ctx);
  }

  update() {
    this.srcc += 2;

    if (this.srcc >= SCREEN_HEIGH)
      this.srcc = 0;
  }
  render(ctx) {
    ctx.drawImage(this.img, 0, 0, WIDTH, HEIGHT, 0, -SCREEN_HEIGH + this.srcc, SCREEN_WIDTH, SCREEN_HEIGH
    )
    ctx.drawImage(
      this.img, 0, 0, WIDTH, HEIGHT, 0, this.srcc, SCREEN_WIDTH,
      SCREEN_HEIGH
    )
  }
}