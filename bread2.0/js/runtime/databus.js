let instance;
/**
 * 单例
 */
export default class Databus {
  constructor() {
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
    this.bulletPower = 1;
    //用来放置子弹
    this.bullets = [];
    //炮的数量
    this.cannoNum = 1;
    //敌人的移动速度
    this.enermySpeed = 2;
    //生成敌军的速度
    this.generateEnermySpeed = 100;
    //用来放置敌军
    this.enermys = [];
    //游戏是否结束
    this.isGameOver = false;
    //游戏主对象
    this.mainApp = null;
    //游戏道具编号
    this.props = [];
    //道具速度
    this.propSpeed = 5;
    //游戏分数
    this.score = 0;
    //飞机血量
    this.planeBlood = 10000;
    
    this.grade = 0;
  }
  /**
   * 设置子弹的发射速度
   */
  setSpeed(speed) {
    if (speed <= 20) {
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
    //  let bl=this.bullets.length;
    for (let i = 0; i < this.bullets.length; i++) {
      let b = this.bullets[i];

      if (b.visible == false) {
        //删除指定位置的元素
        this.bullets.splice(i, 1);
      }
    }
  }
  removeEnermy(enermy) {
    enermy.visible = false;
    for (let i = 0; i < this.enermys.length; i++) {
      let e = this.enermys[i];
      if (e.visible == false) {
        this.enermys.splice(i, 1);
      }
    }
  }

  //回收道具
  removeProp(prop) {
    prop.visible = false;
    for (let i = 0; i < this.props.length; i++) {
      let p = this.props[i];
      //删除指定位置的元素
      if (p.visible == false) {
        this.props.splice(i, 1);
      }
    }
  }

}