import Sprite from '../base/sprite'
import Bullet from '../player/bullet.js'
import Databus from '../runtime/databus'
let databus = new Databus();
const IMG_URL = 'images/tank_p.png'
//飞机大小
const PLANE_WIDTH = 60;
const PLANE_HEIGHT = 60;
//屏幕的宽高
const SCREEN_width = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
export default class Plane extends Sprite {
  constructor() {
    super(IMG_URL);

    this.x = (SCREEN_width - PLANE_WIDTH) / 2;
    this.y = SCREEN_HEIGHT - 160;
    this.width = PLANE_WIDTH;
    this.height = PLANE_HEIGHT;
    this.srcX = 9;
    this.srcY = 270;
    this.srcWidth = 137;
    this.srcHeight = 128;
  }

  shoot() {
    for (let i = 0; i < databus.cannoNum; i++) {
      let bullet = new Bullet();

      let x = this.x + (this.width / 2) - (30 * databus.cannoNum) / 2 + i * 30;
      /*修改子弹位置*/
      let y = this.y - 10;
      let direction;

      if (databus.cannoNum > 3) {
        if ((databus.cannoNum % 2) != 0) {
          if (i == Math.floor(databus.cannoNum / 2)) {
            direction = 0;
            bullet.init(x, y, direction);
            databus.bullets.push(bullet);
          }
          else if (i < Math.floor(databus.cannoNum / 2)) {
            direction = -1;
            bullet.init(x, y, direction);
            databus.bullets.push(bullet);
          } else if (i > Math.floor(databus.cannoNum / 2)) {
            direction = 1;
            bullet.init(x, y, direction);
            databus.bullets.push(bullet);
          }
        } else {
          if (i == databus.cannoNum / 2 || i == Math.floor(databus.cannoNum / 2) - 1) {
            direction = 0;
            bullet.init(x, y, direction);
            databus.bullets.push(bullet);
          }
          else if (i < (databus.cannoNum / 2)) {
            direction = -1;
            bullet.init(x, y, direction);
            databus.bullets.push(bullet);
          } else if (i > databus.cannoNum / 2) {
            direction = 1;
            bullet.init(x, y, direction);
            databus.bullets.push(bullet);
          }
        }
      }
      else {
        direction = 0;
        bullet.init(x, y, direction);
        databus.bullets.push(bullet);
      }
    }
  }
}