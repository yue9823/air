//用来处理点击事件
import Databus from '../runtime/databus.js'
import GameInfo from '../runtime/game_info.js'

let databus = new Databus();
let gameInfo = new GameInfo();

export default class Event {
  constructor() {
    this.fingerOnPlane = false;
    this.bindTouchStart();
    this.bindTouchMove();
    this.bindTouchEnd();
  }


  bindTouchStart() {
    //var_this=this;
    canvas.addEventListener('touchstart', (e) => {
      let touch = e.touches[0];
      let x = touch.clientX;
      let y = touch.clientY;
      //检查是否碰到飞机
      this.checkIsTouchPlane(x,y);

      //检查是否触碰到开始按钮
      if (databus.isGameOver) {
        let rs = this.checkRestartBtn(x,y);
        console.info(rs);
        if (rs) {
          databus.mainApp.restart();
        }
      }



    })
  }

  bindTouchMove() {
    canvas.addEventListener('touchmove', (e) => {
      if (!this.fingerOnPlane) {
        return;
      }
      let x = e.touches[0].clientX;
      let plane = databus.plane;
      if (x > 0 && x < (window.innerWidth - plane.width)) {
        plane.x = x;
      }
    });
  }
  bindTouchEnd() {
    canvas.addEventListener('touchend', (e) => {
      console.info(e);
    });
  }
  /**
   * 是否触碰飞机
   */
  checkIsTouchPlane(x, y) {
    let plane = databus.plane;
    let diff = 30;
    if (x > (plane.x - diff) && x < (plane.x + plane.width + diff) &&
      y > (plane.y - diff) && y < (plane.y + plane.height + diff)) {
      this.fingerOnPlane = true;
      console.info("碰到飞机了");
    }
  }
  /**
   * 检查是否触碰到重新开始
   */
  checkRestartBtn(x, y) {
    let restartBtn = gameInfo.restartBtn;
    let rbtnX = restartBtn.x;
    let rbtnY = restartBtn.y;
    let rbtnWidth = restartBtn.width;
    let rbtnHeight = restartBtn.height;

    if ((x > rbtnX) && x < (rbtnX + rbtnWidth) && y < (rbtnY + rbtnHeight)) {
      return true;
    }
    return false;
  }
}