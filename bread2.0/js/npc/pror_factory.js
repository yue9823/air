import Pror from './pror'
import Strategy from './strategy'
import Databus from '../runtime/databus'

let databus = new Databus();
const ELE_WIDTH = window.innerWidth / 5;
const ELE_HEIGHT = 20;

let instance;

export default class ProrFactory {
  constructor() {
    if (!instance) {
      instance = this;

      this.strategy = new Strategy();
    }
    return instance;
  }

  generatePror() {

    let range = Math.floor(Math.random() * 5) + 1;
    let s = this.strategy.p[range];
    this.getProrByStrategy(s);

  }


  getProrByStrategy(st) {

    let strategy = st;
    let celue = strategy;
    let p = new Pror();
    let x = celue.x;
    let y = celue.y;
    p.init(x, y);
    databus.props.push(p);

  }
}