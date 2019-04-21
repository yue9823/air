import Background from './runtime/background'
import Plane from './player/plane'
import Event from './libs/event'
import Databus from './runtime/databus'
import EnermyFactory from './npc/enermy_factory'
import GameInfo from './runtime/game_info'
import Music from './runtime/music'
import ProrFactory from './npc/pror_factory'

let databus = new Databus();
let ctx = canvas.getContext('2d')
let ef = new EnermyFactory();
let gi = new GameInfo();
let pf = new ProrFactory();

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
    this.music = new Music();
    databus.resetConfig();
    databus.mainApp = this;
    this.bg = new Background(ctx);
    databus.plane = new Plane();
    this.bindLoop = this.loop.bind(this);
    let event = new Event();
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(this.bindLoop);
  }

  loop() {

    this.update();
    this.render();

    this.aniId = window.requestAnimationFrame(this.bindLoop)
  }

  //负责更新游戏中各个对象的位置参数
  update() {
    this.bg.update();
    databus.frame++;

    if (databus.frame % (20 - databus.shootSpeed) == 0) {
      databus.plane.shoot();
      //this.music.playShoot()
    }
    // 生成敌军
    if (databus.frame % databus.generateEnermySpeed == 0) {
      ef.generateEnermy();
    }
    //生成buff
    if (databus.frame % 300 == 0) {
      pf.generatePror();
    }


    databus.setSpeed(5);

    databus.bullets.concat(databus.enermys.concat(databus.props)).forEach((item) => {
      item.update();
    })
    //碰撞检测
    if (!databus.isGameOver) {
      this.checkIsCollision();
    }
    this.checkProp();

  }
  //负责渲染界面
  render() {
    if (databus.isGameOver) {
      let _this = this;
      setTimeout(function() {
        //_this.bg.drawBg(ctx);
        gi.drawScoreBtn(ctx, databus.score) //绘制得分按钮
        gi.drawRestartBtn(ctx);
      }, 1000)

      return;
    }
    this.bg.render(ctx);

    this.music = new Music()

    databus.bullets.concat(databus.enermys.concat(databus.props)).forEach((bullet) => {
      bullet.drawToCanvas(ctx);
    })
    databus.plane.drawToCanvas(ctx);
    gi.renderplaneBlood(ctx, databus.planeBlood);
    gi.renderGameScore(ctx, databus.score);
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
        databus.planeBlood = databus.planeBlood - 100; //每次碰撞减100血；默认血量10000
        if (databus.planeBlood <= 0) {
          databus.isGameOver = true; //减到0及以下游戏结束
        }
      }
    })
  }
  checkProp() {
    databus.props.forEach(
      (prop) => {
        if (prop.visible && prop.checkIsCollision(databus.plane)) {
          databus.removeProp(prop);
          if (databus.cannoNum < 5) {
            databus.cannoNum++;
          } else {
            databus.cannoNum = 5;
          }

        }
      }
    )
  }
}