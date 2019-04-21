import Databus from './databus'
let databus = new Databus();
const IMG_URL = 'images/replay_btn.png'
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
let instance;

export default class GameInfo {
  constructor() {
    if (!instance) {
      instance = this;
      this.restartBtn = {
        x: 0,
        y: 0,
        width: 200,
        height: 60
      }
      this.scoreBtn = {
        x: 0,
        y: 0,
        width: 250,
        height: 200
      }
    }
    
    return instance;
  }

  //绘制重新开始按钮
  drawRestartBtn(ctx) {
    let img = new Image();
    img.src = IMG_URL;
    let x = (SCREEN_WIDTH - this.restartBtn.width) / 2;
    let y = SCREEN_HEIGHT / 2;
    this.restartBtn.x = x;
    this.restartBtn.y = y;
    ctx.drawImage(img, x, y, this.restartBtn.width, this.restartBtn.height);
  }
  //绘制得分按钮
  drawScoreBtn(ctx, grade) {
    let img = new Image();
    img.src = 'images/feed_3.png';
    let x = (SCREEN_WIDTH - this.scoreBtn.width) / 2;
    let y = 40;
    this.scoreBtn.x = x;
    this.scoreBtn.y = y;
    ctx.drawImage(img, x, y, this.scoreBtn.width, this.scoreBtn.height);

    //绘制得分板字体
    ctx.fillStyle = '#000000';
    ctx.font = "small-caps bold 20px Arical";
    let textWidth = 1 //ctx.measureText(1).width;//字体宽度
    let xPostion = (SCREEN_WIDTH - this.scoreBtn.width) / 2 + 55;
    //根据得分按钮确定字体坐标
    let yPostion = 40 + 53;

    ctx.fillText(grade, xPostion, yPostion);

  }

  //绘制血量
  renderplaneBlood(ctx, planeBlood) {
    //const FINAL_SCORE = score;
    //let i = FINAL_SCORE;
    ctx.font = "25px Arial"
    //
    ctx.fillText(
      '血量: ' + parseInt(planeBlood / 100),
      10,
      50,
      150,
      150
    )
  }

  //绘制得分
  renderGameScore(ctx, score) {
    // ctx.fillStyle = 'rgb(122 ,78, 0)'
    ctx.font = "25px Arial"
    ctx.fillText(
      '得分: ' + score,
      (SCREEN_WIDTH / 2 - 40),
      50,
      150,
      150
    )
  }
  

}