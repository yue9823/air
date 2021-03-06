import Sprite from '../base/sprite.js'
import Databus from '../runtime/databus.js'

let databus = new Databus();
const IMG_URL = 'images/particle_texture.png'
const style = [{x: 0,y: 0}, {x: 193,y: 0}, {x: 0,y: 145}, {x: 193,y: 145}]
const WIDTH = window.innerWidth / 5;

export default class Enermy extends Sprite {
  constructor() {
    super(IMG_URL, WIDTH, 50);
    let rStyle = style[0];
    this.srcX = rStyle.x;
    this.srcY = rStyle.y;
    this.srcWidth = 190;
    this.srcHeight = 140;
    this.blood = 1;
  }


  init(x = 0, y = 0, blood = 50, sindex = 0) {
    let tempStyle = style[sindex];
    this.srcX = tempStyle.x;
    this.srcY = tempStyle.y;
    this.x = x;
    this.y = y;
    this.blood = blood;
  }

  drawToCanvas(ctx) {
    super.drawToCanvas(ctx);
    if (!this.visible)
      return;
    //绘制血量
    ctx.fillStyle = '#ffffff';
    //绘制文字
    ctx.font = "small_caps nold 20px Arial";
    let textWidth = ctx.measureText(this.blood).width;
    let xPostion = this.x + (this.width / 2) - (textWidth / 2);
    let yPostion = this.y + 30;
    ctx.fillText(this.blood, xPostion, yPostion);
  }


  update() {
    if (this.y < window.innerHeight) {
      this.y += databus.enermySpeed;
    } else {
      //销毁敌人
      databus.removeEnermy(this);
    }
  }

  //减血
  minusBlood() {
    if (this.blood > databus.bulletPower) {
      this.blood -= databus.bulletPower;
    } else {
      databus.removeEnermy(this);
    }
  }
}