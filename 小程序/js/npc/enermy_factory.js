import Enermy from './enermy.js'
import Strategy from './strategy.js'
import Databus from '../runtime/databus.js'

let databus = new Databus();
const ELE_WIDTH = window.innerWidth / 5;
const ELE_HEIGHT = 50;
let instance;

export default class EnermyFactory {
  constructor() {
    if (!instance) {
      instance = this;
      this.strategy = new Strategy();
    }
    return instance;
  }


  generateEnermy() {
    let index = Math.floor((Math.random()) * this.strategy.st.length);
    let s = this.strategy.st[index];
    //for(let i=0;i<this.strategy.st.length;i++){
    // let s=this.strategy.st[i];
    this.getEnermyByStrategy(s);
    //}
    //let enermys =this.getEnermyByStrategy(this.strategy.s1);
    //databus.enermys.concat(enermys);
  }

  getEnermyByStrategy(st) {
    //血量范围
    let max = st.max ? st.max : 1;
    let min = st.min ? st.min : 1;
    //屏幕间隔
    let dis = st.distance ? st.distance : 1;

    databus.generateEnermySpeed = dis * databus.enermySpeed * 50;
    // let distance = dis * ELE_HEIGHT;

    let strategy = st.s;
    let sHeight = st.height * ELE_HEIGHT;
    for (let i = 0; i < strategy.length; i++) {
      //血量倍数
      let range = Math.floor(Math.random() * (max - min)) + min + 1;
      //改变敌军颜色
      let sindex = 1;
      if (range > 4) {
        sindex = 3;
      } else if (range > 3) {
        sindex = 2;
      } else if (range > 2) {
        sindex = 1;
      }
      //生成血量
      let blood = databus.bulletPower * range;
      
      let celue = strategy[i];
      let e = new Enermy();
      let x = celue.x * ELE_WIDTH;
      let y = celue.y * ELE_HEIGHT - sHeight;
      e.init(x, y, blood, sindex);
      databus.enermys.push(e);
    }

  }
}