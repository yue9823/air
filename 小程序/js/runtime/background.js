let color = '#210222';
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
export default class Background {
  /**
   * 绘制背景
   */

  drawBg(ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }
}