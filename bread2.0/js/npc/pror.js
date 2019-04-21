import Sprite from '../base/sprite'
import Databus from '../runtime/databus'
let databus = new Databus();

const IMG_URL = 'images/prop.png'

const WIDTH = 20;

export default class Pror extends Sprite {
  constructor() {
    super(IMG_URL, 20, 20);
    this.srcWidth = 560;
    this.srcHeight = 448;
  }

  init(x = 0, y = 0, sindex = 0) {
    this.x = x;
    this.y = y;
  }

  drawToCanvas(ctx) {
    super.drawToCanvas(ctx);
  }

  update() {
    if (this.y < window.innerHeight) {
      this.y += databus.propSpeed;
    }
    else {
      //销毁敌人
      databus.removeProp(this);
    }
  }
}