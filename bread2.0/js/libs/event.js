import Databus from '../runtime/databus'
import GameInfo from '../runtime/game_info'
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
    canvas.addEventListener('touchstart', (e) => {
      let touch = e.touches[0];
      let x = touch.clientX;
      let y = touch.clientY;

      //检查是否触碰到飞机
      this.checkIsTouchPlane(x, y);

      //检查是否触碰到开始按钮
      if (databus.isGameOver) {
        let rs = this.checkRestartBtn(x, y);
        if (rs) {
          databus.mainApp.restart();
        }
      }

    });
  }


  bindTouchMove() {
    canvas.addEventListener('touchmove', (e) => {
      if (!this.fingerOnPlane) {
        return;
      }
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      let plane = databus.plane;
      if (x > 0 && x < (window.innerWidth - plane.width) && y > 0 && y < (window.innerHeight - plane.height)) {
        plane.x = x;
        plane.y = y;
      }
    })
  }

  bindTouchEnd() {
    canvas.addEventListener('touchend', (e) => {
      this.fingerOnPlane = false;
    })
  }

  checkIsTouchPlane(x, y) {
    let plane = databus.plane;
    let diff = 30;
    if (x > (plane.x - diff) && x < (plane.x + plane.width + diff) &&
      y > (plane.y - diff) && y < (plane.y + plane.height + diff)) {
      this.fingerOnPlane = true;

    }
  }
  //检查是否触碰到重新开始按钮
  checkRestartBtn(x, y) {
    let restartBtn = gameInfo.restartBtn;
    let rbtnX = restartBtn.x;
    let rbtnY = restartBtn.y;
    let rbtnWidth = restartBtn.width;
    let rbtnHeight = restartBtn.height;


    if ((x > rbtnX) && x < (rbtnX + rbtnWidth) && (y > rbtnY) && y < (rbtnY + rbtnHeight)) {
      return true;
    }
    return false;
  }
}