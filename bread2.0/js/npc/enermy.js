import Sprite from '../base/sprite'
import Databus from '../runtime/databus'
let databus = new Databus();
const IMG_URL = 'images/tank_p.png'
const style = [
  { x: 430, y: 132}, 
  { x: 430, y: 132}, 
  { x: 430, y: 132}, 
  { x: 430, y: 132}
];
const WIDTH = window.innerWidth / 5;
export default class Enermy extends Sprite {
  constructor() {
    super(IMG_URL, WIDTH, 50);
    let rStyle = style[0];
    this.srcX = rStyle.x;
    this.srcY = rStyle.y;
    this.srcWidth = 110;
    this.srcHeight = 120;
    this.blood = 1;
  }

  init(x = 0, y = 0, blood = 1, sindex = 0) {
    let tempStyle = style[sindex];
    this.srcX = tempStyle.x;
    this.srcY = tempStyle.y;
    this.x = x;
    this.y = y;
    this.blood = blood;
  }
  drawToCanvas(ctx) {
    super.drawToCanvas(ctx);
    if (!this.visible) {
      return;
    }

    //绘制血量
    ctx.fillStyle = '#00000';
    ctx.font = "small-caps bold 20px Arial";
    let textWidth = ctx.measureText(this.blood).width;
    let xPosition = this.x + (this.width / 2) - (textWidth / 2);
    let yPosition = this.y + 10;
    ctx.fillText(this.blood, xPosition, yPosition);
  }
  update() {
    if (this.y < window.innerHeight) {
      this.y += databus.enermySpeed;
    } else {
      //销毁敌人
      databus.removeEnermy(this);
    }
  }

  minusBlood() {
    if (this.blood > databus.bulletPower) {
      this.blood -= databus.bulletPower;
      databus.score += this.blood ;


    } else {
      databus.removeEnermy(this);
      if (databus.isGameOver) {
        this.score = databus.score;
      }
      // break;
    }
  }
}