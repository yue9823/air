import Sprite from'../base/sprite.js'
const IMG_URL = 'images/tank_p.png';
import Bullet from'../player/bullet.js'
import Databus from'../runtime/databus.js'

let databus = new Databus();
//飞机大小
const PLANE_WIDTH = 60;
const PLANE_HEIGHT = 60;
//屏幕的宽高
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

export default class Plane extends Sprite{
  constructor(){
    super(IMG_URL);
    this.x = (SCREEN_WIDTH - PLANE_WIDTH)/2;
    this.y = SCREEN_HEIGHT-180;
    this.width = PLANE_WIDTH;
    this.height = PLANE_HEIGHT; 
    this.srcX = 145;
    this.srcY = 124;
    this.srcWidth = 137;
    this.srcHeight = 128;
  }
  shoot() {
    for (let i = 0; i < databus.cannoNum; i++) {
      let bullet = new Bullet();
      let x = this.x + (this.width / 2) - (20 * databus.cannoNum) / 2 + i * 20;;
      let y = this.y - 10;
      bullet.init(x, y);
      databus.bullets.push(bullet);
    }
  }
}