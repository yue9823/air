import Databus from '../runtime/databus'
import Sprite from '../base/sprite'
let databus = new Databus();
const IMG_URL = "images/ball_p.png";

export default class Bullet extends Sprite {
  constructor() {
    super(IMG_URL, 20, 30);
    this.srcX = 0;
    this.srcY = 0;
    this.srcWidth = 90;
    this.srcHeight = 90;
  }
  //子弹的位置
  init(x, y, direction) {

    this.x = x;
    this.y = y;
    this.direction = direction;

  }
  update() {
    {
      if (this.y >= 0) {
        if (this.direction == -1) {
          this.x -= -1;
          this.y -= databus.bulletSpeed;
        }
        else if (this.direction == 1) {
          this.x += -1;
          this.y -= databus.bulletSpeed;
        }
        else {
          this.y -= databus.bulletSpeed;
        }
      } else {
        databus.removeBullet(this);
      }
    }
  }
}