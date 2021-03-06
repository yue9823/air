let instance;
/**
 * 单例
 */
export default class Databus {
  constructor() {
    console.info(instance);
    if (!instance) {
      instance = this;
      this.resetConfig();
    }

    return instance;
  }

  resetConfig() {
    this.frame = 0;
    //飞机
    this.plane = null;
    this.bulletSpeed = 2;
    this.shootSpeed = 1;
    this.bulletPower = 5;
    //用来放置子弹
    this.bullets = [];
    //炮的数量
    this.cannoNum = 2;
    //敌人的移动速度
    this.enermySpeed = 2;
    //生成敌军速度
    this.generateEnermySpeed = 100;
    //用来放置敌军
    this.enermys = [];
    //游戏是否结束
    this.isGameOver = false;
    //游戏主对象
    this.mainApp = null;
  }

  /**
   * 设置子弹发射速度
   */
  setSpeed(speed) {
    if (speed < 20) {
      this.shootSpeed = speed;
    }
    //子弹移动速度
    this.bulletSpeed = this.shootSpeed;
  }

  /**
   * 回收子弹
   */
  removeBullet(bullet) {
    bullet.visible = false;
    for (let i = 0; i < this.bullets.length; i++) {
      let b = this.bullets[i];
      if (b.visible == false) {
        //删除指定位置的元素
        this.bullets.splice(i, 1);
      }
    }
  }

  /**
   * 移除敌军
   */
  removeEnermy(enermy) {
    enermy.visible = false;
    for (let i = 0; i < this.enermys.length; i++) {
      let e = this.enermys[i];
      if (e.visible == false) {
        this.enermys.splice(i, 1);
      }
    }
  }
}