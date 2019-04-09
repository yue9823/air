import Databus from '../runtime/databus.js'
import Sprite from'../base/sprite.js'
let databus = new Databus();
const IMG_URL = "images/ball_p.png";
export default class Bullet extends Sprite{
  constructor(){
    super(IMG_URL,20,20);
    this.srcX = 0;
    this.srcY = 0;
    this.srcWidth = 90;
    this.srcHeight = 90;
  }

  init(x,y){
    this.x = x;
    this.y = y;
  }

update(){
  if(this.y >= 0){
    this.y -= databus.bulletSpeed;
  }else{
    databus.removeBullet(this);
  }
}
}