import Background from './runtime/background'
import Plane from './player/plane.js'
import Event from './libs/event'
import Databus from './runtime/databus'
import EnermyFactory from './npc/enermy_factory'
import GameInfo from './runtime/game_info'
import Music from './runtime/music.js'

let databus = new Databus();
let ctx = canvas.getContext('2d')
let ef = new EnermyFactory();
let gi = new GameInfo();

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.restart()
  }

  restart() {
    databus.resetConfig();
    databus.mainApp = this;
    this.bg = new Background();
    databus.plane = new Plane();
    // this.plane = new Plane();
    this.bindLoop = this.loop.bind(this);
    let event = new Event();
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop);
    this.music = new Music()
  }

  loop() {
    this.update();
    this.render();
   
    this.aniId = window.requestAnimationFrame(this.bindLoop)
  }

  //负责更新游戏中各个对象的位置参数
  update() {
    databus.frame++;

    if (databus.frame % (20 - databus.shootSpeed) == 0) {
      databus.plane.shoot();
      this.music.playShoot()
    }
    // 生成敌军
    if (databus.frame % databus.generateEnermySpeed == 0) {
      ef.generateEnermy();
    }
    

    databus.setSpeed(10)
    databus.bullets.concat(databus.enermys).forEach((item) => {
      item.update();
    })
    //碰撞检测
    this.checkIsCollision();



  }
  //负责渲染界面
  render() {
    if (databus.isGameOver) {
      let _this = this;
      setTimeout(function() {
        _this.bg.drawBg(ctx);
        gi.drawRestartBtn(ctx);
      }, 1000)

      return;
    }

    this.bg.drawBg(ctx);

    databus.bullets.concat(databus.enermys).forEach((bullet) => {
      bullet.drawToCanvas(ctx);
    })

    databus.plane.drawToCanvas(ctx);
  }

  checkIsCollision() {
    //子弹和敌人的碰撞检测
    databus.bullets.forEach((bullet) => {
      for (let i = 0; i < databus.enermys.length; i++) {
        let enermy = databus.enermys[i];
        if (enermy.visible && bullet.checkIsCollision(enermy)) {
          enermy.minusBlood();
          databus.removeBullet(bullet);
        }
      }
    })

    //飞机碰撞
    databus.enermys.forEach((enermy) => {
      if (enermy.visible && enermy.checkIsCollision(databus.plane)) {
        databus.isGameOver = true;
        this.music = false;
      }
    })
  }
}